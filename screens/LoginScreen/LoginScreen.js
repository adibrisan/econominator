import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

import { StatusBar } from "expo-status-bar";

import FormInput from "../../Components/FormInput/FormInput";
import FormButton from "../../Components/FormButton/FormButton";
import SocialButton from "../../Components/SocialButton/SocialButton";

import { images } from "../../environment/theme/images";

import styles from "./LoginScreen.style";
import { Sizes } from "../../environment/sizes";
import Toast from "react-native-toast-message";

import { HideKeyboard } from "../../Components/HideKeyboard/HideKeyboard";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);

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
      setIsVerified(auth.currentUser.emailVerified);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          showToast("error", "This account was not found !", error.message);
          break;
        case "auth/invalid-email":
          showToast(
            "error",
            "Invalid email.",
            "You must enter a valid email !"
          );
          break;
        case "auth/wrong-password":
          console.log("wrong pass");
          // showToast(
          //   "error",
          //   "Invalid password.",
          //   "You must enter a valid email !"
          // );
          break;
      }
    }
    
    if (isVerified) {
      navigation.replace("Home");
    } else {
      showToast("info", "Check your email !", "Verify your account via email");
    }

    setEmail("");
    setPassword("");
  };

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
    <HideKeyboard>
      <View style={styles.container}>
        <StatusBar style="dark" />
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
        <FormButton buttonTitle="Sign in" onPress={login} />
        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password ?</Text>
        </TouchableOpacity>
        <SocialButton
          buttonTitle="Sign in with Facebook"
          btnType="facebook"
          color="#4867aa"
          backgroundColor="#ABCDF0"
          onPress={() => {}}
        />
        <SocialButton
          buttonTitle="Sign in with Google"
          btnType="google"
          color="#de4d41"
          backgroundColor="#FFC5C4"
          onPress={() => {}}
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
    </HideKeyboard>
  );
};

export default LoginScreen;
