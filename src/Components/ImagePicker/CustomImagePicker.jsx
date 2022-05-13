import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Text, TouchableOpacity, TouchableHighlight } from "react-native";

import { Colors } from "../../environment/theme/Colors";
import { Icons } from "../../environment/theme/Icons";
import { Sizes } from "../../environment/sizes";

import stylesProfile from "../../screens/ProfileScreen/ProfileScreen.style";

function CustomImagePicker({ onSubmit, isProfile }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });
    if (!result.cancelled) {
      if (!isProfile) {
        await onSubmit(result.base64);
      } else {
        await onSubmit(result);
      }
    }
  };

  return (
    <>
      {isProfile ? (
        <TouchableHighlight
          style={{ padding: Sizes.normalize(80), borderRadius: 30 }}
          underlayColor={Colors.iron}
          onPress={pickImage}
        >
          <Text style={stylesProfile.details}>Pick photo from gallery</Text>
        </TouchableHighlight>
      ) : (
        <TouchableOpacity onPress={pickImage}>
          <Icons.Scan />
        </TouchableOpacity>
      )}
    </>
  );
}
export default CustomImagePicker;
