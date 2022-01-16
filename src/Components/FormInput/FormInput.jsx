import React from "react";
import { View, Text, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Colors } from "../../environment/theme/Colors";

import styles from "./FormInput.style";

export default function FormInput({
  labelValue,
  placeHolderText,
  iconType,
  error,
  touched,
  ...props
}) {
  return (
    <View style={{ position: "relative" }}>
      <View style={styles.inputContainer}>
        <View style={styles.iconStyle}>
          <AntDesign
            name={iconType}
            size={30}
            color={touched && error ? Colors.outrageousOrange : Colors.grey}
          />
        </View>
        <TextInput
          style={styles.input}
          value={labelValue}
          numberOfLines={1}
          placeholder={placeHolderText}
          placeholderTextColor={
            touched && error ? Colors.outrageousOrange : Colors.grey
          }
          {...props}
        />
      </View>
      {error && touched && (
        <View style={styles.errorContainer}>
          <Text style={{ color: Colors.scarlet, textAlign: "left" }}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}
