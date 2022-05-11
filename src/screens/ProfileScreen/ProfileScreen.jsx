import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import Header from "../../Components/Header/Header";
import CustomImagePicker from "../../Components/ImagePicker/CustomImagePicker";

import { AuthContext } from "../../navigation/AuthProvider";

import { Sizes } from "../../environment/sizes";
import { Icons } from "../../environment/theme/Icons";

import { images } from "../../environment/theme/images";

import styles from "../../Components/Header/Header.style";
import stylesProfile from "./ProfileScreen.style";

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
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
      <Image
        style={stylesProfile.image}
        source={user?.photoUrl ? { uri: user.photoUrl } : images.profile}
      />
      <View
        style={{
          paddingTop: Sizes.normalize(120),
          justifyContent: "flex-start",
        }}
      >
        <CustomImagePicker isProfile onSubmit={() => {}} />
      </View>
    </View>
  );
};

export default ProfileScreen;
