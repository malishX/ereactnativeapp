// import { BaseColor, font, FontFamily, getFontSize, useTheme } from "config";
import { BaseColor, getFontSize, font, FontFamily } from "../../../config";
import { StyleSheet, Platform } from "react-native";
import { useFont } from "../../../config";

function useStyles() {

  return StyleSheet.create({
    mainView: {
      flex: 1,
      paddingTop: Platform.OS === "ios" ? 40 : 0,
      alignItems: "center",
      flexDirection: "column",
      // backgroundColor: colors.background,
      justifyContent: "space-around",
    },
    imageContainer: {
      flex: 1,
    },
    image: {
      flex: 1,
    },
    absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    btnView: {
      height: 50,
      // width:"98%",
      // flex: 1,
      // borderRadius: 24,
      // paddingHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    btnText: {
      color: BaseColor.whiteColor,
      fontSize: getFontSize(18),
      fontFamily: "Metropolis-Bold",
      flex: 1,
      textAlign: 'center',
      // fontWeight: 'bold'
    },
  });
}

export default useStyles;
