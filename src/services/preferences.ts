import DefaultPreference from "react-native-default-preference";
import { CartItem } from "./Responses/Home/GetCategoryList2";

const networkStatus = "NetworkStatus";
const cartItemsCounts = "cartItemsCounts";
const recentlyViewed = "RecentlyViewed";
const activeOfferTime = "ActiveOfferTime";

export default class Preferences {
  static saveNetworkStatus(value: boolean) {
    return new Promise((resolve) => {
      DefaultPreference.set(networkStatus, value ? "TRUE" : "FALSE").then(
        () => {
          console.log("Saved Network Status " + networkStatus);
          resolve(networkStatus);
        }
      );
    });
  }

  static getNetworkStatus() {
    return new Promise((resolve) => {
      DefaultPreference.get(networkStatus).then(
        (value: string | null | undefined) => {
          if (value === undefined) {
            value = "TRUE";
          }
          resolve(value === "TRUE" ? true : false);
        }
      );
    });
  }

  static setCartListQtys(qty: number) {
    // var qty = 0;
    // for (var i = 0; i < value.length; i++) {
    //   qty = qty + value[i].qty;
    // }
    return new Promise((resolve) => {
      DefaultPreference.set(cartItemsCounts, JSON.stringify(qty)).then(() => {
        console.log("Saved Cart Items " + cartItemsCounts);
        resolve(cartItemsCounts);
      });
    });
  }

  static getCartListQtys() {
    return new Promise((resolve) => {
      DefaultPreference.get(cartItemsCounts).then(
        (value: any | null | undefined) => {
          if (value === undefined || value === null) {
            value = 0;
          }
          resolve(JSON.parse(value));
        }
      );
    });
  }

  static setRecentlyViewed(sku: any) {
    console.log("sku", sku);
    return new Promise((resolve) => {
      DefaultPreference.set(recentlyViewed, JSON.stringify(sku)).then(() => {
        console.log("Saved sku Items " + recentlyViewed);
        resolve(recentlyViewed);
      });
    });
  }

  static getRecentlyViewed() {
    return new Promise((resolve) => {
      DefaultPreference.get(recentlyViewed).then(
        (value: any | null | undefined) => {
          if (value === undefined || value === null) {
            value = 0;
          }
          resolve([...recentlyViewed]);
        }
      );
    });
  }

  static setActiveOfferTime(time: any) {
    console.log("time", time);
    return new Promise((resolve) => {
      DefaultPreference.set(activeOfferTime, JSON.stringify(time)).then(() => {
        console.log("Saved time Items " + activeOfferTime);
        resolve(activeOfferTime);
      });
    });
  }

  static getActiveOfferTime() {
    return new Promise((resolve) => {
      DefaultPreference.get(activeOfferTime).then(
        (value: any | null | undefined) => {
          if (value === undefined || value === null) {
            value = 0;
          }
          resolve(value);
        }
      );
    });
  }
}
