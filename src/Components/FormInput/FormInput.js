import React from "react";
import { View, Text, TextInput } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import styles from "./FormInput.style";

export default function FormInput({
  labelValue,
  placeHolderText,
  iconType,
  ...props
}) {
  const { error, touched } = props;

  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.iconStyle}>
          <EvilIcons name={iconType} size={40} color="#666" />
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
      {error ? (
        <Text style={{ color: "red", textAlign: "left" }}>{error}</Text>
      ) : null}
      {touched ? (<Text style={{ color: "red", textAlign: "left" }}>{touched}</Text>) : null }

    </>
  );
}
