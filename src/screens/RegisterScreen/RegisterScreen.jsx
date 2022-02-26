import React, { useLayoutEffect, useContext } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { useFormik } from "formik";

import { StatusBar } from "expo-status-bar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import FormInput from "../../Components/FormInput/FormInput";
import FormButton from "../../Components/FormButton/FormButton";
import { HideKeyboard } from "../../Components/HideKeyboard/HideKeyboard";
import { registerValidationSchema } from "../../Validations/RegisterValidation";

import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";
import { AuthContext } from "../../navigation/AuthProvider";
import useKeyboardStatus from "../../hooks/keyboardStatus";

import styles from "./RegisterScreen.style";

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);

  const keyboardStatus = useKeyboardStatus();

  const userData = {
    username: "",
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
            backgroundColor={Colors.whiteLilac}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <HideKeyboard>
      <View
        style={[
          styles.container,
          keyboardStatus && { paddingBottom: Sizes.windowHeight / 2 },
        ]}
      >
        <StatusBar style="dark" />
        {!keyboardStatus && <Text style={styles.text}>Create an account</Text>}
        <View style={styles.formContainer}>
          <FormInput
            labelValue={values.username}
            onChangeText={handleChange("username")}
            error={errors.username}
            touched={touched.username}
            onBlur={() => {
              if (!touched.username) {
                setFieldTouched("username", true);
              }
              handleBlur("username");
            }}
            placeHolderText="Username"
            iconType="user"
            autoCapitalize="none"
            autoCorrect={false}
          />
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
            iconType="mail"
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
            iconType="unlock"
            secureTextEntry={true}
          />
          <View style={styles.button}>
            <FormButton
              buttonTitle="Sign up"
              onPress={() =>
                register(values.email, values.password, values.username)
              }
              disabled={!isValid}
            />
          </View>
        </View>
      </View>
    </HideKeyboard>
  );
};

export default RegisterScreen;
