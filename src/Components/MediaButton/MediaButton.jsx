import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import styles from "./MediaButton.style";

export default function MediaButton({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...rest
}) {
  return (
    <TouchableOpacity
      accessibilityLabel="MediaButton"
      style={[styles.buttonContainer, { backgroundColor: backgroundColor }]}
      {...rest}
    >
      <View accessibilityLabel="Icon" style={styles.iconWrapper}>
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
