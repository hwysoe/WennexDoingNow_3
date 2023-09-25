import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, GlobalStyles } from "../../constants/styles";

const TasksSummary = ({ tasks }) => {
  const tasksSum = tasks.length;
  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total Number Of Tasks</Text>
      <Text style={styles.sum}>{tasksSum}</Text>
    </View>
  );
};

export default TasksSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Colors.primary500,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
