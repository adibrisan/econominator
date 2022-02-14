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
  listContainer: {
    height: Sizes.windowHeight * 0.8,
    paddingHorizontal: Sizes.normalize(45),
  },
});

export default stylesHome;
