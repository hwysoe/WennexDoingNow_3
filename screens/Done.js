import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TasksOutput from "../components/TasksOutput/TasksOutput";
import { TasksContext } from "../store/tasks-context";
import { fetchTasks } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../store/auth-context";

const Done = ({ email }) => {
  const [isFetching, setIsFetching] = useState(true);
  const tasksCtx = useContext(TasksContext);
  const authCtx = useContext(AuthContext);
  userID = authCtx.getToken();
  // console.log(userID);

  // console.log(authCtx);
  // authCtx.getToken();

  useEffect(() => {
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
    console.log(task.userID);
    return task.status === "Done" && task.userID === userID;
  });
  return <TasksOutput tasks={doneTasks} fallbackText="No Done Tasks" />;
};

export default Done;

const styles = StyleSheet.create({});
