import { StyleSheet } from "react-native";
import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: Sizes.normalize(75),
    marginTop: Sizes.normalize(100),
  },
  animation: {
    width: Sizes.normalize(840),
    height: Sizes.normalize(840),
  },
  resetPasswordContainer: {
    position: "relative",
    flex: 0.6,
    justifyContent: "space-between",
    alignItems: "center",
  },
  resetPasswordText: {
    color: Colors.grey,
  },
  emailRequiredContainer:{
    position: "absolute",
    top: Sizes.normalize(195),
    left: Sizes.normalize(0)
  },
  emailRequiredText:{ 
    color: Colors.outrageousOrange
  }
});
