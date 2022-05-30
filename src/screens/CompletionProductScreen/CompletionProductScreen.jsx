import { View, StyleSheet, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import LottieView from "lottie-react-native";

import { I18nContext } from "../../navigation/i18nProvider";

import { Sizes } from "../../environment/sizes";

const CompletionProductScreen = ({ navigation }) => {
  const { I18n } = useContext(I18nContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View accessibilityLabel="CompletionProductScreen" style={styles.completed}>
      <LottieView
        source={require("../../assets/item-added.json")}
        autoPlay
        loop={false}
        renderMode="HARDWARE"
        resizeMode="cover"
        style={styles.animation}
      />
      <Text style={styles.title} typing={1}>
        {I18n.t("product.productAdded")}
      </Text>
    </View>
  );
};

export default CompletionProductScreen;

const styles = StyleSheet.create({
  completed: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  animation: {
    width: Sizes.normalize(640),
    height: Sizes.normalize(640),
  },
  title: {
    fontFamily: "Lato-BoldItalic",
    fontSize: Sizes.normalize(60),
  },
});
