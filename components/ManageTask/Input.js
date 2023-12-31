import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors, GlobalStyles } from "../../constants/styles";

const Input = ({ label, invalid, style, textInputConfig }) => {
  const inputStyles = [styles.input];
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
    // color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: Colors.error100,
  },
});
