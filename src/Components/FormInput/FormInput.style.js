import { StyleSheet } from "react-native";

import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: Sizes.normalize(5),
    marginBottom: Sizes.normalize(10),
    width: "100%",
    height: Sizes.windowHeight / 15,
    borderColor: Colors.silver,
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
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
  input: {
    flex: 1,
    padding: Sizes.normalize(10),
    fontSize: Sizes.normalize(41),
    fontFamily: "Lato-Regular",
    color: Colors.mineShaft,
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    padding: Sizes.normalize(10),
    marginTop: Sizes.normalize(5),
    marginBottom: Sizes.normalize(10),
    width: Sizes.windowHeight / 1.5,
    height: Sizes.windowHeight / 15,
    fontSize: Sizes.normalize(16),
    borderRadius: Sizes.normalize(8),
    borderWidth: 1,
  }
});

export default styles;
