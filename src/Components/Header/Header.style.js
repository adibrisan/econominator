import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";

const styles = StyleSheet.create({
  header: {
    width: "100%",
    elevation: Sizes.normalize(7),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
    padding: Sizes.normalize(30),
  },
  title: {
    fontWeight: "bold",
    fontSize: Sizes.normalize(55),
  },
});

export default styles;
