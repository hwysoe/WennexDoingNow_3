import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const TaskItem = ({ id, title, startDate, endDate, priority, status }) => {
  const navigation = useNavigation();
  function taskPressHandler() {
    navigation.navigate("ManageTasks", {
      taskId: id,
    });
  }
  return (
    <Pressable
      onPress={taskPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.taskItem}>
        <View>
          <Text style={[styles.textBase, styles.title]}>{title}</Text>
          <Text style={styles.textBase}>
            Start Date: {getFormattedDate(startDate)}
          </Text>
          <Text style={styles.textBase}>
            End Date: {getFormattedDate(endDate)}
          </Text>
          <Text style={styles.textBase}>Status: {status}</Text>
        </View>
        <View
          style={[
            priority === 1 && styles.priorityGreen,
            priority === 2 && styles.priorityYellow,
            priority === 3 && styles.priorityRed,
          ]}
        >
          <Text>{priority}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  taskItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  colorContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  color: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  priorityRed: {
    justifyContent: "center",
    backgroundColor: "#FF0000",
    marginRight: 10,
    padding: 20,
  },
  priorityYellow: {
    justifyContent: "center",
    backgroundColor: "yellow",
    marginRight: 10,
    padding: 20,
  },
  priorityGreen: {
    justifyContent: "center",
    backgroundColor: "green",
    marginRight: 10,
    padding: 20,
  },
});
