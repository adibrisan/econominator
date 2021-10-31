import { StyleSheet } from "react-native";
import { Sizes } from "../../environment/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
    paddingBottom: Sizes.windowHeight / 2.5,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    flex: 1,
    marginTop: 15,
  },

  navButtonText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
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
});

export default styles;
