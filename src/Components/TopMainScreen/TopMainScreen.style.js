import { StyleSheet } from "react-native";
import { Sizes } from "../../environment/sizes";

const styles = StyleSheet.create({
  container: {
    paddingVertical: Sizes.normalize(80),
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: Sizes.normalize(65),
    fontFamily: "Lato-Bold",
  },
});

export default styles;
