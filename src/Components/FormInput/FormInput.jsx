import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Colors } from "../../environment/theme/Colors";
import { Icons } from "../../environment/theme/Icons";
import { Sizes } from "../../environment/sizes";

import styles from "./FormInput.style";

export default function FormInput({
  labelValue,
  placeHolderText,
  iconType,
  error,
  touched,
  ...props
}) {
  const [isSecured, setIsSecured] = useState(true);

  if (props.secureTextEntry) {
    props.secureTextEntry = isSecured;
  }

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
        {placeHolderText.includes("Password") && (
          <TouchableOpacity
            style={{ paddingRight: Sizes.normalize(40) }}
            onPress={() => setIsSecured(!isSecured)}
          >
            {isSecured ? <Icons.Eye /> : <Icons.EyeCrossed />}
          </TouchableOpacity>
        )}
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
