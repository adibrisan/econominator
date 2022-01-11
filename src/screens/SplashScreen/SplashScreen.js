import React, {  useLayoutEffect } from "react";

import SplashAnimation from "./SplashAnimation";

export default function SplashScreen({ navigation }) {
  useLayoutEffect(() => {
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
