import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: Sizes.normalize(125),
    marginHorizontal: Sizes.normalize(65),
    backgroundColor: "white",
  },
  inputContainer: {
    alignItems: "center",
    paddingTop: Sizes.normalize(70),
    paddingHorizontal: Sizes.normalize(120),
  },
  title: {
    paddingLeft: Sizes.normalize(35),
    fontFamily: "Lato-Bold",
    fontSize: Sizes.normalize(60),
  },
  button: {
    position: "absolute",
    width: "100%",
    top: Sizes.windowHeight / 2.2,
  },
});

export default styles;
