import {
  BaseColor,
  BaseStyle,
  font,
  FontFamily,
  getFontSize,
  useTheme,
} from "config";
import { StyleSheet, Platform } from "react-native";

function useStyles() {
  const { colors } = useTheme();
  const baseStyles = BaseStyle();

  return StyleSheet.create({
    mainView: {
      flex: 1,
      paddingTop: Platform.OS === "ios" ? 40 : 0,
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: colors.background,
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
      backgroundColor: colors.primary,
      flex: 1,
      borderRadius: 12,
      paddingHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    btnText: {
      color: BaseColor.whiteColor,
      paddingTop:Platform.OS=="android" ? 3 :0,
      fontSize: getFontSize(15),
      fontFamily: "metropolis",
      // fontFamily: font(FontFamily.fontMedium),
      flex: 1,
      ...baseStyles.textRTLStyle,
    },
  });
}

export default useStyles;
