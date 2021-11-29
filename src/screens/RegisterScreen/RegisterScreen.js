import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import FormInput from "../../Components/FormInput/FormInput";
import FormButton from "../../Components/FormButton/FormButton";
import { HideKeyboard } from "../../Components/HideKeyboard/HideKeyboard";
import { registerValidationSchema } from "../../Validations/RegisterValidation";

import { useFormik } from "formik";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { AuthContext } from "../../navigation/AuthProvider";

import styles from "./RegisterScreen.style";

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);

  const userData = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    setFieldTouched,
  } = useFormik({
    initialValues: userData,
    validationSchema: registerValidationSchema,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Sign Up",
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={25}
            backgroundColor="#f9fafd"
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Text style={styles.text}>Create an account</Text>

        <View style={styles.formContainer}>
          <FormInput
            labelValue={values.email}
            onChangeText={handleChange("email")}
            error={errors.email}
            touched={touched.email}
            onBlur={() => {
              if (!touched.email) {
                setFieldTouched("email", true);
              }
              handleBlur("email");
            }}
            placeHolderText="Email"
            iconType="user"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <FormInput
            labelValue={values.password}
            onChangeText={handleChange("password")}
            error={errors.password}
            touched={touched.password}
            onBlur={() => {
              if (!touched.password) {
                setFieldTouched("password", true);
              }
              handleBlur("password");
            }}
            placeHolderText="Password"
            iconType="lock"
            secureTextEntry={true}
          />
          <FormInput
            labelValue={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            onBlur={() => {
              if (!touched.confirmPassword) {
                setFieldTouched("confirmPassword", true);
              }
              handleBlur("confirmPassword");
            }}
            placeHolderText="Confirm Password"
            iconType="check"
            secureTextEntry={true}
          />
        </View>
        <FormButton
          buttonTitle="Sign up"
          onPress={() => register(values.email, values.password)}
          disabled={!isValid}
        />
      </View>
    </HideKeyboard>
  );
};

export default RegisterScreen;
