import React, { useContext,useLayoutEffect } from "react";
import { View, Text } from "react-native";
import FormButton from "../../Components/FormButton/FormButton";
import { AuthContext } from "../../navigation/AuthProvider";

const HomeScreen = ({ navigation, route }) => {
  const { user, logout } = useContext(AuthContext);

  const gmail = route.params && route.params.email;
  const fbName = route.params && route.params.name;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null,
    });
  }, [navigation]);

  return (
    <View>
      <Text>Welcome {user?.email || gmail || fbName}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
};

export default HomeScreen;
