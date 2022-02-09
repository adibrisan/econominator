import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Icons } from "../../environment/theme/Icons";

import styles from "./Header.style";

const Header = ({ title, openDrawer, notifications }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={openDrawer()}>
        <Icons.Navigation />
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity>
        {notifications ? (
          <Icons.ActiveNotification />
        ) : (
          <Icons.InactiveNotification />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
