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
      shouldShowAlert: true,
    };
  },
});

const Ongoing = () => {
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
  function scheduleNotificationHandler(children) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: children.title,
        body:
          "Your Task Is Ending Soon on " +
          children.endDate +
          ".Please Update The Status Of The Task In The App",
      },
      trigger: {
        seconds: 5,
        repeats: false,
      },
    });
  }
  const tasksCtx = useContext(TasksContext);

  useEffect(() => {
    getData();
    async function getTasks() {
      const tasks = await fetchTasks();
      tasksCtx.setTasks(tasks);
    }
    getTasks();
  }, []);

  const ongoingTasks = tasksCtx.tasks.filter((task) => {
    const today = new Date();
    // console.log(task.endDate);
    const endDateOnly = task.endDate.toISOString().split("T")[0];
    // console.log(endDateOnly);
    const todayDateOnly = today.toISOString().split("T")[0];
    // console.log("Today Date:" + todayDateOnly);
    // console.log(today);
    const Ongoing = task.status === "Ongoing" && endDateOnly === todayDateOnly;
    // console.log(today);
    if (Ongoing) {
      const abc = AsyncStorage.getItem("notificationScheduled");
      scheduleNotificationHandler(task);
    }
    return task.status === "Ongoing" && task.email === email;
  });
  return <TasksOutput tasks={ongoingTasks} fallbackText="No Ongoing Tasks" />;
};

export default Ongoing;

const styles = StyleSheet.create({});
