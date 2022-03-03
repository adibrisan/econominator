import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";

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
  sectionHeader: {
    paddingHorizontal: Sizes.normalize(45),
    // backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    paddingVertical: Sizes.normalize(24),
    marginTop: Sizes.normalize(45),
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
  },
  animationContainer: {
    position: "absolute",
    paddingTop: Sizes.windowHeight / 1.08,
  },
  animation: {
    width: Sizes.normalize(300),
    height: Sizes.normalize(300),
  },
});

export default stylesHome;
