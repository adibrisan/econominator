import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

import FormInput from "../../Components/FormInput/FormInput";
import FormButton from "../../Components/FormButton/FormButton";
import AuthButton from "../../Components/AuthButton/AuthButton";

import AntDesign from "react-native-vector-icons/AntDesign";

import { images } from "../../environment/theme/images";

import styles from "./LoginScreen.style";
import { NavigationHelpersContext } from "@react-navigation/core";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showToast = (typo, title, subtitle) => {
    Toast.show({
      type: typo,
      text1: title,
      text2: subtitle,
      visibilityTime: 7000,
      topOffset: Sizes.normalize(300),
    });
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (!auth.currentUser.emailVerified) {
        showToast(
          "info",
          "Check your email !",
          "Verify your account via email"
        );
      }

      navigation.replace("Home");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          showToast(
            "error",
            "This account was not found !",
            "This user was not found"
          );
          break;
        case "auth/invalid-email":
          showToast(
            "error",
            "Invalid email.",
            "You must enter a valid email !"
          );
          break;
        case "auth/wrong-password":
          showToast(
            "error",
            "Invalid password.",
            "Retry entering your password."
          );
          break;
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Image source={images.login} style={styles.logo} />
      <Text style={styles.text}>Econominator</Text>
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
      <FormButton
        buttonTitle="Sign in"
        onPress={() => console.log("sign in button pressed")}
      />
      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password ?</Text>
      </TouchableOpacity>
      <AuthButton
        buttonTitle="Sign in with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={()=>{}}
      />
      <AuthButton
        buttonTitle="Sign in with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={()=>{}}
      />
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.navButtonText}>
          Don't have an account ? Create here !
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
