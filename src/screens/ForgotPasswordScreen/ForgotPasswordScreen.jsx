import React, { useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LottieView from "lottie-react-native";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import FormInput from "../../Components/FormInput/FormInput";
import { HideKeyboard } from "../../Components/HideKeyboard/HideKeyboard";
import { Colors } from "../../environment/theme/Colors";

import styles from "./ForgotPasswordScreen.style";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailRequired, setEmailRequired] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);

  const handleResetPassword = () => {
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setUserNotFound(false);
      setEmailRequired(false);
      setEmailIsValid(true);
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          navigation.navigate("EmailSent");
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            setUserNotFound(true);
          }
        });

      setEmail("");
    } else if (email === "") {
      setEmailRequired(true);
    } else {
      setEmailIsValid(false);
      setEmailRequired(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Forgot Password",
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
  });

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/reset-pass.json")}
          autoPlay
          loop={false}
          style={styles.animation}
        />
        <View style={styles.resetPasswordContainer}>
          <FormInput
            labelValue={email}
            onChangeText={setEmail}
            placeHolderText="Email"
            iconType="mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.resetPasswordText}>
            Enter your registered email below to receive password reset
            instruction.
          </Text>

          <TouchableOpacity onPress={handleResetPassword}>
            <Text style={styles.resetPasswordText}>Reset password</Text>
          </TouchableOpacity>
          {emailRequired ? (
            <View style={styles.validationContainer}>
              <Text style={styles.validationText}>
                Email field is required.
              </Text>
            </View>
          ) : !emailIsValid ? (
            <View style={styles.validationContainer}>
              <Text style={styles.validationText}>
                This email is not valid.
              </Text>
            </View>
          ) : (
            userNotFound && (
              <View style={styles.validationContainer}>
                <Text style={styles.validationText}>
                  This email is not registered in our app.
                </Text>
              </View>
            )
          )}
        </View>
      </View>
    </HideKeyboard>
  );
};

export default ForgotPasswordScreen;
