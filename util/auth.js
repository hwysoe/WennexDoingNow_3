import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

API_KEY = "AIzaSyCp4V2k7GeAtcWVYJBU3cgKB8TEf9amAGI";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  try {
    await AsyncStorage.setItem("userEmail", email);
    console.log("Email saved successfully.");
  } catch (error) {
    console.error("Error saving email:", error);
  }
  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
