import React, { useLayoutEffect } from "react";
import { Text, Image, TouchableOpacity, View,StatusBar } from "react-native";

import Onboarding from "react-native-onboarding-swiper";

import { images } from "../../environment/theme/images";

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Welcome to Econominator !",
      headerTitleStyle: {
        fontFamily: "Lato-BoldItalic",
      },
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <Onboarding
        ontrolStatusBar={true}
        DoneButtonComponent={Done}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.replace("Login")}
        pages={[
          {
            backgroundColor: "#fff",
            image: <Image source={images.intro} />,
            title: "Expense Tracker",
            subtitle: "This app will help you get on track with your savings.",
          },
          {
            backgroundColor: "#fff",
            image: <Image source={images.budget} />,
            title: "Calculate",
            subtitle: "Never run out of money again !",
          },
          {
            backgroundColor: "#fff",
            image: <Image source={images.money} />,
            title: "Earn more",
            subtitle: "Fulfill your dreams based on savings !",
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;
