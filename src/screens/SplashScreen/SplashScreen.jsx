import React, { useLayoutEffect } from "react";

import SplashAnimation from "./SplashAnimation";

export default function SplashScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 4600);
    return () => clearTimeout(timer);
  }, [navigation]);

  return <SplashAnimation />;
}
