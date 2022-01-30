import React, { useContext } from "react";
import { View, Text } from "react-native";

import FormButton from "../../Components/FormButton/FormButton";

import { AuthContext } from "../../navigation/AuthProvider";

const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);

  console.log(user);

  return (
    <View style={{marginTop:150}}>
      <Text>Welcome {user?.name}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
    
  );
};

export default HomeScreen;
