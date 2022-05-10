import * as ImagePicker from "expo-image-picker";
import React from "react";
import { TouchableOpacity } from "react-native";

import { Icons } from "../../environment/theme/Icons";

function CustomImagePicker({ onSubmit }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });
    if (!result.cancelled) {
      const processedText = await onSubmit(result.base64);
    }
  };
  return (
    <TouchableOpacity onPress={pickImage}>
      <Icons.Scan />
    </TouchableOpacity>
  );
}
export default CustomImagePicker;
