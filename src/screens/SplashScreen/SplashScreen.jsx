import React, { useEffect, useLayoutEffect, useState } from "react";
import storage from "@react-native-async-storage/async-storage";

import SplashAnimation from "./SplashAnimation";

export default function SplashScreen({ navigation }) {
  let firstLaunch = true;
  if (!__DEV__) {
    storage.getItem("alreadyLaunched").then((res) => {
      console.log(res);
      if (res === "true") {
        firstLaunch = false;
      }
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    const timer = setTimeout(() => {
      navigation.replace(firstLaunch ? "Onboarding" : "Login");
    }, 4600);
    return () => clearTimeout(timer);
  }, [navigation]);

  return <SplashAnimation />;
}
