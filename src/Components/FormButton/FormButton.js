import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";

import { Colors } from "../../environment/theme/Colors";

import styles from "./FormButton.style";

export default function FormButton({ buttonTitle, disabled, ...props }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.buttonContainer,
        { backgroundColor: disabled ? Colors.aliceBlue : Colors.blue },
      ]}
      {...props}
    >
      {disabled ? (
        <Image source={require("../../environment/theme/icons/disabled.png")} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            { color: disabled ? Colors.black : Colors.white },
          ]}
        >
          {buttonTitle}
        </Text>
      )}
    </TouchableOpacity>
  );
}
