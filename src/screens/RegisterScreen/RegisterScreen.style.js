import { StyleSheet, Dimensions } from "react-native";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: Sizes.normalize(50),
    paddingBottom: Sizes.windowHeight / 3,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "Lato-Bold",
    fontSize: Sizes.normalize(90),
    marginBottom: Sizes.normalize(45),
    color: Colors.gulfBlue,
  },
  button: { width: windowWidth, paddingHorizontal: Sizes.normalize(50) },
});

export default styles;
