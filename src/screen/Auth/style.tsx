import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BaseColor, font, FontFamily, getFontSize } from "../../config";
import { deviceWidth } from "../../config/responsive";

function useStyles() {
  return StyleSheet.create({
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: 'red',
      fontSize: 30,
      // fontWeight: 'bold',
      FontFamily: font(FontFamily.fontBold)
    },
    mainView: {
      flex: 1,
      backgroundColor: BaseColor.purpleColor,
      alignItems: "center",
    },
    logo: {
      // flex: 2,
      // display: 'flex',
      // flex: 1,
      position: 'absolute',
      alignItems: "center",
      // textAlign: 'center',
      marginTop: hp("8"),
    },
    grocery: {
      fontFamily: "Metropolis-Bold",
      fontSize: getFontSize(20),
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 15,
      // marginHorizontal: 2
    },
    verifyImg: {
      position: "absolute",
      marginTop: "30%",
      paddingHorizontal: hp("5"),
    },
    menimgView: {
      position: "absolute",
      // flex: 4,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      marginTop: 210,
      paddingHorizontal: hp("7"),
    },
    SigninView: {
      width: deviceWidth * 0.85,
      backgroundColor: "#895BAF",
      // height: hp("35%"),
      borderRadius: 9,
      justifyContent: "center",
      alignItems: "center",
      // paddingTop: 25,
      padding: 20,
      shadowColor: "#000",
      elevation: 5,
      // paddingVertical: 10
    },
    image: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: getFontSize(18),
      color: "white",
      // fontWeight: "900",
      textAlign: "center",
      marginVertical: 5,
      // fontFamily: "metropolis",
      // marginHorizontal: 40
    },
    textDec: {
      // marginVertical: -10,
      fontSize: getFontSize(14),
      color: "white",
      // fontFamily: "metropolis",
      // fontWeight: "100",
      textAlign: "center",
    },
    inputText: {
      color: BaseColor.whiteColor,
      // flex: 1,
      fontSize: getFontSize(15),
      fontFamily: "metropolis",
      // alignSelf: 'center',
      // fontWeight: "bold",
      fontColor: "white",
    },
    inputFieldView: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      width: "90%",
      // borderWidth: 1,
      // paddingHorizontal: wp("3%"),
      borderRadius: 12,
      height: 48,
      borderColor: "#E2E2E2",
      // borderLeftWidth: 0,
      // borderRightWidth: 0,
      // borderTopWidth: 0,
      // borderColor: colors.inputField,
    },
    otpView: {
      width: '80%',
      height: 80,
      // marginTop: ,
      alignSelf: "center",
    },
    underlineStyleBase: {
      width: 50,
      height: 50,
      // borderWidth: 1,
      // borderColor: colors.optBorder,
      // fontFamily:font(FontFamily.fontRobotoRegular),
      // borderBottomColor:colors.otpBoxBackground,
      // borderBottomWidth: 2,
      borderRadius: 6,
      fontSize: getFontSize(18),
      backgroundColor: "white",
      color: "#000",
      // color: colors.text,
    },

    underlineStyleHighLighted: {
      // borderBottomColor: colors.primary,
    },
  });
}

export default useStyles;
