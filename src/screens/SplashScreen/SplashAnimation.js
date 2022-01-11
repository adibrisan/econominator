import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";

import LottieView from "lottie-react-native";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";

export default function SimpleAnimation() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const t = setTimeout(() => {
      fadeIn();
    }, 0);
    return t;
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/money.json")}
        autoPlay
        style={styles.animation}
      />
      <Animated.View
        style={[
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.title}>Econominator</Text>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  animation: {
    width: 230,
    height: 230,
  },
  title: {
    fontFamily: "Lato-BoldItalic",
    fontSize: Sizes.normalize(120),
    color: Colors.comet,
  },
});
