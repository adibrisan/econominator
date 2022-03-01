import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import TypeWriter from "react-native-typewriter";

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
      <TypeWriter style={styles.title} typing={4}>
        Your product has been added in your list !
      </TypeWriter>
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
