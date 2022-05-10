import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Button, Image, View, Text, TouchableOpacity } from "react-native";

import { Icons } from "../../environment/theme/Icons";

function CustomImagePicker({ onSubmit }) {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("Please add an image");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true, //return base64 data.
      //this will allow the Vision API to read this image.
    });
    if (!result.cancelled) {
      //if the user submits an image,
      setImage(result.uri);
      // console.log(result.base64);
      //run the onSubmit handler and pass in the image data.
      const googleText = await onSubmit(result.base64);
    }
  };
  return (
    <TouchableOpacity onPress={pickImage}>
      <Icons.Scan />
    </TouchableOpacity>
  );
}
export default CustomImagePicker;
