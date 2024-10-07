import { BaseColor, useTheme } from "config";
import { StyleSheet } from "react-native";

function useStyles() {
  const { colors } = useTheme();
  return StyleSheet.create({
    snackBar: {
      flexDirection: "row",
      paddingHorizontal: 15,
      paddingVertical: 15,
      margin: 10,
      marginBottom:20,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: colors.shadow,
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 4,
      // borderRadius: 5,
      backgroundColor: BaseColor.whiteColor,
    },
    actionTextView: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    actionTextData: {
      textAlign: "center",
      fontSize: 14,
      fontFamily: "metropolis",
      paddingHorizontal: 8,
      // color: colors.textPrimaryColor,
    },
    actionText: {
      flex: 1,
      textAlign: "right",
      fontSize: 14,
      fontFamily: "metropolis",
      fontWeight: "500",
      // color: colors.textPrimaryColor,
    },
  });
}

export default useStyles;
