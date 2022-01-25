import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: Sizes.normalize(10),
    width: "100%",
    height: Sizes.windowHeight / 15,
    padding: Sizes.normalize(10),
    backgroundColor: "#2e64e5",
    padding: Sizes.normalize(10),
    flexDirection: "row",
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Lato-Regular",
  },
  iconWrapper: {
    width: Sizes.normalize(70),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: Sizes.normalize(55),
  },
  icon: {
    fontWeight: "bold",
  },
  btnTextWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
