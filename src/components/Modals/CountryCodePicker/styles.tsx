import { StyleSheet, Platform } from "react-native";
import { FontFamily, useTheme, BaseColor, BaseStyle } from "../../../config";
import { font } from "../../../config/typography";

function useStyles() {
  const { colors } = useTheme();
const baseStyles = BaseStyle();
  return StyleSheet.create({
    mainView: {
      flex: 1,
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: colors.background,
      justifyContent: "space-around",
    },
    wrapper: {},
    slide: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    joinViewText: {
      fontSize: 14,
      //   fontFamily: font(FontFamily.fontPoppinsMedium),
      color: "white",
      alignSelf: "center",
    },
    sliderImage: {
      width: 295,
      height: 277,
      alignSelf: "center",
    },
    sliderTitle: {
      fontSize: 20,
      color: colors.text,
      alignSelf: "center",
      marginTop: 10,
    },
    title: {
      fontSize: 16,
      color: colors.text,
    },
    placeholderText: {
      fontSize: 14,
    },
    selectedText: {
      fontSize: 16,
      flex: 1,
      color: colors.text,
    },
    alreadyMemberText: {
      fontSize: 14,
      color: "gray",
      alignSelf: "center",
      marginTop: 10,
    },
    signInText: {
      fontSize: 14,
      color: colors.text,
      alignSelf: "center",
      marginTop: 10,
    },
    searchSection: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginHorizontal: 5,
      paddingHorizontal: 15,
      marginBottom: 10,

      borderWidth: 1,
      borderColor: colors.inputField, //   backgroundColor: colors.inputField,
    },
    searchIcon: {
      padding: 10,
      height: 20,
      width: 20,
    },
    closeButtonView: {
      width: 35,
      height: 35,
      marginRight: 10,
      marginBottom: 10,
      alignSelf: "flex-end",
      justifyContent: "center",
    },
    closeButton: {
      width: 15,
      height: 15,
      tintColor: colors.text,
      alignSelf: "flex-end",
      alignItems: "center",
    },
    searchTextInput: {
      width: "90%",
      height: 50,
      marginLeft: 10,
      color: colors.text,
      ...baseStyles.textRTLStyle,
    },
    modalView: {
      width: "100%",
      height: "85%",
      backgroundColor: BaseColor.whiteColor,
      padding: 0,
      shadowOffset: { width: 2, height: 5 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 3,
    },
    shadowView: {
      flexDirection: "row",
      width: "90%",
      minHeight: 80,
      backgroundColor: colors.background,
      borderRadius: 6,
      borderBottomWidth: 0,
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      alignSelf: "center",
      padding: 15,
      marginTop: 15,
      marginBottom: 5,
    },
    footerView: {
      paddingVertical: 35,
      justifyContent: "center",
    },
  });
}

export default useStyles;
