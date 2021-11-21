import React, { useContext } from "react";
import { View, Text } from "react-native";
import FormButton from "../../Components/FormButton/FormButton";
import { AuthContext } from "../../navigation/AuthProvider";

const HomeScreen = ({ navigation, route }) => {
  const { user, logout } = useContext(AuthContext);
  const { email } = route.params;

  return (
    <View>
      <Text>Welcome {user?.uid || email}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
};

export default HomeScreen;
