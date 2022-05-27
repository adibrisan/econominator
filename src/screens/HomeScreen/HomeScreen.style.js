import { Platform, StyleSheet } from "react-native";

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
    flex: 1,
    height: Sizes.windowHeight * 0.8,
    paddingHorizontal: Sizes.normalize(45),
    paddingBottom: Sizes.normalize(20),
  },
  sectionHeader: {
    paddingHorizontal: Sizes.normalize(45),
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
    marginTop:
      Platform.OS === "ios"
        ? Sizes.windowHeight / 1.2
        : Sizes.windowHeight / 1.08,
  },
  animation: {
    width: Platform.OS === "ios" ? Sizes.normalize(380) : Sizes.normalize(300),
    height: Platform.OS === "ios" ? Sizes.normalize(380) : Sizes.normalize(300),
  },
  pdfContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    paddingLeft: Sizes.windowWidth / 4.5,
  },
  pdfAnimation: {
    width: Sizes.normalize(180),
    height: Sizes.normalize(180),
  },
  noDataAnimation: {
    width: Sizes.windowWidth / 1.2,
    height: Sizes.windowWidth / 1.2,
    alignSelf: "center",
    backgroundColor: Colors.transparent,
  },
  emptyListMessage: {
    fontFamily: "Lato-Regular",
    fontSize: Sizes.normalize(70),
  },
});

export default stylesHome;
