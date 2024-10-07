import { StyleSheet } from "react-native";
import { BaseColor, font, FontFamily } from "../../config";

export function useCalendarStyles() {
  // const ApplicationStyles = applicationStyles(theme);
  // const Colors = AppColors(theme);

  return StyleSheet.create({
    monthTitleStyle: {
      // ...ApplicationStyles.semiBoldFont,
      color: BaseColor.whiteColor, //BaseColor.primaryColor,
      // textTransform: "uppercase",
      fontSize: 12,
      fontFamily: font(FontFamily.fontBold)
      // fontFamily: "metropolis",
    },
    previousTitleStyle: {
      // ...ApplicationStyles.semiBoldFont,
      marginLeft: 50,
      textTransform: "uppercase",
      fontSize: 20,
      fontFamily: "metropolis",
      color: BaseColor.whiteColor, //"#241F43",
    },
    nextTitleStyle: {
      // ...ApplicationStyles.semiBoldFont,
      marginRight: 50,
      textTransform: "uppercase",
      fontSize: 20,
      fontFamily: "metropolis",
      color: BaseColor.whiteColor, //"#241F43",
    },
    textStyle: {
      // ...ApplicationStyles.regularFont,
      color: BaseColor.whiteColor,
      fontSize: 12,
      fontFamily: font(FontFamily.fontBold)
    },
  });
}
