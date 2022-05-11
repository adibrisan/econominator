import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";

const stylesProfile = StyleSheet.create({
  image: {
    alignSelf: "center",
    width: Sizes.normalize(480),
    height: Sizes.normalize(480),
    borderRadius: Sizes.normalize(480),
  },
});

export default stylesProfile;
