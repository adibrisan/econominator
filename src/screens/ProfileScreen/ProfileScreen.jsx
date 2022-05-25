import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import LottieView from "lottie-react-native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../../firebase";
import { updateProfile } from "@firebase/auth";
import { onAuthStateChanged } from "@firebase/auth";

import CustomImagePicker from "../../Components/ImagePicker/CustomImagePicker";
import FormButton from "../../Components/FormButton/FormButton";
import FormInput from "../../Components/FormInput/FormInput";
import Header from "../../Components/Header/Header";
import { Modal } from "../../Components/Modal/Modal";

import { AuthContext } from "../../navigation/AuthProvider";
import { useModalHook } from "../../hooks/useModalHook";

import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";
import { Icons } from "../../environment/theme/Icons";
import { images } from "../../environment/theme/images";

import styles from "../../Components/Header/Header.style";
import stylesProfile from "./ProfileScreen.style";

const ProfileScreen = ({ navigation }) => {
  const [{ open: isModalOpen, onClose: onModalClose }, toggleModal] =
    useModalHook();
  const [
    { open: isUserModalOpen, onClose: onUserModalClose },
    toggleUserModal,
  ] = useModalHook();
  const { user, setUser, logout } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [userNameRequired, setUserNameRequired] = useState(false);
  const [profile, setProfile] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        if (
          auth?.currentUser?.providerData[0]?.providerId == "facebook.com" ||
          auth?.currentUser?.providerData[0]?.providerId == "google.com"
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
      `/files/${auth?.currentUser?.uid}/${file.uri.split("ImagePicker/")[1]}`
    );

    const img = await fetch(file.uri);
    const bytes = await img.blob();

    await uploadBytes(reference, bytes);

    await getDownloadURL(reference).then((uri) => {
      setProfilePhoto(uri);
      updateProfile(auth?.currentUser, {
        photoURL: uri,
      });
    });
  };

  const handleSubmit = async () => {
    if (userName === "") {
      setUserNameRequired(true);
    } else {
      setUserNameRequired(false);
      onUserModalClose();
      setUser({ ...user, displayName: userName });
      await updateProfile(auth.currentUser, {
        displayName: userName,
      });
    }
  };

  return (
    <>
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
            source={
              profilePhoto !== "" ? { uri: profilePhoto } : images.profile
            }
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
        <View
          style={{
            alignSelf: "flex-start",
            paddingHorizontal: Sizes.normalize(100),
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={stylesProfile.details}>{`Name: ${
              user?.displayName ? user?.displayName : user?.name
            }`}</Text>
            {profile && (
              <TouchableOpacity
                style={{ paddingLeft: Sizes.normalize(25) }}
                onPress={toggleUserModal}
              >
                <Icons.EditProfile fill={Colors.gulfBlue} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={stylesProfile.details}>{`Mail: ${
            auth?.currentUser?.providerData[0]?.providerId === "facebook.com" ||
            auth?.currentUser?.providerData[0]?.providerId === "google.com"
              ? auth?.currentUser?.providerData[0]?.email
              : auth?.currentUser?.email
          }`}</Text>
          <Text style={stylesProfile.details}>{`Provider: ${
            auth?.currentUser?.providerData[0]?.providerId === "password"
              ? "Econominator"
              : auth?.currentUser?.providerData[0]?.providerId
          }`}</Text>
        </View>
        <View style={{ alignSelf: "center", paddingTop: Sizes.normalize(50) }}>
          <LottieView
            source={require("../../assets/user-profile.json")}
            resizeMode="cover"
            autoPlay
            loop={false}
            style={stylesProfile.animation}
          />
        </View>
        <View style={{ paddingTop: Sizes.normalize(100) }}>
          <FormButton
            customStyle={{ backgroundColor: Colors.outrageousOrange }}
            buttonTitle="Delete account"
            onPress={() => {
              toggleModal();
            }}
          />
        </View>
      </View>
      <Modal open={isModalOpen} onOverlayPress={toggleModal}>
        <View style={stylesProfile.modalContainer}>
          <Text style={stylesProfile.question}>
            Are you sure you want to delete your account ?
          </Text>
          <View style={stylesProfile.yesNoContainer}>
            <TouchableOpacity
              style={{ alignSelf: "flex-start" }}
              onPress={onModalClose}
            >
              <Text
                style={{
                  fontFamily: "Lato-BoldItalic",
                }}
              >
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                logout();
                auth?.currentUser?.delete();
                onModalClose();
              }}
            >
              <Text
                style={{
                  color: Colors.red,
                  fontFamily: "Lato-BoldItalic",
                }}
              >
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal open={isUserModalOpen} onOverlayPress={toggleUserModal}>
        <View style={stylesProfile.userModalContainer}>
          <Text style={stylesProfile.question}>
            You can now edit your username
          </Text>
          <FormInput
            labelValue={userName}
            onChangeText={setUserName}
            placeHolderText="username"
            customIcon={<Icons.Profile />}
            autoCapitalize="none"
            autoCorrect={false}
            error={userNameRequired}
            touched={userNameRequired}
          />
          {userNameRequired && (
            <View
              style={{
                position: "absolute",
                top: Sizes.windowHeight / 6,
                left: Sizes.normalize(55),
              }}
            >
              <Text style={{ color: Colors.outrageousOrange }}>
                Username required before submitting
              </Text>
            </View>
          )}
          <View style={stylesProfile.yesNoContainer}>
            <TouchableOpacity
              style={{ alignSelf: "flex-start" }}
              onPress={onUserModalClose}
            >
              <Text
                style={{
                  fontFamily: "Lato-BoldItalic",
                }}
              >
                Exit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
              <Text
                style={{
                  color: Colors.greenHaze,
                  fontFamily: "Lato-BoldItalic",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfileScreen;
