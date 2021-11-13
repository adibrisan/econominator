import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./SocialButton.style";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SocialButton({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...rest
}) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: backgroundColor }]}
      {...rest}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome
          name={btnType}
          style={styles.icon}
          size={22}
          color={color}
        />
      </View>
      <View style={styles.btnTextWrapper}>
        <Text style={[styles.buttonText, { color: color }]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
}
