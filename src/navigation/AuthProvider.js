import React, { createContext, useState } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { auth } from "../../firebase";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "@firebase/auth";
import { db } from "../../firebase";
import { ref, set } from "firebase/database";

import { resetList } from "../store/actions/ProductActions";
import { NO_DATA } from "../store/actions/types";

import { Sizes } from "../environment/sizes";

export const showToast = (typo, title, subtitle) => {
  Toast.show({
    type: typo,
    text1: title,
    text2: subtitle,
    visibilityTime: 7000,
    topOffset: Sizes.normalize(300),
  });
};

export const AuthContext = createContext();

export const createUserInfo = (id, username, email) => {
  set(ref(db, `usersList/${id}/personalInfo`), {
    id,
    username,
    email,
  });
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await signInWithEmailAndPassword(auth, email, password);

            if (!auth.currentUser.emailVerified) {
              showToast(
                "info",
                "Check your email !",
                "Verify your account via email"
              );
            } else {
              setUser(auth.currentUser);
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
        register: async (email, password, username) => {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {
              displayName: username,
            }).catch((error) => alert(error.message));
            sendEmailVerification(auth.currentUser)
              .then(() => {
                createUserInfo(auth.currentUser.uid, username, email);
              })
              .catch((error) => {
                showToast("error", "Email verification error.", `${error}`);
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
            dispatch(resetList());
            dispatch({ type: NO_DATA, payload: "NO_DATA" });
            await signOut(auth);
            setUser(null);
            navigation.navigate("Login");
          } catch (error) {
            showToast("error", "Logout error.", `${error}`);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
