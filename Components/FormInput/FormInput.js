import React from "react";
import { View, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./FormInput.style";

export default function FormInput({
  labelValue,
  placeHolderText,
  iconType,
  ...props
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#666" />
      </View>
      <TextInput
        style={styles.input}
        value={labelValue}
        numberOfLines={1}
        placeholder={placeHolderText}
        placeholderTextColor="#666"
        {...props}
      />
    </View>
  );
}
