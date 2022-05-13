import { StyleSheet } from "react-native";

import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";

const stylesProfile = StyleSheet.create({
  image: {
    alignSelf: "center",
    width: Sizes.normalize(480),
    height: Sizes.normalize(480),
    borderRadius: Sizes.normalize(480),
  },
  details: {
    paddingVertical: Sizes.normalize(30),
    fontSize: Sizes.normalize(60),
    fontFamily: "Lato-BoldItalic",
    color: Colors.gulfBlue,
  },
  animation: {
    width: Platform.OS === "ios" ? Sizes.normalize(400) : Sizes.normalize(500),
    height: Platform.OS === "ios" ? Sizes.normalize(400) : Sizes.normalize(500),
  },
});

export default stylesProfile;
