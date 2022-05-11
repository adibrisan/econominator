import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";

import { Colors } from "../../environment/theme/Colors";
import { Icons } from "../../environment/theme/Icons";
import { Sizes } from "../../environment/sizes";

export const uploadFile = (file) => {
  if (!file) {
    return;
  }
  console.log(typeof file);
  const reference = ref(storage, `/files/${file.split("ImagePicker/")[1]}`);
  const uploadTask = uploadBytesResumable(reference, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const pr = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      // setProgress(pr);
    },
    (error) => console.log(error),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
    }
  );
};

function CustomImagePicker({ onSubmit, isProfile }) {
  const [progress, setProgress] = useState(0);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });
    if (!result.cancelled) {
      console.log(result.uri);
      if (!isProfile) {
        await onSubmit(result.base64);
      } else {
        await onSubmit(result.uri);
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
          <Text>Pick photo from gallery</Text>
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
