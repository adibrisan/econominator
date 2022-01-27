import React, { useState, useContext } from "react";
import { Text, View, TouchableOpacity, Image, Alert, ScrollView } from "react-native";

import { StatusBar } from "expo-status-bar";
import * as google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

import FormInput from "../../Components/FormInput/FormInput";
import FormButton from "../../Components/FormButton/FormButton";
import SocialButton from "../../Components/SocialButton/SocialButton";
import { HideKeyboard } from "../../Components/HideKeyboard/HideKeyboard";

import { images } from "../../environment/theme/images";
import { Colors } from "../../environment/theme/Colors";
import { AuthContext } from "../../navigation/AuthProvider";

import styles from "./LoginScreen.style";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /*const [googleSubmit,setGoogleSubmit]= useState(false);*/

  const { login, setUser } = useContext(AuthContext);

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
          setUser(user);
          navigation.navigate("Home");
        } else {
          console.log("Google sign in was canceled");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleFacebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "648087149537730",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        const { id, name } = await response.json();
        const fullData = await fetch(
          `https://graph.facebook.com/${id}?fields=id,name,email,picture&access_token=${token}`
        );
        const data = await fullData.json();
        const fbProfile = {
          name: name,
          photoUrl: data.picture.data.url,
        };
        
        setUser(fbProfile);
        navigation.navigate("Home");
        // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        Alert.alert(
          "Failure",
          "An error has occured , please try again later."
        );
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (

    <HideKeyboard>
      <ScrollView>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Image source={images.login} style={styles.logo} />
        <Text style={styles.text}>Econominator</Text>
        <Text style={styles.credentialsText}>
          Use your credentials below and login to your account
        </Text>
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
        <TouchableOpacity
          style={styles.createOrForgotButton}
          onPress={() => {
            navigation.navigate("Forgot");
          }}
        >
          <Text style={styles.navButtonText}>Forgot Password ?</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
        <SocialButton
          buttonTitle="Sign in with Facebook"
          btnType="facebook"
          color={Colors.sanMarino}
          backgroundColor={Colors.perano}
          onPress={handleFacebookLogin}
        />
        <SocialButton
          buttonTitle="Sign in with Google"
          btnType="google"
          color={Colors.punch}
          backgroundColor={Colors.yourPink}
          onPress={handleGoogleLogin}
        />
        </View>
        <TouchableOpacity
          style={[styles.createOrForgotButton, { flexDirection: "row" }]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.navButtonText}>Don't have an account ?</Text>
          <Text style={styles.navButtonText}>Create one here !</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </HideKeyboard>
  );
};

export default LoginScreen;
