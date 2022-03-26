import React, { useContext, useLayoutEffect } from "react";
import { Text, Image, TouchableOpacity, View, StatusBar } from "react-native";

import Onboarding from "react-native-onboarding-swiper";

import { AuthContext } from "../../navigation/AuthProvider";
import { Colors } from "../../environment/theme/Colors";
import { images } from "../../environment/theme/images";
import { Sizes } from "../../environment/sizes";

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Welcome to Econominator !",
      headerTitleStyle: {
        fontFamily: "Lato-Bold",
      },
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <Onboarding
        ontrolStatusBar={true}
        DoneButtonComponent={Done}
        onSkip={() => {
          if (user) {
            navigation.replace("Home");
          } else {
            navigation.replace("Login");
          }
        }}
        onDone={() => {
          if (user) {
            navigation.replace("Home");
          } else {
            navigation.replace("Login");
          }
        }}
        pages={[
          {
            backgroundColor: Colors.white,
            image: (
              <Image
                style={{ marginBottom: Sizes.normalize(150) }}
                source={images.intro}
              />
            ),
            title: "Expense Tracker",
            subtitle: "This app will help you get on track with your savings.",
          },
          {
            backgroundColor: Colors.white,
            image: (
              <Image
                style={{ marginBottom: Sizes.normalize(150) }}
                source={images.budget}
              />
            ),
            title: "Calculate",
            subtitle: "Never run out of money again !",
          },
          {
            backgroundColor: Colors.white,
            image: (
              <Image
                style={{ marginBottom: Sizes.normalize(150) }}
                source={images.money}
              />
            ),
            title: "Earn more",
            subtitle: "Fulfill your dreams based on savings !",
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;
