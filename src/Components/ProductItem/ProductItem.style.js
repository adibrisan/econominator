import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    paddingHorizontal: Sizes.normalize(50),
    borderBottomWidth: Sizes.normalize(3),
    borderBottomColor: Colors.silver,
  },
  price: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: Sizes.normalize(150),
    padding: Sizes.normalize(20),
  },
  slideAnimation: {
    position: "absolute",
    width: "14%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    top: Sizes.normalize(46),
    fontSize: Sizes.normalize(24),
    fontWeight: "900",
    color: "white",
  },
});

export default styles;
