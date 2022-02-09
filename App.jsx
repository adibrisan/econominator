import React from "react";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import { AuthProvider } from "./src/navigation/AuthProvider";
import store from "./src/store";
import Routes from "./src/navigation/Routes";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

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
    <Provider {...{ store }}>
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
