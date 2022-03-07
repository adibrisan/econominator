import { View, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";

import { Sizes } from "../../environment/sizes";

const CompletionProductScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.completed}>
      <LottieView
        source={require("../../assets/item-added.json")}
        autoPlay
        loop={false}
        renderMode="HARDWARE"
        resizeMode="cover"
        style={styles.animation}
      />
      <Text style={styles.title} typing={1}>
        Your product has been added !
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
