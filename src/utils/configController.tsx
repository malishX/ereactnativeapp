import { Dimensions, I18nManager, StatusBar } from "react-native";
// import RNRestart from "react-native-restart";
import DeviceInfo from "react-native-device-info";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const isIphoneX = DeviceInfo.hasNotch();
export const statusBarHeight =
  Math.floor(Number(StatusBar.currentHeight)) + hp("1%");

export const formatDate = (date: any) => {
  const formatDate = moment(date).format("YYYY-MM-DD");
  return formatDate;
};

export const LanguageFromCode = (code: string) => {
  switch (code) {
    case "en":
      return "English";
    case "he":
      return "Hebrew";
    default:
      return "UnKnown";
  }
};

export const isLanguageRTL = (code: string) => {
  switch (code) {
    case "he":
      return true;
    case "ar":
      return true;
    case "en":
      return false;
    default:
      return false;
  }
};

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export const reloadLocale = (oldLanguage: string, newLanguage: string) => {
  console.log("oldLanguage,newLanguage-->", oldLanguage, newLanguage);
  const oldStyle = isLanguageRTL(oldLanguage);
  const newStyle = isLanguageRTL(newLanguage);
  console.log("oldStyle,newStyle-->", oldStyle, newStyle);
  if (oldStyle != newStyle) {
    I18nManager.forceRTL(newStyle);
    // RNRestart.Restart();
  }
};
// import { useTranslation } from "react-i18next";
import moment from "moment";
export const toggleRTL = (language: string) => {
  const currentLanguage = isLanguageRTL(language);
  // const currentLanguage = isLanguageRTL("en")
  console.log("default language-->", currentLanguage);

  if (currentLanguage) {
    I18nManager.allowRTL(currentLanguage);
  }
  console.log("currentLanguage-->", currentLanguage);
};
