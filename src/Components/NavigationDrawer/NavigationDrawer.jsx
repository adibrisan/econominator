import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { AuthContext } from "../../navigation/AuthProvider";

import { Colors } from "../../environment/theme/Colors";
import { images } from "../../environment/theme/images";

import styles from "./NavigationDrawer.style"

const NavigationDrawer = (props) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        contentContainerStyle={{ backgroundColor: Colors.mineShaft }}
        {...props}
      >
        <Image style={styles.image} source={user?.photoUrl ? { uri: user.photoUrl } : images.userPhoto} />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationDrawer;
