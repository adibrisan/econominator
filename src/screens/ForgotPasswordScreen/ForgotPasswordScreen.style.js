import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: Sizes.normalize(75),
    marginTop: Sizes.normalize(100),
  },
  animation: {
    width: Sizes.normalize(840),
    height: Sizes.normalize(840),
  },
  resetPasswordContainer: {
    flex: 0.6,
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: Sizes.normalize(30),
  },
  resetPasswordText: {
    color: Colors.grey,
  },
  validationContainer: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  validationText: {
    color: Colors.outrageousOrange,
  },
});
