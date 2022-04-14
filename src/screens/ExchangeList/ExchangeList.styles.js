import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";

const thisStyle = StyleSheet.create({
  search: {
    paddingHorizontal: Sizes.normalize(140),
  },
  baseTitle: {
    flexDirection: "row",
    padding: Sizes.normalize(80),
  },
  title: {
    fontSize: Sizes.normalize(60),
    fontFamily: "Lato-BoldItalic",
    padding: Sizes.normalize(30),
  },
  loader: {
    position: "absolute",
    top: Sizes.windowHeight / 2.4,
    paddingHorizontal: Sizes.windowWidth / 2,
    zIndex: 1,
  },
});

export default thisStyle;
