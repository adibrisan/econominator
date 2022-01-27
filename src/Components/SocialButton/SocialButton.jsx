import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import styles from "./SocialButton.style";

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
          size={25}
          color={color}
        />
      </View>
    </TouchableOpacity>
  );
}
