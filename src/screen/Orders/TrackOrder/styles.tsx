import { StyleSheet } from "react-native";
import { BaseColor, font, FontFamily } from "../../../config";
import { deviceHeight, scale } from "../../../config/responsive";

export function useStyles() {
  return StyleSheet.create({
    mainView: {
      flex: 1,
      // marginTop: hp('5')
    },
    headerView: {
      backgroundColor: BaseColor.purpleColor,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      alignItems: "center",
      height: deviceHeight * 0.1,
      // height: "100%",
      // paddingTop: hp("1.5"),
      // display: 'flex',
      paddingHorizontal: 20,
      justifyContent: "space-between",
      flexDirection: "row",
      // marginBottom: 10
      // height: hp('80')
    },
    headerTextView: {
      marginHorizontal: 20,
      color: "white",
      // fontWeight: 'bold',
      fontSize: 18,
      fontFamily: font(FontFamily.fontSemiBold),
    },
    orderHeaderTextStyle: {
      color: "black",
      fontFamily: font(FontFamily.fontBold),
    },
  });
}
