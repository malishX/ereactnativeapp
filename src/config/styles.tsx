// import { getFontSize, BaseColor, font } from "config";
import { StyleSheet, Platform } from "react-native";
import { BaseColor, useTheme } from "./theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getFontSize } from "./responsive";
function BaseStyle() {
  // console.log("I18nManager",I18nManager);

  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    jcCenter: {
      justifyContent: "center",
    },
    jcStart: {
      justifyContent: "flex-start",
    },
    jcEnd: {
      justifyContent: "flex-end",
    },
    jcSpaceAround: {
      justifyContent: "space-around",
    },
    textInput: {
      height: 46,
      borderRadius: 5,
      paddingHorizontal: 10,
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    safeAreaView: {
      flex: 1,
    },
    headerText: {
      fontSize: 22,
      fontFamily: "metropolis",
      // fontFamily: font(FontFamily.fontBold),/
      color: colors.text,
      alignSelf: "center",
    },
    buttonText: {
      fontSize: 14,
      fontFamily: "metropolis",
      // fontFamily: font(FontFamily.fontMedium),
      color: "white",
      alignSelf: "center",
    },
    actionBarView: {
      // height: 50,
      justifyContent: "center",
      // backgroundColor: colors.actionBar,
    },
    actionBarSubView: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
    },
    actionBarTitle: {
      fontFamily: "metropolis",
      fontSize: 18,
      // fontFamily: font(FontFamily.fontBold),
    },
    actionBarIconView: {
      height: 20,
      width: 20,
      justifyContent: "center",
    },
    logoText: {
      fontSize: getFontSize(60),
      color: BaseColor.whiteColor,
      // fontFamily: font(FontFamily.fontBold),
      textAlign: "center",
    },
    inputText: {
      // textAlign: I18nManager.isRTL ? "right" : "left",
      paddingHorizontal: 12,
      flex: 1,
      color: "black",
      textAlignVertical: "center",
      fontSize: getFontSize(13),
      fontFamily: "metropolis",
      // fontFamily: font(FontFamily.fontRegular),
      paddingVertical: Platform.OS == "android" ? 0 : 4,
      paddingTop: Platform.OS == "android" ? 2.2 : undefined,
    },
    textRTLStyle: {
      // textAlign: "left",
      // textAlign: I18nManager.isRTL ? "left" : "right"
      // writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
    },
    textSendnameStyle: {
      // writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
      // paddingLeft: I18nManager.isRTL ? '60%' : 0
    },
    textSendEmailStyle: {
      // writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
      // paddingLeft: I18nManager.isRTL ? '40%' : 0
    },
    inputTitleText: {
      color: colors.primary,
      marginBottom: hp("1%"),
      marginLeft: wp("1.4%"),
      fontSize: getFontSize(11),
      fontFamily: "metropolis",
      // fontFamily: font(FontFamily.fontRegular),
      // writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
    },
  });
}

export default BaseStyle;
