import React, { createContext, useState } from "react";
import Toast from "react-native-toast-message";

import { useNavigation } from "@react-navigation/native";

import { auth } from "../../firebase";
import { signOut } from "@firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "@firebase/auth";

import { Sizes } from "../environment/sizes";


const showToast = (typo, title, subtitle) => {
  Toast.show({
    type: typo,
    text1: title,
    text2: subtitle,
    visibilityTime: 7000,
    topOffset: Sizes.normalize(300),
  });
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log(auth.currentUser);

            if (!auth.currentUser.emailVerified) {
              console.log(
                "NU E VERIFICAT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
              );
              showToast(
                "info",
                "Check your email !",
                "Verify your account via email"
              );
            } else {
              navigation.navigate("Home");
            }
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
        },
        register: async (email, password) => {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            sendEmailVerification(auth.currentUser)
              .then(() => {
                console.log(auth.currentUser);
                console.log("EMAIL SUCCESSFULLY SENT!!!!!!!!!!!!!!!!!!");
              })
              .catch((error) => {
                console.log("Email verification error", error);
              });
            showToast(
              "info",
              "Check your email !",
              "Verify your account via email"
            );
            navigation.goBack();
          } catch (error) {
            switch (error.code) {
              case "auth/invalid-email":
                showToast(
                  "error",
                  "Invalid email.",
                  "You must enter a valid email !"
                );
                break;
              case "auth/invalid-password":
                showToast(
                  "error",
                  "Password is too short.",
                  "You must enter a 6 characters password !"
                );
                break;
              case "auth/email-already-exists":
                showToast(
                  "error",
                  "This email is already used !",
                  "Try something else."
                );
                break;
            }
          }
        },
        logout: async () => {
          try {
            await signOut(auth);
            navigation.navigate("Login");
          } catch (error) {
            console.log(error);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
