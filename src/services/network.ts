import NetInfo from "@react-native-community/netinfo";
import Preferences from "./preferences";

export default class Network {
  static sharedInstance: Network;

  static getInstance() {
    if (Network.sharedInstance == null) {
      Network.sharedInstance = new Network();
    }
    return this.sharedInstance;
  }

  constructor() {
    NetInfo.addEventListener((state: any) => {
      if (state.isInternetReachable !== null) {
        this.updateNetworkStatus(state.isInternetReachable);
      }
    });
  }

  fetchCurrentNetworkStatus() {
    return new Promise((resolve) => {
      Preferences.getNetworkStatus().then((status: any) => {
        resolve(status);
      });
    });
  }

  fetchNetworkStatus() {
    return new Promise((resolve) => {
      NetInfo.fetch().then((state: any) => {
        this.updateNetworkStatus(state.isConnected);
        resolve(state.isConnected);
      });
    });
  }

  updateNetworkStatus(currentStatus: boolean) {
    return new Promise((resolve) => {
      Preferences.getNetworkStatus().then((status: any) => {
        if (status !== currentStatus) {
          Preferences.saveNetworkStatus(currentStatus);
        }
      });
    });
  }
}
