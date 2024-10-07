import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  BaseColor,
  font,
  FontFamily,
  getFontSize,
  useFont,
} from "../../config";
import { deviceHeight, deviceWidth, scale } from "../../config/responsive";

function useStyles() {
  return StyleSheet.create({
    mainView: {
      flex: 1,
      marginTop: hp('-0')
    },
    sectionHeader: {
      color: "black",
      // fontWeight: "bold",
      fontSize: getFontSize(16),
      fontFamily: font(FontFamily.fontBold),
    },
    sectionHeaderSeeall: {
      color: BaseColor.purpleColor,
      fontSize: getFontSize(14),
      fontFamily: font(FontFamily.fontBold),
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
    orderDetailsHeaderTextView: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    orderDetailsHeaderText: {
      fontSize: 16,
      fontFamily: font(FontFamily.fontSemiBold),
      color: BaseColor.blackColor,
    },
    searchView: {
      flexDirection: "row",
      alignItems: "center",
      width: wp("70"),
      borderWidth: 1,
      paddingHorizontal: wp("3%"),
      borderRadius: 30,
      height: 43,
      backgroundColor: "white",
      borderColor: "white",
      fontFamily: "metropolis",
      // borderLeftWidth: 0,
      // borderRightWidth: 0,
      // borderTopWidth: 0
    },
    inputText: {
      fontFamily: "metropolis",
      color: BaseColor.blackColor,
      fontSize: getFontSize(15.5),
      alignSelf: "center",
      width: wp("55%"),
      // fontWeight: 'bold'
    },
    tabbarView: {
      backgroundColor: BaseColor.purpleColor,
      height: Platform.OS === 'ios' ? scale(95) : scale(68),
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

    sectionHeaderView: {
      flex: 3,
      // display:'flex',
      // marginTop: '54%',
      marginVertical: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      // marginRight: 20,
      marginHorizontal: 10,
    },
    offerView: {
      flex: 1,
      padding: 15,
      width: hp("17"),
      // backgroundColor: 'red',
      // height: hp("33"),
      justifyContent: 'space-between',
      marginBottom: 5,
      borderRadius: 10,
      shadowColor: "#000",
      elevation: 3,
      backgroundColor: "white",
      marginHorizontal: 3
    },
    productView: {
      padding: 20,
      // flex: 2,
      // marginVertical: 16,
      // width: hp('100'),
      // backgroundColor: 'red',
      // height: hp("40"),
      marginHorizontal: 4,
      borderRadius: 10,
      // shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.8,
      // shadowRadius: 2,
      shadowColor: "#000",
      elevation: 3,
      backgroundColor: "white",
      justifyContent: 'space-between'
      // fontFamily: font(FontFamily.fontRegular),
      // margin: 12
    },
    contain: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    offView: {
      backgroundColor: BaseColor.purpleColor,
      borderRadius: 5,
    },
    offviewText: {
      color: BaseColor.whiteColor,
      // fontWeight: "bold",
      fontSize: getFontSize(10),
      margin: 5,
      // marginVertical: 5,
      fontFamily: font(FontFamily.fontRegular),

      // white-space: pre-line
    },
    CatagoryView: {
      // flex: 1,
      // marginVertical: 16,
      width: hp("9%"),
      height: hp("9%"),
      borderRadius: 50,
      // backgroundColor: 'red',
      // height: hp('33'),
      margin: 5,
      shadowColor: "#000",
      elevation: 3,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: BaseColor.yellowColor,
      // margin: 12
    },
    CatagoryTextView: {
      // flex: 1,
      // marginTop: hp("-2"),
      // marginVertical: 16,
      fontSize: getFontSize(10),
      width: hp("9"),
      // minHeight: hp("9"),
      marginHorizontal: 5,
      // justifyContent: "flex-start",
      alignItems: "center",
    },
    CategoryText: {
      fontSize: getFontSize(10),
      alignSelf: "center",
      fontFamily: font(FontFamily.fontBold),
      color: BaseColor.textGrayColor,
      // flexWrap: "wrap",
    },
    dealsView: {
      flex: 1,
      // marginVertical: 16,
      // width: hp('35'),
      // height: hp("16"),
      paddingLeft: 10,
      // borderRadius: 10
    },
    dividerView: {
      marginBottom: 20,
      borderWidth: 0.3,
      flex: 1,
      borderColor: BaseColor.textGrayColor,
    },
    profileView: {
      // textAlign: 'center',
      // fontWeight: "bold",
      fontSize: 15,
      fontFamily: font(FontFamily.fontBold),
      // marginBottom: 20,
      color: "black",
    },
    // CART VIEW
    cartItemList: {
      height: hp(14),
      width: "99%",
      flex: 1,
      marginVertical: scale(20),
      marginHorizontal: scale(2),
      flexDirection: 'row',
      justifyContent: "space-between",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowColor: "#000",
      elevation: 3,
      backgroundColor: "white",
      borderRadius: 10,
      // padding: 10,
    },
    calendarContainer: {
      padding: 10,
      marginTop: 10,
      backgroundColor: BaseColor.purpleColor,
      // marginHorizontal: 10,
      // paddingVertical: 16,
      borderRadius: 5,
      // height: "22%",
    },
    paymentView: {
      marginTop: 5,
      height: 50,
      borderRadius: 10,
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: BaseColor.yellowColor,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      // PaddingHorizontal: 10
    },
    estimatedView: {
      flex: 1,
      marginVertical: 16,
      // width: hp('17'),
      // backgroundColor: 'red',
      // height: hp('33'),
      // marginHorizontal: 4,
      borderRadius: 10,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowColor: "#FFFF",
      elevation: 3,
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    addressView: {
      // height: hp('20'),
      borderRadius: 10,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowColor: "#FFFF",
      elevation: 3,
      backgroundColor: "white",
      padding: hp("1.5"),
      marginVertical: 5,
      // justifyContent: 'space-between'
    },
    basketView: {
      borderRadius: 10,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowColor: "#FFFF",
      elevation: 3,
      backgroundColor: "#E5E5E5",
      marginVertical: 10,
      // borderColor: BaseColor.purpleColor,
      // borderWidth: 1
    },
    openbasketView: {
      // height: 20,
      borderRadius: 10,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowColor: "#FFFF",
      elevation: 3,
      // backgroundColor: '#E5E5E5',
      marginVertical: 10,
      borderColor: BaseColor.purpleColor,
      borderWidth: 1,
      // paddingHorizontal: 10
    },
    basketIconView: {
      backgroundColor: "#FFFFFF",
      width: 40,
      alignItems: "center",
      height: 40,
      justifyContent: "center",
      borderRadius: 5,
    },
    actionIcon: {
      width: 25,
      height: 25,
      alignItems: "center",
      backgroundColor: BaseColor.yellowColor,
      justifyContent: "center",
      borderRadius: 44 / 2,
    },
    basketHeader: {
      // backgroundColor: BaseColor.purpleColor,
      height: 50,
      flexDirection: "row",
      // borderTopLeftRadius: 5,
      // borderTopRightRadius: 5,
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    basketFooter: {
      backgroundColor: "#E2DAEC",
      height: 50,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      justifyContent: "center",
    },
    textStyle: {
      color: "black",
      fontFamily: font(FontFamily.fontBold),
    },
    purlelTextsStyle: {
      color: BaseColor.purpleColor,
      fontFamily: font(FontFamily.fontBold),
    },
    orderView: {
      width: "100%",
      flex: 1,
      marginVertical: scale(10),
      justifyContent: "space-between",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowColor: "#000",
      elevation: 3,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 10,
    },
  });
}

export default useStyles;