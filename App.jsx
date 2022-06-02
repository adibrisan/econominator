import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { locale } from "expo-localization";
import storage from "@react-native-async-storage/async-storage";
import React, { useEffect, useCallback } from "react";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import { AuthProvider } from "./src/navigation/AuthProvider";
import { I18nProvider } from "./src/navigation/i18nProvider";

import { showToast } from "./src/navigation/AuthProvider";

import store from "./src/store";
import Routes from "./src/navigation/Routes";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

Notifications.setNotificationHandler({
  shouldSetBadge: true,
});

export default function App() {
  let [fontsLoaded] = useFonts({
    "Lato-Regular": require("./src/assets/fonts/Lato-Regular.ttf"),
    "Kufam-SemiBoldItalic": require("./src/assets/fonts/Kufam-SemiBoldItalic.ttf"),
    "Lato-Bold": require("./src/assets/fonts/Lato-Bold.ttf"),
    "Lato-BoldItalic": require("./src/assets/fonts/Lato-BoldItalic.ttf"),
    "Lato-Italic": require("./src/assets/fonts/Lato-Italic.ttf"),
  });

  useEffect(() => {
    registerPushNotification()
      .then((token) => console.log(token))
      .catch((err) => {
        showToast("error", `${err}`, "");
      });
    repeatNotif();
    return () => Notifications.cancelAllScheduledNotificationsAsync();
  }, []);

  const repeatNotif = useCallback(async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: locale == "ro-RO" ? "Echipa Econominator" : "Econominator Team",
        body:
          locale == "ro-RO"
            ? "Bună, ți-ai urmărit cheltuielile astăzi?"
            : "Hello, Did you track your expenses today ?",
        data: {},
      },
      trigger: {
        seconds: 86400,
        repeats: true,
      },
    });
  }, []);

  const registerPushNotification = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status != "granted") {
      await Permissions.getAsync(Permissions.NOTIFICATIONS);
    }
    if (status != "granted") {
      alert("Failed to get push token");
      await storage.setItem("expopushtoken", "");
      return;
    }
    let token = (await Notifications.getExpoPushTokenAsync()).data;
    await storage.setItem("expopushtoken", token);
    return token;
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider {...{ store }}>
      <NavigationContainer>
        <I18nProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </I18nProvider>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
