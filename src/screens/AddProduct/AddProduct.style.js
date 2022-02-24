import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Sizes.normalize(125),
    paddingHorizontal: Sizes.normalize(65),
  },
  inputContainer: {
    paddingVertical: Sizes.normalize(60),
  },
  title: {
    paddingLeft: Sizes.normalize(35),
    fontFamily: "Lato-Bold",
    fontSize: Sizes.normalize(60),
  },
  completed: {
    paddingTop: Sizes.windowHeight / 4.5,
    alignItems: "center",
  },
  animation: {
    width: Sizes.normalize(640),
    height: Sizes.normalize(640),
  },
});

export default styles;
