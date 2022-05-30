import React, { useContext, useLayoutEffect } from "react";
import { Text, Image, TouchableOpacity, View, StatusBar } from "react-native";

import Onboarding from "react-native-onboarding-swiper";
import { I18nContext } from "../../navigation/i18nProvider";

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
  const { I18n } = useContext(I18nContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: I18n.t("onboarding.title"),
      headerTitleStyle: {
        fontFamily: "Lato-Bold",
      },
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <Onboarding
        controlStatusBar={true}
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
            title: I18n.t("onboarding.firstTitle"),
            subtitle: I18n.t("onboarding.first"),
          },
          {
            backgroundColor: Colors.white,
            image: (
              <Image
                style={{ marginBottom: Sizes.normalize(150) }}
                source={images.budget}
              />
            ),
            title: I18n.t("onboarding.secondTitle"),
            subtitle: I18n.t("onboarding.second"),
          },
          {
            backgroundColor: Colors.white,
            image: (
              <Image
                style={{ marginBottom: Sizes.normalize(150) }}
                source={images.money}
              />
            ),
            title: I18n.t("onboarding.thirdTitle"),
            subtitle: I18n.t("onboarding.third"),
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;
