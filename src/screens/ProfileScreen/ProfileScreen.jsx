import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import Header from "../../Components/Header/Header";

import { Sizes } from "../../environment/sizes";
import { Icons } from "../../environment/theme/Icons";

import styles from "../../Components/Header/Header.style";

const ProfileScreen = ({ navigation }) => {
  //TODO: get notifications
  const notifications = false;

  return (
    <View
      style={{
        paddingTop: Sizes.normalize(125),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header
        title="Profile Page"
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
      <Text>Profile Screen</Text>
    </View>
  );
};

export default ProfileScreen;
