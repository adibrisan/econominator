import React, { useState, useContext } from "react";
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
import { AuthContext } from "../../navigation/AuthProvider";

import * as google from "expo-google-app-auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /*const [googleSubmit,setGoogleSubmit]= useState(false);*/

  const { login } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    const config = {
      iosClientId: `790947711197-oujljgjp6o4kc2h4ggct290ddk6r2nf1.apps.googleusercontent.com`,
      androidClientId: `790947711197-g3q9rbor9bvunu31404a2b77dcvtlglp.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };

    google
      .logInAsync(config)
      .then((result) => {
        const { type, user } = result;

        if (type === "success") {
         const {email,name,photoUrl} = user;
          setTimeout(() => navigation.navigate("Home",{email}), 1000);
        } else {
          console.log("Google sign in was canceled");
        }
      })
      .catch((error) => console.log(error));
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
        <FormButton
          buttonTitle="Sign in"
          onPress={() => {
            login(email, password);
            setEmail("");
            setPassword("");
          }}
        />
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
          onPress={handleGoogleLogin}
        />
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.navButtonText}>
            Don't have an account ? Create one here !
          </Text>
        </TouchableOpacity>
      </View>
    </HideKeyboard>
  );
};

export default LoginScreen;
