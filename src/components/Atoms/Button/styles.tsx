import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useTheme } from "../../../config/theme";

function useStyles() {
  const { colors } = useTheme();
  return StyleSheet.create({
    buttonView: {
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 7,
      height: hp("6%"),
      // marginHorizontal: wp("4%"),
      borderRadius: hp("1%"),
      backgroundColor: colors.primary,
    },
    button: {
      alignSelf: "center",
    },
  });
}

export default useStyles;
