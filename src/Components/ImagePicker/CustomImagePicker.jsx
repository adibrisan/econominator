import * as ImagePicker from "expo-image-picker";
import { OCR_API_KEY as API_KEY } from "@env";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { I18nContext } from "../../navigation/i18nProvider";
import { showToast } from "../../navigation/AuthProvider";

import { RECEIVING, RECEIVED } from "../../store/actions/types";
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
  const { I18n } = useContext(I18nContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });
    if (!result.cancelled) {
      if (!isProfile) {
        dispatch({ type: RECEIVING, payload: "RECEIVING" });
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
            dispatch({ type: RECEIVED, payload: "RECEIVED" });
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
            dispatch({ type: RECEIVED, payload: "RECEIVED" });
            showToast("error", `${err}`, `${I18n.t("errors.scanAgain")}`);
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
          <Text style={stylesProfile.details}>
            {I18n.t("imagePicker.pickPhoto")}
          </Text>
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
