import React, { useState, useContext, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";

import { StatusBar } from "expo-status-bar";
import * as google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { createUserInfo } from "../../navigation/AuthProvider";

import FormInput from "../../Components/FormInput/FormInput";
import FormButton from "../../Components/FormButton/FormButton";
import MediaButton from "../../Components/MediaButton/MediaButton";
import { HideKeyboard } from "../../Components/HideKeyboard/HideKeyboard";

import { Icons } from "../../environment/theme/Icons";
import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";
import { AuthContext } from "../../navigation/AuthProvider";
import useKeyboardStatus from "../../hooks/keyboardStatus";

import styles from "./LoginScreen.style";
import { resetList } from "../../store/actions/ProductActions";
import { RECEIVING } from "../../store/actions/types";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let provider;
  /*const [googleSubmit,setGoogleSubmit]= useState(false);*/

  const { login, setUser } = useContext(AuthContext);
  const keyboardStatus = useKeyboardStatus();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        dispatch(resetList());
        dispatch({ type: RECEIVING, payload: "RECEIVING" });
      }
    });
  });

  const handleGoogleLogin = () => {
    setIsLoading(true);
    const config = {
      iosClientId: `790947711197-oujljgjp6o4kc2h4ggct290ddk6r2nf1.apps.googleusercontent.com`,
      androidClientId: `790947711197-g3q9rbor9bvunu31404a2b77dcvtlglp.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };

    google
      .logInAsync(config)
      .then((result) => {
        provider = new GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        const { type, user } = result;

        if (type === "success") {
          signInWithCredential(auth, provider);

          setUser(user);

          const googleUser = {
            name: user.givenName + " " + user.familyName,
            email: user.email,
          };

          dispatch({ type: RECEIVING, payload: "RECEIVING" });
          onAuthStateChanged(auth, (user) => {
            if (user !== null) {
              createUserInfo(
                auth.currentUser.uid,
                googleUser.name,
                googleUser.email
              );
            }
          });

          setEmail("");
          setPassword("");
          setIsLoading(false);
          navigation.navigate("Home");
        } else {
          setIsLoading(false);
          console.log("Google sign in was canceled");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);

    try {
      await Facebook.initializeAsync({
        appId: "648087149537730",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile", "email"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );

        const { id, name } = await response.json();
        const fullData = await fetch(
          `https://graph.facebook.com/${id}?fields=id,name,email,picture.width(480)&access_token=${token}`
        );

        const data = await fullData.json();
        // console.log(data);
        const fbProfile = {
          name: name,
          photoUrl: data.picture.data.url,
          email: data.email,
          social: true,
        };
        // console.log(token);
        // const credential = firebase.auth.FacebookAuthProvider.credential(token);
        provider = new FacebookAuthProvider.credential(token);

        signInWithCredential(auth, provider);
        // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        // setPersistence(auth, browserLocalPersistence);

        setUser(fbProfile);
        dispatch({ type: RECEIVING, payload: "RECEIVING" });
        onAuthStateChanged(auth, (user) => {
          if (user !== null) {
            createUserInfo(
              auth.currentUser.uid,
              fbProfile.name,
              fbProfile.email
            );
          }
        });
        // console.log(auth.currentUser.uid);

        setEmail("");
        setPassword("");
        setIsLoading(false);
        navigation.navigate("Home");
        // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        setIsLoading(false);
        Alert.alert(
          "Failure",
          "An error has occured , please try again later."
        );
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      setIsLoading(false);
    }
  };

  return (
    <HideKeyboard>
      <View
        style={[
          styles.container,
          keyboardStatus && { paddingBottom: Sizes.windowHeight / 4 },
        ]}
      >
        <StatusBar style="dark" />
        <View style={styles.logo}>
          <Icons.Wallet />
        </View>
        {isLoading && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={Colors.outrageousOrange}
          />
        )}
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
            setIsLoading(true);
            login(email, password).then(() => setIsLoading(false));
            setEmail("");
            setPassword("");
          }}
        />
        <TouchableOpacity
          style={styles.createOrForgotButton}
          onPress={() => {
            setEmail("");
            setPassword("");
            navigation.navigate("Forgot");
          }}
        >
          <Text style={styles.navButtonText}>Forgot Password ?</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <MediaButton
            buttonTitle="Sign in with Facebook"
            btnType="facebook"
            color={Colors.sanMarino}
            backgroundColor={Colors.perano}
            onPress={handleFacebookLogin}
          />
          <MediaButton
            buttonTitle="Sign in with Google"
            btnType="google"
            color={Colors.punch}
            backgroundColor={Colors.yourPink}
            onPress={handleGoogleLogin}
          />
        </View>
        <TouchableOpacity
          style={[styles.createOrForgotButton, { flexDirection: "row" }]}
          onPress={() => {
            setEmail("");
            setPassword("");
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.navButtonText}>Don't have an account ?</Text>
          <Text style={styles.navButtonText}>Create one here !</Text>
        </TouchableOpacity>
      </View>
    </HideKeyboard>
  );
};

export default LoginScreen;
