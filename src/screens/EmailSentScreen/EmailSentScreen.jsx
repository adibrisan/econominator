import React, { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import TypeWriter from "react-native-typewriter";

import { I18nContext } from "../../navigation/i18nProvider";

import { Sizes } from "../../environment/sizes";

const EmailSentScreen = ({ navigation }) => {
  const { I18n } = useContext(I18nContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    let timer = setTimeout(() => {
      navigation.replace("Login");
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View accessibilityLabel="EmailSentScreen" style={styles.container}>
      <LottieView
        source={require("../../assets/email-sent-animation.json")}
        autoPlay
        resizeMode="cover"
        style={styles.animation}
      />
      <View accessibilityLabel="TypeWriter" style={styles.titleContainer}>
        <TypeWriter style={styles.title} typing={1}>
          {I18n.t("emailSent")}
        </TypeWriter>
      </View>
    </View>
  );
};

export default EmailSentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  animation: {
    width: Sizes.normalize(840),
    height: Sizes.normalize(840),
  },
  titleContainer: {
    marginBottom: Sizes.normalize(350),
  },
  title: {
    fontFamily: "Lato-BoldItalic",
    fontSize: Sizes.normalize(60),
  },
});
