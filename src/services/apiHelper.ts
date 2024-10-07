import axios from "axios";
import { Alert } from "react-native";
import Auth from "../../Main";
import getHooks from "../hooks";
import { BaseResponse } from "./Common/BaseResponse";
import {
  activeCartURL,
  cameraOptionsURL,
  cameraUploadURL,
  cancelOrderURL,
  cartList2URL,
  cartlistSubscriptionURL,
  cartNew2URL,
  cartSubscriptionUrl,
  CategoryHomeURL,
  clearcartNewURL,
  creditAutofillURL,
  creditHistoryURL,
  creditstatusURL,
  customerAccountDeleteURL,
  customerdataURL,
  customerUpdateURL,
  deleteAddressURL,
  deleteCartItemURL,
  estimateshippingURL,
  favouriteproductListURL,
  favouriteProductURL,
  getBasketListURL,
  getproductdetailURL,
  getproductsCategoriesURL,
  getRewardBalanceURL,
  getRewardPointsCaseURL,
  getSubCategoriesURL,
  homePageDataURL,
  invoicePdfURL,
  MyOrdersURL,
  oneSignaltokenURL,
  oosProductsURL,
  orderDetailsURL,
  placeOrderSubscriptionBasketURL,
  placeOrderURL,
  ProductDetailURL,
  recentlyViewedURL,
  removeCartListSubscriptionUrl,
  removePromoCodeURL,
  reorderURL,
  responseTimeout,
  searchLatestURL,
  sendOtpURL,
  sendPopupCoupenCodeURL,
  // spotiiAuthURL,
  // spotiiCheckOutURL,
  staticValueURL,
  storePickupSlotURL,
  trendingSearchesURL,
  updateCartListItem,
  updateCartUrl,
  updateTelephoneURL,
  updateWhatsappURL,
} from "./Constants";
import Network from "./network";
import {
  BasketListResponse,
  Product,
} from "./Responses/Accounts/Basket/BasketListResponse";
import { SelectBasketProductsResponse } from "./Responses/Accounts/Basket/SelectBasketProductsResponse";
import { RegisterResponse } from "./Responses/Auth/RegisterResponse";
import { ActiveCartResponse } from "./Responses/Home/ActiveCartResponse";
import { CameraOptionsResponse } from "./Responses/Home/CameraOptionsResponse";
import { CancelOrderResponse } from "./Responses/Home/cancelOrderResponse";
import { cartNew2Response } from "./Responses/Home/CartNew2Response";
import { CreditAutofillResponse } from "./Responses/Home/CreditAutofillResponse";
import { DeleteCartItemResponse } from "./Responses/Home/DeleteCartItemResponse";
import { EstimateShippingResponse } from "./Responses/Home/EstimateShipping";
import { GetCartList2Response } from "./Responses/Home/GetCategoryList2";
import { GetOrederListResponse } from "./Responses/Home/GetOrderListResponse";
import { GetProductDetailResponse } from "./Responses/Home/GetProductDetail";
import { getproductsCategoryResponse } from "./Responses/Home/getproductsCategory";
import { getSubCategoriesResponse } from "./Responses/Home/GetSubCategoriesResponse";
import { HomePageCategoryDataResponse } from "./Responses/Home/HomePageCategoryResponse";
import { HomePageDataResponse } from "./Responses/Home/HomePageDataResponse";
import { MarketProductDetailsResponse } from "./Responses/Home/MarketProductDetailsResponse";
import { MyRewardResponse } from "./Responses/Home/MyRewardResponse";
import { ProductsDataResponse } from "./Responses/Home/ProductsDataResponse";
import { RewardPointsCasesResponse } from "./Responses/Home/RewardPointsCasesResponse";
import { StaticValueResponse } from "./Responses/Home/StaticValueResponse";
import { storePickupSlotResponse } from "./Responses/Home/storePickupSlotResponse";
import { StoreProductsDataResponse } from "./Responses/Home/StoreProductsDataResponse";
import { TrendingSearchingResponse } from "./Responses/Home/TrendingSearch";
import { InvoicePdfResponse } from "./Responses/Orders/InvoicePdfResponse";
import { OrderDetailsResponse } from "./Responses/Orders/OrderDetailsResponse";

// var hooks: any
// var token: string

