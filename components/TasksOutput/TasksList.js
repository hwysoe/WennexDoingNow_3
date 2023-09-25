import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TaskItem from "./TaskItem";

function renderTaskItem(itemData) {
  return <TaskItem {...itemData.item} />;
}

const TasksList = ({ tasks }) => {
  return (
    <FlatList
      data={tasks}
      renderItem={renderTaskItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TasksList;

const styles = StyleSheet.create({});
