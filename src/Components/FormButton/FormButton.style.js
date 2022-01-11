import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: Sizes.normalize(10),
    width: "100%",
    height: Sizes.windowHeight / 15,
    padding: Sizes.normalize(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  buttonText: {
    fontSize: Sizes.normalize(55),
    fontWeight: "bold",
    fontFamily: "Lato-Regular",
  },
});

export default styles;
