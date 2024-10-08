import { locale } from "expo-localization";
import React, { useState, useLayoutEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LottieView from "lottie-react-native";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import FormInput from "../../Components/FormInput/FormInput";
import { HideKeyboard } from "../../Components/HideKeyboard/HideKeyboard";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";
import useKeyboardStatus from "../../hooks/keyboardStatus";
import { validEmail } from "../../validations/RegisterValidation";

import { I18nContext } from "../../navigation/i18nProvider";

import styles from "./ForgotPasswordScreen.style";

const ForgotPasswordScreen = ({ navigation }) => {
  const { I18n } = useContext(I18nContext);
  const [email, setEmail] = useState("");
  const [emailRequired, setEmailRequired] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);

  const keyboardStatus = useKeyboardStatus();

  const handleResetPassword = () => {
    if (validEmail(email)) {
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
      title: I18n.t("forgotPassword.title"),
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
      <View
        accessibilityLabel="Animation"
        style={[
          styles.container,
          keyboardStatus && { bottom: Sizes.windowHeight / 5 },
        ]}
      >
        <LottieView
          source={require("../../assets/reset-pass.json")}
          autoPlay
          loop={false}
          style={styles.animation}
        />
        <View
          accessibilityLabel="ForgotPasswordContainer"
          style={styles.resetPasswordContainer}
        >
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
            {I18n.t("forgotPassword.description")}
          </Text>

          <TouchableOpacity
            style={{ marginTop: Sizes.normalize(50) }}
            onPress={handleResetPassword}
          >
            <Text style={styles.resetPasswordText}>
              {I18n.t("forgotPassword.reset")}
            </Text>
          </TouchableOpacity>
          {emailRequired ? (
            <View
              style={[
                styles.validationContainer,
                keyboardStatus && { top: Sizes.normalize(-55) },
              ]}
            >
              <Text style={styles.validationText}>
                {locale == "ro-RO"
                  ? "Câmpul de email este obligatoriu."
                  : "Email field is required."}
              </Text>
            </View>
          ) : !emailIsValid ? (
            <View
              style={[
                styles.validationContainer,
                keyboardStatus && { top: Sizes.normalize(-55) },
              ]}
            >
              <Text style={styles.validationText}>
                {locale == "ro-RO"
                  ? "Acest e-mail nu este valid."
                  : "This email is not valid."}
              </Text>
            </View>
          ) : (
            userNotFound && (
              <View
                style={[
                  styles.validationContainer,
                  keyboardStatus && { top: Sizes.normalize(-55) },
                ]}
              >
                <Text style={styles.validationText}>
                  {locale == "ro-RO"
                    ? "Contul nu este înregistrat în aplicația noastră."
                    : "This email is not registered in our app."}
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
