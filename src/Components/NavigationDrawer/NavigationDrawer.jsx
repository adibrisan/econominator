import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { AuthContext } from "../../navigation/AuthProvider";

import { Colors } from "../../environment/theme/Colors";
import { images } from "../../environment/theme/images";
import { Icons } from "../../environment/theme/Icons";
import { Sizes } from "../../environment/sizes";

import styles from "./NavigationDrawer.style";

const NavigationDrawer = (props) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        contentContainerStyle={{ backgroundColor: Colors.abey }}
        {...props}
      >
        <ImageBackground
          source={images.drawerBackground}
          style={styles.backgroundImage}
        >
          <Image
            style={styles.image}
            source={user?.photoUrl ? { uri: user.photoUrl } : images.userPhoto}
          />
          <Text style={styles.drawerUsername}>{user?.name}</Text>
        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Icons.Logout />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationDrawer;
