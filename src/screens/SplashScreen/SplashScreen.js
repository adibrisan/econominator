import React, { useEffect, useLayoutEffect } from "react";
import { View } from "react-native";

import SplashAnimation from "./SplashAnimation";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    setTimeout(() => {
      navigation.replace("Onboarding");
    }, 4600);
  }, [navigation]);

  return (
      <SplashAnimation />
  );
}
