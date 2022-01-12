import { StyleSheet } from "react-native";
import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: Sizes.normalize(75),
    marginTop: Sizes.normalize(100),
  },
  animation: {
    width: Sizes.normalize(840),
    height: Sizes.normalize(840),
  },
  resetPasswordText:{
    color: Colors.grey
  }
});
