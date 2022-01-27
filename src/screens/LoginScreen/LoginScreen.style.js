import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: Sizes.normalize(75),
    marginTop: Sizes.normalize(200),
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
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
