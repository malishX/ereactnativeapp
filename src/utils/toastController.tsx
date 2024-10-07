import { Platform, ToastAndroid } from "react-native";
import { showMessage } from "react-native-flash-message";
import { BaseColor } from "../config";
// import { Images, useTheme } from "../config";

type MessageType =
  | "none"
  | "default"
  | "info"
  | "success"
  | "danger"
  | "warning";

export const toastController = () => {
  // const { colors } = useTheme();

  function toast(
    message: string,
    description?: string,
    messageType?: MessageType
  ) {
    return showMessage({
      icon: messageType,
      message: message,
      // description: description,
      type: messageType,
      hideStatusBar: false,
      position: "top",
      color: "black",
      backgroundColor: BaseColor.whiteColor,
    });
  }

  return {
    toast: toast,
  };
};

export const showToast = (message: string) => {

  if (Platform.OS === "ios") {
    return toastController().toast(message, "info")
  } else {
    return ToastAndroid.show(message, ToastAndroid.LONG);
  }

};
