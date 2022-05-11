import { Platform, StyleSheet } from "react-native";

import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    height: Sizes.normalize(145),
    alignItems: "center",
    marginTop: Sizes.normalize(5),
    marginBottom: Sizes.normalize(70),
    borderColor: Colors.silver,
    borderRadius: Sizes.normalize(15),
    borderWidth: Sizes.normalize(3),
    backgroundColor: Colors.white,
  },
  inputContainerError: {
    flexDirection: "row",
    width: "100%",
    height: Sizes.normalize(145),
    alignItems: "center",
    marginTop: Sizes.normalize(5),
    marginBottom: Sizes.normalize(70),
    borderColor: Colors.outrageousOrange,
    borderRadius: Sizes.normalize(15),
    borderWidth: Sizes.normalize(3),
    backgroundColor: Colors.white,
  },
  iconStyle: {
    padding: Sizes.normalize(10),
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: Colors.silver,
    borderRightWidth: 1,
    width: 50,
  },
  iconStyleError: {
    padding: Sizes.normalize(10),
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: Colors.outrageousOrange,
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    flex: 1,
    padding: Sizes.normalize(10),
    fontSize: Sizes.normalize(41),
    fontFamily: "Lato-Regular",
    color: Colors.mineShaft,
  },
  errorContainer: {
    position: "absolute",
    top: Sizes.windowHeight / 14,
  },
  errorContainerProduct: {
    position: "absolute",
    top:
      Platform.OS === "ios" ? Sizes.windowHeight / 20 : Sizes.windowHeight / 15,
  },
});

export default styles;
