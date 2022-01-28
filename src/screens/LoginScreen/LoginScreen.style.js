import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Sizes.normalize(75),
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: Sizes.normalize(30),
    color: Colors.gulfBlue,
  },
  navButton: {
    marginTop: 15,
  },
  createOrForgotButton: {
    marginVertical: Sizes.normalize(75),
  },
  navButtonText: {
    fontSize: Sizes.normalize(50),
    fontWeight: "bold",
    color: "grey",
    fontFamily: "Lato-Regular",
    marginRight: Sizes.normalize(30),
  },
  credentialsText: {
    fontSize: Sizes.normalize(50),
    fontWeight: "100",
    color: "grey",
    fontFamily: "Lato-Regular",
    textAlign: "center",
    paddingTop: Sizes.normalize(15),
    paddingBottom: Sizes.normalize(15),
  },
});

export default styles;
