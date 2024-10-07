import { StyleSheet, Platform } from "react-native";
import { BaseColor, FontFamily, useTheme, useFont } from "../../../config";
import { font } from "../../../config/typography";

function useStyles() {
  const { colors } = useTheme();
  return StyleSheet.create({
    buttonView: {
      justifyContent: "center",
    },
    button: {
      alignSelf: "center",
    },
  });
}

export default useStyles;
