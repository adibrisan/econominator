import React from "react";
import Toast from "react-native-toast-message";

import { NavigationContainer } from "@react-navigation/native";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import { AuthProvider } from "./src/navigation/AuthProvider";

import Routes from "./src/navigation/Routes";

export default function App() {
  let [fontsLoaded] = useFonts({
    "Lato-Regular": require("./src/assets/fonts/Lato-Regular.ttf"),
    "Kufam-SemiBoldItalic": require("./src/assets/fonts/Kufam-SemiBoldItalic.ttf"),
    "Lato-Bold": require("./src/assets/fonts/Lato-Bold.ttf"),
    "Lato-BoldItalic": require("./src/assets/fonts/Lato-BoldItalic.ttf"),
    "Lato-Italic": require("./src/assets/fonts/Lato-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
        <Toast />
      </NavigationContainer>
    </>
  );
}
