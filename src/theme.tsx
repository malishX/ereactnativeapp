import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { BaseColor, font, FontFamily, getFontSize } from "./config";

function useTheme() {
  return StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: BaseColor.purpleColor,
    },
    bottomView: {
      flex: 1,
      backgroundColor: BaseColor.purpleColor,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      padding: wp("5"),
      paddingHorizontal: hp("4"),
      position: "absolute",
      bottom: 0,
      // height: hp('25'),
      width: "100%",
    },
    ProfileView: {
      height: hp("22"),
      backgroundColor: BaseColor.purpleColor,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 15,
    },
    ProfileTitle: {
      fontFamily: "metropolis",
      marginHorizontal: 30,
      fontSize: getFontSize(20),
      alignSelf: "center",
      color: BaseColor.whiteColor,
      fontWeight: "bold",
      textAlign: "center",
    },
    ProfileDec: {
      color: "white",
      marginVertical: hp("1.5%"),
      marginHorizontal: hp("5"),
      // paddingHorizontal: hp('6'),
      fontSize: getFontSize(18),
      fontFamily: "metropolis",
    },
    formView: {
      marginHorizontal: hp("4%"),
      marginVertical: hp("4%"),
    },
    formText: {
      fontFamily: font(FontFamily.fontMedium),
      color: BaseColor.textGrayColor,
      fontSize: getFontSize(15),
      // marginLeft: 8,
      // marginBottom: 5,
      // fontFamily: "metropolis",
      fontWeight: "100",
      // marginBottom: hp('0.5')
    },
    inputView: {
      // flex: 1,
      // height: hp('3'),
      // backgroundColor: 'red',
      flexDirection: "row",
      justifyContent: "space-between",
      fontFamily: "metropolis",
      // alignItems: 'center',
      // borderColor: BaseColor.grayBorderColor,
      borderWidth: 1,
      // borderRadius: 30,
      marginBottom: hp("3"),
      // marginLeft: hp('1'),
      // paddingHorizontal: 10,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      // margin
    },
    icon: {
      position: "absolute",
      right: 10,
      // backgroundColor: 'red',
      height: 51,
      // justifyContent:'center',
      // alignItems: 'center'
      // width: '20%'
    },
    inputFieldView: {
      // marginLeft: 13,
      width: "80%",
      fontFamily: font(FontFamily.fontBold),
      fontWeight: "bold",
      marginLeft: -5,
      fontSize: getFontSize(15),
    },
    buttonView: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: BaseColor.yellowColor,
      height: hp("6%"),
      borderRadius: 30,
      width: "100%",
    },
    buttonText: {
      // color: BaseColor.whiteColor,
      fontSize: getFontSize(18),
      fontWeight: "bold",
      color: "#262626",
      fontFamily: "metropolis",
    },
    homeHeaderView: {
      flex: 2,
      backgroundColor: BaseColor.purpleColor,
      height: hp("6%"),
    },
    tabBar: {
      flex: 1,
      justifyContent: "flex-end",
      display: "flex",
    },
    textView: {
      fontFamily: font(FontFamily.fontBold),
      fontSize: getFontSize(15),
    },
    filterView: {
      backgroundColor: BaseColor.yellowColor,
      height: hp("3%"),
      borderRadius: 30,
      paddingHorizontal: 10,
      paddingVertical: 3,
      alignItems: "center",
      marginHorizontal: 5,
      justifyContent: "center",
    }
  });
}

export default useTheme;
