import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors, GlobalStyles } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Done from "./screens/Done";
import Ongoing from "./screens/Ongoing";
import Upcoming from "./screens/Upcoming";
import { Ionicons } from "@expo/vector-icons";
import ManageTasks from "./screens/ManageTasks";
import TasksContextprovider from "./store/tasks-context";
import { MaterialIcons } from "@expo/vector-icons";
// import TasksContextProvider from "./store/tasks-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TasksOverview() {
  const authCtx = useContext(AuthContext);

  return (
    <BottomTabs.Navigator
      initialRouteName="Ongoing"
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: Colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: "white",

        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={30}
            onPress={authCtx.logout}
          />
        ),
        headerLeft: ({ tintColor }) => (
          <MaterialIcons
            name="add"
            size={30}
            color="white"
            onPress={() => {
              navigation.navigate("ManageTasks");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="Done"
        component={Done}
        options={{
          title: "Done",
          tabBarLabel: "Done",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="arrow-back" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Ongoing"
        component={Ongoing}
        options={{
          title: "Ongoing",
          tabBarLabel: "Ongoing",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Upcoming"
        component={Upcoming}
        options={{
          title: "Upcoming",
          tabBarLabel: "Upcoming",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="arrow-forward" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="TasksOverview"
        component={TasksOverview}
        options={{
          headerShown: false,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ManageTasks"
        component={ManageTasks}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <TasksContextprovider>
          <Root />
        </TasksContextprovider>
      </AuthContextProvider>
    </>
  );
}
