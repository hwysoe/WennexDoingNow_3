import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { Colors, GlobalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import { TasksContext } from "../store/tasks-context";
import TaskForm from "../components/ManageTask/TaskForm";
import { deleteTask, storeTask, updateTask } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

const ManageTasks = ({ route, navigation }) => {
  const tasksCtx = useContext(TasksContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editedTaskId = route.params?.taskId;
  const isEditing = !!editedTaskId;
  const authCtx = useContext(AuthContext);

  const selectedTask = tasksCtx.tasks.find((task) => task.id === editedTaskId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Task" : "Add Task",
    });
  }, [navigation, isEditing]);

  async function deleteTaskHandler() {
    setIsSubmitting(true);
    await deleteTask(editedTaskId);
    tasksCtx.deleteTask(editedTaskId);

    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(taskData) {
    setIsSubmitting(true);
    if (isEditing) {
      tasksCtx.updateTask(editedTaskId, taskData);
      await updateTask(editedTaskId, taskData);
    } else {
      const id = await storeTask(taskData);
      tasksCtx.addTask({ ...taskData, id });
      // console.log(id);
    }
    navigation.goBack();
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <TaskForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedTask}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteTaskHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageTasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary100,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary500,
    alignItems: "center",
  },
});
