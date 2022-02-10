import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";

const styles = StyleSheet.create({
  header: {
    width: "100%",
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
  headerLeft: {
    marginLeft: Sizes.normalize(25),
  },
  headerRight: {
    marginRight: Sizes.normalize(25),
  },
});

export default styles;
