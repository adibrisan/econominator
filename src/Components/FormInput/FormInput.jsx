import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import useKeyboardStatus from "../../hooks/keyboardStatus";

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
  customIcon,
  isExchange,
  isProduct,
  ...props
}) {
  const [isSecured, setIsSecured] = useState(true);

  const keyboardStatus = useKeyboardStatus();
  // console.log(error);

  useEffect(() => {
    if (!labelValue) {
      setIsSecured(true);
    }
  }, [labelValue]);

  if (props.secureTextEntry) {
    props.secureTextEntry = isSecured;
  }

  return (
    <View style={{ position: "relative" }}>
      <View
        style={
          isExchange
            ? !error
              ? [styles.inputContainer, { width: "50%" }]
              : [styles.inputContainerError, { width: "50%" }]
            : styles.inputContainer
        }
      >
        <View
          style={
            isExchange
              ? !error
                ? styles.iconStyle
                : styles.iconStyleError
              : styles.iconStyle
          }
        >
          {customIcon ? (
            customIcon
          ) : (
            <AntDesign
              name={iconType}
              size={30}
              color={touched && error ? Colors.outrageousOrange : Colors.grey}
            />
          )}
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
        <View
          style={[
            isProduct ? styles.errorContainerProduct : styles.errorContainer,
            !isProduct && keyboardStatus && { top: Sizes.windowHeight / 16 },
          ]}
        >
          <Text style={{ color: Colors.scarlet, textAlign: "left" }}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}
