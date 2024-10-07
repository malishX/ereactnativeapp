import { StyleSheet } from "react-native";
import { BaseColor } from "../config/theme";

export function useStyles() {
  return StyleSheet.create({
    tabbarView: {
      backgroundColor: BaseColor.purpleColor,
      height: 68,
      color: BaseColor.whiteColor,
      // justifyContent: 'center',
      // alignItems: 'center',
      // borderRadius: 15,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontFamily: "metropolis",
    },
  });
}
