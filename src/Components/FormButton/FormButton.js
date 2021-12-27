import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import styles from "./FormButton.style";

export default function FormButton({ buttonTitle, disabled, ...props }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.buttonContainer,
        { backgroundColor: disabled ? "#F0F8FF" : "blue" },
      ]}
      {...props}
    >
      {disabled ? (
        <Image source={require("../../environment/theme/icons/disabled.png")} />
      ) : (
        <Text
          style={[styles.buttonText, { color: disabled ? "black" : "#ffffff" }]}
        >
          {buttonTitle}
        </Text>
      )}
    </TouchableOpacity>
  );
}
