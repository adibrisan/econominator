import React, { useContext,useLayoutEffect } from "react";
import { View, Text } from "react-native";
import FormButton from "../../Components/FormButton/FormButton";
import { AuthContext } from "../../navigation/AuthProvider";

const HomeScreen = ({ navigation, route }) => {
  const { user, logout } = useContext(AuthContext);

  const googleName = route.params && route.params.name;
  const fbName = route.params && route.params.fbname;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null,
    });
  }, [navigation]);

  console.log(user);

  return (
    <View>
      <Text>Welcome {user?.displayName || googleName || fbName}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
};

export default HomeScreen;
