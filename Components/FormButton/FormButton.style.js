import { StyleSheet } from "react-native";
import { Sizes } from "../../environment/sizes";

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: Sizes.normalize(10),
    width: "100%",
    height: Sizes.windowHeight / 15,
    backgroundColor: "#2e64e5",
    padding: Sizes.normalize(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Lato-Regular",
  },
});

export default styles;
