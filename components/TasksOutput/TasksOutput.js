import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TasksSummary from "./TasksSummary";
import TasksList from "./TasksList";
import { Colors, GlobalStyles } from "../../constants/styles";

const TasksOutput = ({ tasks, fallbackText }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (tasks.length > 0) {
    content = <TasksList tasks={tasks} />;
  }

  return (
    <View style={styles.container}>
      <TasksSummary tasks={tasks} />
      {content}
    </View>
  );
};

export default TasksOutput;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: Colors.primary100,
    flex: 1,
  },
  infoText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
