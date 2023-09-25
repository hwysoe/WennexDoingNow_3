import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import Input from "./Input";
import AnotherButton from "../ui/AnotherButton";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";

const TaskForm = ({ submitButtonLabel, onCancel, onSubmit, defaultValues }) => {
  const authCtx = useContext(AuthContext);
  const userID = authCtx.getToken();
  const [userID2, setUserID2] = useState(userID);
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title : "",
      isValid: true,
    },
    startDate: {
      value: defaultValues ? getFormattedDate(defaultValues.startDate) : "",
      isValid: true,
    },
    endDate: {
      value: defaultValues ? getFormattedDate(defaultValues.endDate) : "",
      isValid: true,
    },
    priority: {
      value: defaultValues ? defaultValues.priority.toString() : "",
      isValid: true,
    },
    status: {
      value: defaultValues ? defaultValues.status : "",
      isValid: true,
    },
    userID: {
      value: userID2,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInput) => {
      return {
        ...curInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const taskData = {
      title: inputs.title.value,
      startDate: new Date(inputs.startDate.value),
      endDate: new Date(inputs.endDate.value),
      priority: +inputs.priority.value,
      status: inputs.status.value,
      userID: userID2,
    };

    const titleIsValid = taskData.title.trim().length > 0;
    const startDateIsValid =
      taskData.startDate.toString() !== "Invalid Date" &&
      taskData.startDate.toString() !== "Date value out of bounds";
    const endDateIsValid =
      taskData.endDate.toString() !== "Invalid Date" &&
      taskData.endDate.toString() !== "Date value out of bounds";
    const priorityIsValid =
      !isNaN(taskData.priority) &&
      taskData.priority > 0 &&
      taskData.priority < 4;
    const statusIsValid =
      taskData.status == "Done" ||
      taskData.status == "Ongoing" ||
      taskData.status == "Upoming";

    if (
      !titleIsValid ||
      !startDateIsValid ||
      !endDateIsValid ||
      !priorityIsValid ||
      !statusIsValid
    ) {
      //   Alert.alert("Invalid Input", "Please Check Your Input Values");
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, isValid: titleIsValid },
          startDate: {
            value: curInputs.startDate.value,
            isValid: startDateIsValid,
          },
          endDate: { value: curInputs.endDate.value, isValid: endDateIsValid },
          priority: {
            value: curInputs.priority.value,
            isValid: priorityIsValid,
          },
          status: { value: curInputs.status.value, isValid: statusIsValid },
        };
      });
      return;
    }

    onSubmit(taskData);
  }

  const formIsInvalid =
    !inputs.title.isValid ||
    !inputs.startDate.isValid ||
    !inputs.endDate.isValid ||
    !inputs.priority.isValid ||
    !inputs.status.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Task</Text>
      <Input
        label="title"
        invalid={!inputs.title.isValid}
        textInputConfig={{
          keyboardType: "default",
          onChangeText: inputChangedHandler.bind(this, "title"),
          value: inputs.title.value,
        }}
      />
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="startDate"
          invalid={!inputs.startDate.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "startDate"),
            value: inputs.startDate.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="endDate"
          invalid={!inputs.endDate.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "endDate"),
            value: inputs.endDate.value,
          }}
        />
      </View>
      <Input
        label="priority"
        invalid={!inputs.priority.isValid}
        textInputConfig={{
          keyboardType: "number-pad",
          placeholder: "1/2/3",
          onChangeText: inputChangedHandler.bind(this, "priority"),
          value: inputs.priority.value,
        }}
      />
      <Input
        label="status"
        invalid={!inputs.status.isValid}
        textInputConfig={{
          keyboardType: "default",
          placeholder: "Done/Ongoing/Upcoming",
          onChangeText: inputChangedHandler.bind(this, "status"),
          value: inputs.status.value,
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid Input Values - Please Check Your Entered Data!
        </Text>
      )}
      <View style={styles.buttons}>
        <AnotherButton style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </AnotherButton>
        <AnotherButton style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </AnotherButton>
      </View>
    </View>
  );
};

export default TaskForm;

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  form: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    fontWeight: "bold",
    margin: 8,
  },
});
