import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";

const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Sizes.normalize(125),
  },

  content: {
    flex: 0.3,
    alignItems: "flex-start",
    paddingHorizontal: Sizes.normalize(55),
  },
});

export default stylesHome;
