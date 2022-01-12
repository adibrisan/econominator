import React, { useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LottieView from "lottie-react-native";

import FormInput from "../../Components/FormInput/FormInput";
import { HideKeyboard } from "../../Components/HideKeyboard/HideKeyboard";
import { Colors } from "../../environment/theme/Colors";

import styles from "./ForgotPasswordScreen.style";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

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
        <FormInput
          labelValue={email}
          onChangeText={setEmail}
          placeHolderText="Email"
          iconType="envelope"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View>
          <Text style={styles.resetPasswordText}>Enter your registered email below to receive password reset instruction.</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("EmailSent")}>
          <Text style={styles.resetPasswordText}>Reset password</Text>
        </TouchableOpacity>
      </View>
    </HideKeyboard>
  );
};

export default ForgotPasswordScreen;
