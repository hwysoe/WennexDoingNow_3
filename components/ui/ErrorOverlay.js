import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.text, styles.title]}>An Error Occured</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
