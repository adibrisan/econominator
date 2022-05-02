import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    width: Sizes.normalize(200),
    height: Sizes.normalize(200),
    backgroundColor: "#2e64e5",
    marginTop: Sizes.normalize(0),
    marginRight: Sizes.normalize(60),
    marginLeft: Sizes.normalize(60),
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 100,
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
