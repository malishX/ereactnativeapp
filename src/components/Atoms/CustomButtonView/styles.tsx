import { StyleSheet } from "react-native";
import { BaseColor, font, FontFamily } from "../../../config";
import { scale } from "../../../config/responsive";

export function useStyles() {
  return StyleSheet.create({
    buttonMainView: {
      height: scale(50),
      // width: "100%",
      flex: 1,
      backgroundColor: BaseColor.yellowColor,
      borderRadius: scale(25),
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginHorizontal: scale(5),
    },
    buttonText: {
      fontSize: 14,
      fontFamily: font(FontFamily.fontSemiBold),
      color: BaseColor.blackColor,
    },
    iconsStyle: { marginHorizontal: scale(10) },
  });
}
