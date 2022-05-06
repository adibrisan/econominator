import { StyleSheet } from "react-native";

import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";

export default StyleSheet.create({
  overlay: {
    height: "100%",
    width: "100%",
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "rgba(21, 21, 21, 0.80)",
  },
  container: {
    position: "absolute",
    top: Sizes.windowHeight / 4,
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderRadius: Sizes.normalize(25),
  },
});
