import React, { useContext,useLayoutEffect } from "react";
import { View, Text } from "react-native";

import FormButton from "../../Components/FormButton/FormButton";

import { AuthContext } from "../../navigation/AuthProvider";

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null,
    });
  }, [navigation]);

  console.log(user);

  return (
    <View>
      <Text>Welcome {user.name}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
};

export default HomeScreen;
