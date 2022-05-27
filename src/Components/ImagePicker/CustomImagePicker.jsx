import * as ImagePicker from "expo-image-picker";
import { OCR_API_KEY as API_KEY } from "@env";
import React from "react";
import { Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { showToast } from "../../navigation/AuthProvider";

import { Colors } from "../../environment/theme/Colors";
import { Icons } from "../../environment/theme/Icons";
import { Sizes } from "../../environment/sizes";

import stylesProfile from "../../screens/ProfileScreen/ProfileScreen.style";

function checkUnique(total) {
  let unique = "";
  let ok = false;
  for (const char of total) {
    if (char !== ",") {
      unique = unique + char;
    } else if (char === "," && ok === false) {
      unique = unique + char;
      ok = true;
    }
  }
  return unique;
}

function CustomImagePicker({ onSubmit, isProfile, date }) {
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });
    if (!result.cancelled) {
      if (!isProfile) {
        const response = await fetch(
          `https://ocr-text-extractor.p.rapidapi.com/detect-text-from-image-file`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Accept: "string",
              "X-RapidAPI-Host": "ocr-text-extractor.p.rapidapi.com",
              "X-RapidAPI-Key": `${API_KEY}`,
            },
            body: `{"ImageContentInBase64":${result.base64}}`,
          }
        );
        await response
          .json()
          .then((res) => {
            const ocrTotalPrice = res.parsedResults[0].parsedText
              .split("RON")
              .pop()
              .split("TOTAL")[1];
            const totalPrice = ocrTotalPrice.split("\n")[0];
            let total = totalPrice.trim().replace(/\s/g, ",");
            let totalFiltered = checkUnique(total).replace(",", ".");
            const products = res.parsedResults[0].parsedText
              .split("RON")
              .pop()
              .split("SUB")[0];

            const ocrProducts = {
              products,
              totalPrice: totalFiltered,
            };
            navigation.navigate("Add Product", {
              ocrProducts: ocrProducts,
              pickedDate: date,
            });
          })
          .catch((err) => {
            showToast(
              "error",
              "Something went wrong.",
              "Please , try to scan again !"
            );
          });
      } else {
        await onSubmit(result);
      }
    }
  };

  return (
    <>
      {isProfile ? (
        <TouchableHighlight
          accessibilityLabel="ImagePicker"
          style={{ padding: Sizes.normalize(80), borderRadius: 30 }}
          underlayColor={Colors.iron}
          onPress={pickImage}
        >
          <Text style={stylesProfile.details}>Pick photo from gallery</Text>
        </TouchableHighlight>
      ) : (
        <TouchableOpacity
          accessibilityLabel="ScannerPicker"
          onPress={pickImage}
        >
          <Icons.Scan />
        </TouchableOpacity>
      )}
    </>
  );
}
export default CustomImagePicker;
