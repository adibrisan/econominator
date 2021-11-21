import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import FormInput from "../../Components/FormInput/FormInput";
import FormButton from "../../Components/FormButton/FormButton";
import { HideKeyboard } from "../../Components/HideKeyboard/HideKeyboard";
import { registerValidationSchema } from "../../Validations/RegisterValidation";

import { Formik } from "formik";

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
        <Formik
          initialValues={userData}
          validationSchema={registerValidationSchema}
        >
          {({ values, errors,isValid, handleChange }) => {
            const { email, password, confirmPassword } = values;
            
            return (
              <>
                <View style={styles.formContainer}>
                  <FormInput
                    labelValue={email}
                    error={errors.email}
                    onChangeText={handleChange("email")}
                    placeHolderText="Email"
                    iconType="user"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <FormInput
                    labelValue={password}
                    error={errors.password}
                    onChangeText={handleChange("password")}
                    placeHolderText="Password"
                    iconType="lock"
                    secureTextEntry={true}
                  />
                  <FormInput
                    labelValue={confirmPassword}
                    error={errors.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    placeHolderText="Confirm Password"
                    iconType="check"
                    secureTextEntry={true}
                  />
                </View>
                <FormButton
                  buttonTitle="Sign up"
                  onPress={() => register(email, password)}
                  disabled={!isValid}
                />
              </>
            );
          }}
        </Formik>
      </View>
    </HideKeyboard>
  );
};

export default RegisterScreen;
