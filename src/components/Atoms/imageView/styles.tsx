import { StyleSheet, Platform } from "react-native";
import { BaseColor, FontFamily, useTheme, useFont } from "../../../config";

function useStyles() {
  const { colors } = useTheme();
  return StyleSheet.create({
    buttonView: {
      height: 45,
      width: 45,
      margin: 10,
      justifyContent: "center",
    },
    button: {
      height: 15,
      width: 15,
      alignSelf: "center",
    },
  });
}

export default useStyles;
