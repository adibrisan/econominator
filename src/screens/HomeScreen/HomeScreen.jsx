import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import FormButton from "../../Components/FormButton/FormButton";
import Header from "../../Components/Header/Header";

import { AuthContext } from "../../navigation/AuthProvider";

import { Icons } from "../../environment/theme/Icons";
import { Sizes } from "../../environment/sizes";

import styles from "../../Components/Header/Header.style";
import stylesHome from "./HomeScreen.style";

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  //TODO: get notification status
  const notifications = true;

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
  console.log("====================================");
  console.log(user?.name);
  console.log("====================================");

  return (
    <View style={{ flex: 1, paddingTop: Sizes.normalize(125) }}>
      <Header
        title="Home Page"
        headerLeft={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icons.Navigation />
          </TouchableOpacity>
        }
        headerLeftStyle={styles.headerLeft}
        headerRight={
          <TouchableOpacity>
            {notifications ? (
              <Icons.ActiveNotification />
            ) : (
              <Icons.InactiveNotification />
            )}
          </TouchableOpacity>
        }
        headerRightStyle={styles.headerRight}
      />
      <Text>Welcome {user?.displayName ? user?.displayName : user?.name}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
};

export default HomeScreen;
