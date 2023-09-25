import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, GlobalStyles } from "../../constants/styles";

const Button = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: Colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  flatText: {
    color: "black",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "gray",
    borderRadius: 4,
  },
});
