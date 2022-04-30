import { StyleSheet } from "react-native";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";

export const chartStyles = StyleSheet.create({
  categoryHeader: {
    paddingHorizontal: Sizes.normalize(55),
    paddingVertical: Sizes.normalize(55),
    backgroundColor: Colors.white,
  },
  categoryHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Sizes.normalize(55),
  },
  chartIcon: {
    height: Sizes.normalize(150),
    width: Sizes.normalize(150),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.peach,
    borderRadius: Sizes.normalize(70),
  },
  calendarContainer: {
    height: Sizes.normalize(165),
    width: Sizes.normalize(165),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    borderRadius: Sizes.normalize(70),
  },
  labels: { fill: Colors.black, fontSize: Sizes.normalize(52) },
});
