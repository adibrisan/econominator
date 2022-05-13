import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../../firebase";
import { updateProfile } from "@firebase/auth";
import { onAuthStateChanged } from "@firebase/auth";

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
  const [profile, setProfile] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        if (
          auth.currentUser.providerData[0].providerId == "facebook.com" ||
          auth.currentUser.providerData[0].providerId == "google.com"
        ) {
          setProfile(false);
        } else {
          setProfilePhoto(user?.photoURL ? user?.photoURL : "");
        }
      }
    });
    return () => {
      setProfilePhoto("");
    };
  }, []);

  const uploadFile = async (file) => {
    if (!file) {
      return;
    }

    const reference = ref(
      storage,
      `/files/${auth.currentUser.uid}/${file.uri.split("ImagePicker/")[1]}`
    );

    const img = await fetch(file.uri);
    const bytes = await img.blob();

    await uploadBytes(reference, bytes);

    await getDownloadURL(reference).then((uri) => {
      setProfilePhoto(uri);
      updateProfile(auth.currentUser, {
        photoURL: uri,
      });
    });
  };

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
      {!profile ? (
        <Image style={stylesProfile.image} source={{ uri: user?.photoUrl }} />
      ) : (
        <Image
          style={stylesProfile.image}
          source={profilePhoto !== "" ? { uri: profilePhoto } : images.profile}
        />
      )}
      <View
        style={{
          paddingTop: Sizes.normalize(120),
          justifyContent: "flex-start",
        }}
      >
        {profile && <CustomImagePicker isProfile onSubmit={uploadFile} />}
      </View>
    </View>
  );
};

export default ProfileScreen;
