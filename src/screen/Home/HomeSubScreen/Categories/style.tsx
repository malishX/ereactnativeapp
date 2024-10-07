import { StyleSheet, Text, View } from "react-native";
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
} from "../../../../config";
import { deviceHeight, deviceWidth, scale } from "../../../../config/responsive";

function useStyles() {
    return StyleSheet.create({
        tabView: {
            width: hp(15),
            height: hp(8),
            alignItems: "center",
            justifyContent: "center",
            // borderTopColor: 'red',
            // borderBottomColor: 'red',
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderWidth: 1       
            // backgroundColor: 'red',
            // marginTop: 10
        },
        tabDetailView: {
            width: wp(60),
            // backgroundColor: 'yellow',
        },
        subCategory: {
            borderColor: BaseColor.yellowColor,
            borderWidth: 2,
            borderRadius: 20,
            // padding: 8,
            height: 40,
            // marginHorizontal: 2,
            paddingVertical: 8,
            paddingHorizontal: 20
        }
    });
}

export default useStyles;
