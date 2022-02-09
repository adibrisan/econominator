import React, { useContext } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

import FormButton from "../../Components/FormButton/FormButton";
import Header from "../../Components/Header/Header";
import { Sizes } from "../../environment/sizes";

import { Icons } from "../../environment/theme/Icons";
import { AuthContext } from "../../navigation/AuthProvider";

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  const { products } = useSelector((state) => state.trs);
  const DATA = Object.values(
    products.reduce((acc, item) => {
      if (!acc[item.addedTime]) {
        acc[item.addedTime] = {
          title: item.addedTime,
          data: [],
          price: item.price,
        };
      }
      acc[item.addedTime].data.push(item);
      return acc;
    })
  );

  return (
    <View style={{ paddingTop: Sizes.normalize(125) }}>
      <Header
        title="Home Page"
        openDrawer={() => navigation.openDrawer}
        notifications={false}
      />
      <Text>Welcome {user?.name}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
};

export default HomeScreen;
