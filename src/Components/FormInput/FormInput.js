import React from "react";
import { View, Text, TextInput } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { Colors } from "../../environment/theme/Colors";

import styles from "./FormInput.style";

export default function FormInput({
  labelValue,
  placeHolderText,
  iconType,
  error,
  touched,
  onBlur,
  ...props
}) {
  if(onBlur){
    console.log(" exista onblur ");
  }
  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.iconStyle}>
          <EvilIcons
            name={iconType}
            size={40}
            color={touched && error ? Colors.outrageousOrange : Colors.grey}
          />
        </View>
        <TextInput
          style={styles.input}
          value={labelValue}
          numberOfLines={1}
          placeholder={placeHolderText}
          placeholderTextColor={touched && error ? Colors.outrageousOrange : Colors.grey}
          {...props}
        />
      </View>
      {error && touched && (
        <Text style={{ color: Colors.scarlet, textAlign: "left" }}>{error}</Text>
      )}
    </>
  );
}
