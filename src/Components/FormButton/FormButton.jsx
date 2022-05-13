import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { Colors } from "../../environment/theme/Colors";
import { Icons } from "../../environment/theme/Icons";

import styles from "./FormButton.style";

export default function FormButton({
  buttonTitle,
  disabled,
  customStyle,
  ...props
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.buttonContainer,
        { backgroundColor: disabled ? "transparent" : Colors.ebonyClay },
        customStyle,
      ]}
      {...props}
    >
      {disabled ? (
        <Icons.Error width={30} height={30} />
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
