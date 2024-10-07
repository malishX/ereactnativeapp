import React, { useEffect } from "react";
import { LogBox, Text, TouchableOpacity } from "react-native";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Network from "services/network";
import App from "../App";
// import Navigator from "./navigation/index";
import { persistor, store } from "./stores";

LogBox.ignoreAllLogs();
export default function mainApp() {
   

  Network.getInstance().fetchCurrentNetworkStatus();
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
}
