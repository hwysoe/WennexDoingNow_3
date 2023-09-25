import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TasksOutput from "../components/TasksOutput/TasksOutput";
import { TasksContext } from "../store/tasks-context";
import { fetchTasks } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../store/auth-context";
import * as Notifications from "expo-notifications";

const Done = () => {
  const [isFetching, setIsFetching] = useState(true);
  const tasksCtx = useContext(TasksContext);
  const authCtx = useContext(AuthContext);
  userID = authCtx.getToken();
  const [email, setEmail] = useState("");
  console.log(email);
  // console.log(email);
  // console.log(userID);

  // console.log(authCtx);
  // authCtx.getToken();
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
  useEffect(() => {
    getData();
    async function getTasks() {
      setIsFetching(true);
      const tasks = await fetchTasks();
      setIsFetching(false);
      tasksCtx.setTasks(tasks);
    }
    getTasks();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const doneTasks = tasksCtx.tasks.filter((task) => {
    // console.log(task.userID);

    // console.log(Done);
    // console.log(task.startDate);
    // console.log(taskArray);
    if (task.status === "Done" && task.email === email) {
    }
    return task.status === "Done" && task.email === email;
  });
  return <TasksOutput tasks={doneTasks} fallbackText="No Done Tasks" />;
};

export default Done;

const styles = StyleSheet.create({});
