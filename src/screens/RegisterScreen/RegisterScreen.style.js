import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";


const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: Sizes.normalize(50),
    paddingBottom: Sizes.windowHeight / 3,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },

  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: Sizes.normalize(90),
    marginBottom: Sizes.normalize(45),
    color: Colors.gulfBlue,
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: Sizes.normalize(35),
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: Sizes.normalize(14),
    fontWeight: "400",
    fontFamily: "Lato-Regular",
    color: "grey",
  },
  btn:{
    width: '100%',
    paddingTop:Sizes.normalize(55),
    paddingBottom: Sizes.normalize(30)
  }
});

export default styles;
