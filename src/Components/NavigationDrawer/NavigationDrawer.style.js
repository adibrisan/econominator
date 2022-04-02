import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";

const styles = StyleSheet.create({
  image: {
    width: Sizes.normalize(130),
    height: Sizes.normalize(130),
    marginLeft: Sizes.normalize(40),
    borderRadius: Sizes.normalize(70),
  },
  backgroundImage: {
    justifyContent: "center",
    padding: Sizes.normalize(40),
  },
  itemList: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Sizes.normalize(40),
  },
  drawerUsername: {
    paddingTop: Sizes.normalize(30),
    color: Colors.whiteLilac,
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Sizes.normalize(50),
    marginBottom: Sizes.normalize(50),
  },
  logoutText: {
    fontSize: Sizes.normalize(55),
    paddingLeft: Sizes.normalize(24),
    color: Colors.ebonyClay,
  },
});

export default styles;
