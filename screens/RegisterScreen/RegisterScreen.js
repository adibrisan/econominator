import React, { useState, useLayoutEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import FormInput from "../../Components/FormInput/FormInput";
import FormButton from "../../Components/FormButton/FormButton";
import { HideKeyboard } from "../../Components/HideKeyboard/HideKeyboard";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import styles from "./RegisterScreen.style";

import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";
import { sendEmailVerification } from "@firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log(auth.currentUser);
          console.log("EMAIL SUCCESSFULLY SENT!!!!!!!!!!!!!!!!!!");
        })
        .catch((error) => {
          console.log("Email verification error", error);
        });
    } catch (error) {
      console.log(error.message);
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
        <View style={styles.formContainer}>
          <FormInput
            labelValue={email}
            onChangeText={(text) => setEmail(text)}
            placeHolderText="Email"
            iconType="user"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <FormInput
            labelValue={password}
            onChangeText={(text) => setPassword(text)}
            placeHolderText="Password"
            iconType="lock"
            secureTextEntry={true}
          />
          <FormInput
            labelValue={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeHolderText="Confirm Password"
            iconType="check"
            secureTextEntry={true}
          />
        </View>
        <FormButton buttonTitle="Sign up" onPress={register} />
      </View>
    </HideKeyboard>
  );
};

export default RegisterScreen;
