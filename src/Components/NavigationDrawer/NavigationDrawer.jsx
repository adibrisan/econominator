import React, { useContext } from "react";
import { useDispatch } from "react-redux";
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
import { I18nContext } from "../../navigation/i18nProvider";
import { resetList } from "../../store/actions/ProductActions";
import { NO_DATA } from "../../store/actions/types";

import { Colors } from "../../environment/theme/Colors";
import { images } from "../../environment/theme/images";
import { Icons } from "../../environment/theme/Icons";

import styles from "./NavigationDrawer.style";

const NavigationDrawer = (props) => {
  const { user, logout } = useContext(AuthContext);
  const { I18n } = useContext(I18nContext);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        contentContainerStyle={{ backgroundColor: Colors.boulder }}
        {...props}
      >
        <ImageBackground
          source={images.drawerBackground}
          style={styles.backgroundImage}
        >
          <Image
            style={styles.image}
            source={
              user?.photoURL
                ? { uri: user?.photoURL }
                : user?.photoUrl
                ? { uri: user?.photoUrl }
                : images.userPhoto
            }
          />
          <Text numberOfLines={3} style={styles.drawerUsername}>
            {user?.displayName ? user?.displayName : user?.name}
          </Text>
        </ImageBackground>
        <View style={styles.itemList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          dispatch(resetList());
          dispatch({ type: NO_DATA, payload: "NO_DATA" });
          logout();
        }}
      >
        <Icons.Logout />
        <Text style={styles.logoutText}>
          {I18n.t("navigationDrawer.logout")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationDrawer;
