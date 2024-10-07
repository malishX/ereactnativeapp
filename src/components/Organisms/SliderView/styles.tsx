import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { BaseColor, FontFamily, getFontSize } from "../../../config";
import { font } from "../../../config/typography";

function useStyles() {
  // const { colors } = useTheme();
  return StyleSheet.create({
    wrapper: {
      
    },
    slide: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // borderWidth: 2,
    },
    sliderImage: {
      // flex: 0.2,
      width: 300,
      height: 270,
    },
    sliderTitle: {
      fontSize: getFontSize(20), //20,
      alignSelf: "center",
      fontFamily: font(FontFamily.fontMedium),
    },
    sliderDesc: {
      fontSize: getFontSize(14), //14,
      textAlign: "center",
      alignSelf: "center",
      marginTop: 10,
      opacity: 0.4,
      fontFamily: font(FontFamily.fontRegular),
      // marginHorizontal: 15,
    },
    activeDot: {
      backgroundColor: BaseColor.purpleColor,
      width: 20,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      // marginBottom: heightPercentageToDP("1%"),
    },
    dot: {
      backgroundColor: "#9EABB7",
      opacity: 0.4,
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      // marginBottom: heightPercentageToDP("1%"),
    },
  });
}

export default useStyles;