export default class ApiHelper {
  // hooks = getHooks()
  // token = hooks.spotiiToken
  static createFormDataRequest(data: any) {
    const objEntries = Object.entries(data);

    const formData = new FormData();
    objEntries.map((item) => formData.append(`${item[0]}`, item[1]));

    return formData;
  }
  static postData(apiURL: string, body: any, isFormData: boolean, Authorization: string) {
    return new Promise((resolve, reject) => {
      Network.getInstance()
        .fetchCurrentNetworkStatus()
        .then(async (isConnected) => {
          // const accessToken = USER_TOKEN.get().token;
          if (isConnected) {
            var headers = {
              // Headers object
              Accept: 'multipart/form-data',
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${Authorization}`,
            };
            var headerss = {
              // Headers object
              // Accept: 'application/json',
              // 'Content-Type': 'application/json',
              Authorization: `Bearer ${Authorization}`,
            };
            var apiBody = isFormData ? this.createFormDataRequest(body) : body;
            await axios
              .post(apiURL, apiBody, {
                method: "POST",
                headers: Authorization.length > 0 ? headerss : headers,
                timeout: responseTimeout,
              })
              .then(function (response: any) {
                console.log("API response->", response);
                resolve(response.data);
              })
              .catch(async function (error: any) {
                if (error.response) {
                  if (
                    error.status === 401 &&
                    error.message === "invalid_token"
                  ) {
                    /// Here, I am applying the code to renew the token and after that i will call the same api again to get the result.
                  } else {
                    reject(error);
                  }
                } else {
                  reject(error);
                }
              });
          } else {
            Alert.alert(
              "Conektr",
              "No internet connection, please try again later."
            );
            reject("No internet connection, please try again later.");
          }
        });
    });
  }

  static getData(apiURL: string) {
    return new Promise((resolve, reject) => {
      Network.getInstance()
        .fetchCurrentNetworkStatus()
        .then(async (isConnected) => {
          if (isConnected) {
            await axios
              .get(apiURL)
              .then(function (response: any) {
                console.log("API response->", response);
                resolve(response.data);
              })
              .catch(async function (error: any) {
                if (error.response) {
                  if (
                    error.status === 401 &&
                    error.message === "invalid_token"
                  ) {
                    /// Here, I am applying the code to renew the token and after that i will call the same api again to get the result.
                  } else {
                    reject(error);
                  }
                } else {
                  reject(error);
                }
              });
          } else {
            Alert.alert(
              "Conektr",
              "No internet connection, please try again later."
            );
            reject("No internet connection, please try again later.");
          }
        });
    });
  }

  static getoneSignalToken(apiParams: any) {
    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = oneSignaltokenURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static sendOTP(apiParams: any) {
    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = sendOtpURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static staticValue(apiParams: any) {
    return new Promise<StaticValueResponse>((resolve, reject) => {
      let apiURL = staticValueURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as StaticValueResponse))
        .catch((err) => reject(err));
    });
  }

  static sendPopupCouponCode(apiParams: any) {
    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = sendPopupCoupenCodeURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static favoriteProduct(apiParams: any) {
    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = favouriteProductURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static getActiveCart(apiParams: any) {
    return new Promise<ActiveCartResponse>((resolve, reject) => {
      let apiURL = activeCartURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as ActiveCartResponse))
        .catch((err) => reject(err));
    });
  }

  static getProductDetail(apiParams: any) {
    return new Promise<GetProductDetailResponse>((resolve, reject) => {
      let apiURL = getproductdetailURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as GetProductDetailResponse))
        .catch((err) => reject(err));
    });
  }

  static getCartList2(apiParams: any) {
    return new Promise<GetCartList2Response>((resolve, reject) => {
      let apiURL = cartList2URL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as GetCartList2Response))
        .catch((err) => reject(err));
    });
  }

  static getHomePageData(apiParams: any) {
    return new Promise<HomePageDataResponse>((resolve, reject) => {
      let apiURL = homePageDataURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as HomePageDataResponse))
        .catch((err) => reject(err));
    });
  }

  static getHomePageCategoryData(apiParams: any) {
    return new Promise<HomePageCategoryDataResponse>((resolve, reject) => {
      let apiURL = CategoryHomeURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as HomePageCategoryDataResponse))
        .catch((err) => reject(err));
    });
  }

  static getSubCategories(apiParams: any) {
    return new Promise<getSubCategoriesResponse>((resolve, reject) => {
      let apiURL = getSubCategoriesURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as getSubCategoriesResponse))
        .catch((err) => reject(err));
    });
  }

  static getproductsCategory(apiParams: any) {
    return new Promise<getproductsCategoryResponse>((resolve, reject) => {
      let apiURL = getproductsCategoriesURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as getproductsCategoryResponse))
        .catch((err) => reject(err));
    });
  }

  static getProductsData(apiParams: any) {
    return new Promise<ProductsDataResponse>((resolve, reject) => {
      let apiURL = ProductDetailURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as ProductsDataResponse))
        .catch((err) => reject(err));
    });
  }

  static getStoreProductsData(apiParams: any) {
    return new Promise<StoreProductsDataResponse>((resolve, reject) => {
      let apiURL = ProductDetailURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as StoreProductsDataResponse))
        .catch((err) => reject(err));
    });
  }

  static getMarketProductsData(apiParams: any) {
    return new Promise<MarketProductDetailsResponse>((resolve, reject) => {
      let apiURL = ProductDetailURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as MarketProductDetailsResponse))
        .catch((err) => reject(err));
    });
  }

  static getOrederList(apiParams: any) {
    return new Promise<GetOrederListResponse>((resolve, reject) => {
      let apiURL = MyOrdersURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as GetOrederListResponse))
        .catch((err) => reject(err));
    });
  }

  static cartNew2(apiParams: any) {
    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = cartNew2URL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static recentlyViewed(apiParams: any) {
    return new Promise<ProductsDataResponse>((resolve, reject) => {
      let apiURL = recentlyViewedURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as ProductsDataResponse))
        .catch((err) => reject(err));
    });
  }

  static deleteCartItem(apiParams: any) {
    return new Promise<DeleteCartItemResponse>((resolve, reject) => {
      let apiURL = deleteCartItemURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as DeleteCartItemResponse))
        .catch((err) => reject(err));
    });
  }

  static updateCartItem(apiParams: any) {
    return new Promise<GetCartList2Response>((resolve, reject) => {
      let apiURL = updateCartUrl;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as GetCartList2Response))
        .catch((err) => reject(err));
    });
  }

  static rewardPointsCases(apiParams: any) {
    return new Promise<RewardPointsCasesResponse>((resolve, reject) => {
      let apiURL = getRewardPointsCaseURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as RewardPointsCasesResponse))
        .catch((err) => reject(err));
    });
  }

  static removePromoCode(apiParams: any) {
    return new Promise<GetCartList2Response>((resolve, reject) => {
      let apiURL = removePromoCodeURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as GetCartList2Response))
        .catch((err) => reject(err));
    });
  }

  static clearCart(apiParams: any) {
    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = clearcartNewURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static storePickupSlot(apiParams: any) {
    return new Promise<storePickupSlotResponse>((resolve, reject) => {
      let apiURL = storePickupSlotURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as storePickupSlotResponse))
        .catch((err) => reject(err));
    });
  }

  static estimateShipping(apiParams: any) {
    return new Promise<EstimateShippingResponse>((resolve, reject) => {
      let apiURL = estimateshippingURL;
      this.postData(apiURL, apiParams, true, "").then((res) =>
        resolve(res as EstimateShippingResponse)
      );
    });
  }

  static placeOrder(apiParams: any) {
    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = placeOrderURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static cancelOrder(apiParams: any) {
    return new Promise<CancelOrderResponse>((resolve, reject) => {
      let apiURL = cancelOrderURL;
      this.postData(apiURL, apiParams, false, "")
        .then((res) =>
          resolve(res as CancelOrderResponse)
        );
    });
  }

  static getProfileData(apiParams: any) {
    return new Promise<RegisterResponse>((resolve, reject) => {
      let apiURL = customerdataURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as RegisterResponse))
        .catch((err) => reject(err));
    });
  }

  static customerUpdate(apiParams: any) {
    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = customerUpdateURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static updateTelephone(apiParams: any) {
    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = updateTelephoneURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static updateWhatsapp(apiParams: any) {
    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = updateWhatsappURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static getRewardBalance(apiParams: any) {
    return new Promise<MyRewardResponse>((resolve, reject) => {
      let apiURL = getRewardBalanceURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as MyRewardResponse))
        .catch((err) => reject(err));
    });
  }

  static cameraOptions(apiParams: any) {
    return new Promise<CameraOptionsResponse>((resolve, reject) => {
      let apiURL = cameraOptionsURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as CameraOptionsResponse))
        .catch((err) => reject(err));
    });
  }

  static getOrderDetails(apiParams: { order_id: string }) {
    return new Promise<OrderDetailsResponse>((resolve, reject) => {
      let apiURL = orderDetailsURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as OrderDetailsResponse))
        .catch((err) => reject(err));
    });
  }

  static invoicePdf(apiParams: { order_id: string }) {
    return new Promise<InvoicePdfResponse>((resolve, reject) => {
      let apiURL = invoicePdfURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as InvoicePdfResponse))
        .catch((err) => reject(err));
    });
  }

  static reorder(apiParams: { hashkey: string, customer_id: string, order_id: string }) {
    return new Promise<GetCartList2Response>((resolve, reject) => {
      let apiURL = reorderURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as GetCartList2Response))
        .catch((err) => reject(err));
    });
  }

  static cameraUpload(apiParams: any) {
    console.log("apiParams======>", apiParams);

    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = cameraUploadURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static creditAutofill(apiParams: any) {
    return new Promise<CreditAutofillResponse>((resolve, reject) => {
      let apiURL = creditAutofillURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as CreditAutofillResponse))
        .catch((err) => reject(err));
    });
  }

  static getBasketList(apiParams: { hashkey: string; customer_id: string }) {
    return new Promise<BasketListResponse>((resolve, reject) => {
      let apiURL = getBasketListURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BasketListResponse))
        .catch((err) => reject(err));
    });
  }

  static creditStatus(apiParams: any) {
    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = creditstatusURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static cartListSubscription(apiParams: {
    hashkey: string;
    customer_id: string;
    quote_id: string;
  }) {
    return new Promise<BasketListResponse>((resolve, reject) => {
      let apiURL = cartlistSubscriptionURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BasketListResponse))
        .catch((err) => reject(err));
    });
  }

  static creditHistory(apiParams: any) {
    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = creditHistoryURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static favouriteproductList(apiParams: any) {
    return new Promise<ProductsDataResponse>((resolve, reject) => {
      let apiURL = favouriteproductListURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as ProductsDataResponse))
        .catch((err) => reject(err));
    });
  }

  static trendingSearching(apiParams: any) {
    return new Promise<TrendingSearchingResponse>((resolve, reject) => {
      let apiURL = trendingSearchesURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as TrendingSearchingResponse))
        .catch((err) => reject(err));
    });
  }

  static searchLatest(apiParams: any) {
    return new Promise<ProductsDataResponse>((resolve, reject) => {
      let apiURL = searchLatestURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as ProductsDataResponse))
        .catch((err) => reject(err));
    });
  }

  static oosProducts(apiParams: any) {
    return new Promise<getproductsCategoryResponse>((resolve, reject) => {
      let apiURL = oosProductsURL;
      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as getproductsCategoryResponse))
        .catch((err) => reject(err));
    });
  }

  static selectBasketProducts(apiParams: {
    hashkey: string;
    customer_id: string;
    product: string;
    cat_id: string;
    qty: number;
  }) {
    return new Promise<SelectBasketProductsResponse>((resolve, reject) => {
      let apiURL = cartSubscriptionUrl;

      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res as SelectBasketProductsResponse))
        .catch((e) => reject(e));
    });
  }

  static unSelectBasketProducts(apiParams: {
    hashkey: string;
    quote_id: string;
    product: string;
  }) {
    return new Promise((resolve, reject) => {
      let apiURL = removeCartListSubscriptionUrl;

      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res))
        .catch((e) => reject(e));
    });
  }

  static updateBasketProducts(apiParams: {
    hashkey: string;
    customer_id: string;
    quote_id: string;
    product: string;
    qty: number;
  }) {
    return new Promise((resolve, reject) => {
      let apiURL = updateCartListItem;

      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res))
        .catch((e) => reject(e));
    });
  }


  static deleteAccount(apiParams: any) {
    return new Promise<BaseResponse>((resolve, reject) => {
      let apiURL = customerAccountDeleteURL;
      this.postData(apiURL, apiParams, false, "")
        .then((res) => resolve(res as BaseResponse))
        .catch((err) => reject(err));
    });
  }

  static placeOrderSubscriptionBasket(apiParams: {
    hashkey: string;
    device_type: any;
    customerId: string;
    quoteId: string;
    payment_method: string;
    shipping_method: string;
    subscription_status: string;
    subscription_calender_date: string;
    basket: string;
    transaction_id: null;
  }) {
    return new Promise((resolve, reject) => {
      let apiURL = placeOrderSubscriptionBasketURL;

      this.postData(apiURL, apiParams, true, "")
        .then((res) => resolve(res))
        .catch((e) => reject(e));
    });
  }

  // static spotiiAuth(apiParams: any) {
  //   return new Promise<BaseResponse>((resolve, reject) => {
  //     let apiURL = spotiiAuthURL;
  //     this.postData(apiURL, apiParams, false, "")
  //       .then((res) => resolve(res as BaseResponse))
  //       .catch((err) => reject(err));
  //   });
  // }

  // static spotiiCheckOut(apiParams: any, auth: string) {
  //   console.log("auth", auth);

  //   return new Promise<BaseResponse>((resolve, reject) => {
  //     let apiURL = spotiiCheckOutURL;
  //     this.postData(apiURL, apiParams, false, auth)
  //       .then((res) => resolve(res as BaseResponse))
  //       .catch((err) => reject(err));
  //   });
  // }
}
