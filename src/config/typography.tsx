import { StyleSheet } from "react-native";
import { useFont } from "./theme";

/**
 * Fontweight setting
 * - This font weight will be used for style of screens where needed
 * - Check more how to use font weight with url below
 * @url http://passionui.com/docs/felix-travel/theming
 */
export const FontWeight = {
  thin: "100",
  ultraLight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  heavy: "800",
  black: "900",
};

// export const FontFamily = {
//   fontBarlowBold : 'Barlow-Bold',
//   fontBarlowMedium : 'Barlow-Medium',
//   fontBarlowRegular : 'Barlow-Regular',
//   fontBarlowSemiBold : 'Barlow-SemiBold',
//   fontPoppinsBold : 'Poppins-Bold',
//   fontPoppinsMedium : 'Poppins-Medium',
//   fontPoppinsRegular : 'Poppins-Regular',
//   fontPoppinsSemiBold : 'Poppins-SemiBold'
// }

// export const FontFamily = {
//   fontBold : 'Roboto-Bold',
//   fontMedium : 'Roboto-Medium',
//   fontRegular : 'Roboto-Regular'
// }

export const FontFamily = {
  fontBold: "Bold",
  fontMedium: "Medium",
  fontRegular: "Regular",
  fontSemiBold: "SemiBold",
};

export function font(fontType: string) {
  const fontName = useFont();
  // console.log("fontFamily", `${fontName}-${fontType}`);
  return `${fontName}-${fontType}`;
}
