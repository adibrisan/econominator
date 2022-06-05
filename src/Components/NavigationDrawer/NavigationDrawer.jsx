import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ActivityIndicator,
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
import { Sizes } from "../../environment/sizes";
import { images } from "../../environment/theme/images";
import { Icons } from "../../environment/theme/Icons";

import styles from "./NavigationDrawer.style";

const NavigationDrawer = (props) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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
          setIsLoggingOut(true);
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
      {isLoggingOut && (
        <ActivityIndicator
          style={{
            position: "absolute",
            top: Sizes.windowHeight / 2,
            left: Sizes.windowWidth / 3.7,
          }}
          size="large"
          color={Colors.outrageousOrange}
        />
      )}
    </View>
  );
};

export default NavigationDrawer;
