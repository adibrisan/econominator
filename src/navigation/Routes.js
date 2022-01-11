import React, { useContext, useState, useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from "../screens/OnboardingScreen/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/ForgotPasswordScreen";

import { AuthContext } from "./AuthProvider";

import { auth } from "../../firebase";
import { onAuthStateChanged } from "@firebase/auth";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "white" },
  headerTitleStyle: { color: "black" },
  headerTintColor: "black",
  headerTitleAlign: "center",
  headerForceInset: { top: "never", bottom: "never" },
};

export default function Routes() {
  const { setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthState = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => onAuthState(user));
    return subscriber;
  }, []);

  if (initializing) {
    return null; // TODO: loader
  }

  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
