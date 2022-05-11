import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import Header from "../../Components/Header/Header";
import CustomImagePicker from "../../Components/ImagePicker/CustomImagePicker";

import { AuthContext } from "../../navigation/AuthProvider";
import { uploadFile } from "../../Components/ImagePicker/CustomImagePicker";

import { Sizes } from "../../environment/sizes";
import { Icons } from "../../environment/theme/Icons";

import { images } from "../../environment/theme/images";

import styles from "../../Components/Header/Header.style";
import stylesProfile from "./ProfileScreen.style";

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

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
        headerRight={<View />}
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
        <CustomImagePicker isProfile onSubmit={uploadFile} />
      </View>
    </View>
  );
};

export default ProfileScreen;
