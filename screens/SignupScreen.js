import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TasksOutput from "../components/TasksOutput/TasksOutput";
import { TasksContext } from "../store/tasks-context";
import { fetchTasks } from "../util/http";
import { AuthContext } from "../store/auth-context";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: True,
    };
  },
});

const Upcoming = () => {
  const [email, setEmail] = useState("");
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userEmail");
      setEmail(value);
      if (value !== null) {
        console.log("Data retrieved successfully:", value);
      } else {
        console.log("Data not found");
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  async function scheduleNotificationHandler(children) {
    try {
      // Check if the notification has already bdeen scheduled
      const notificationScheduled = await AsyncStorage.getItem(
        "notificationScheduled"
      );

      if (!notificationScheduled) {
        // Schedule the notification
        Notifications.scheduleNotificationAsync({
          content: {
            title: children.title,
            body:
              "Your Task Is Ending Soon on " +
              children.endDate +
              ". Please Update The Status Of The Task In The App",
          },
          trigger: {
            seconds: 5,
          },
        });

        // Mark the notification as scheduled
        await AsyncStorage.setItem("notificationScheduled", "true");
      }
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  }
  const tasksCtx = useContext(TasksContext);
  const authCtx = useContext(AuthContext);
  userID = authCtx.getToken();

  useEffect(() => {
    getData();

    async function getTasks() {
      const tasks = await fetchTasks();
      tasksCtx.setTasks(tasks);
    }
    getTasks();
  }, []);

  const upcomingTasks = tasksCtx.tasks.filter((task) => {
    // console.log(task.userID);
    const startDate = task.startDate.toISOString().split("T")[0];
    const today = new Date();
    const todayDateOnly = new Date().toISOString().split("T")[0];
    // console.log(todayDateOnly);

    const Upcoming = task.status === "Upcoming" && startDate === todayDateOnly;

    if (Upcoming) {
      console.log(Upcoming);
      scheduleNotificationHandler(task);
    }

    return task.status === "Upcoming" && task.email === email;
  });
  return <TasksOutput tasks={upcomingTasks} fallbackText="No Upcoming Tasks" />;
};

export default Upcoming;

const styles = StyleSheet.create({});
