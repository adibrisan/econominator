import { StyleSheet, Platform } from "react-native";

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
  modalContainer: {
    width: Sizes.windowWidth / 2,
    height: Sizes.normalize(400),
    paddingHorizontal: Sizes.normalize(50),
    justifyContent: "space-between",
    paddingVertical: Sizes.normalize(50),
  },
  userModalContainer: {
    position: "relative",
    width: Sizes.windowWidth / 1.3,
    height: Sizes.normalize(600),
    paddingHorizontal: Sizes.normalize(50),
    justifyContent: "space-between",
    paddingVertical: Sizes.normalize(50),
  },
  yesNoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  question: {
    alignSelf: "center",
    fontSize: Sizes.normalize(50),
    fontFamily: "Lato-BoldItalic",
  },
});

export default stylesProfile;
