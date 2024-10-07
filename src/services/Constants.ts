import { AccessToken } from "./Common/AccessToken";

// export const baseURL = "http://127.0.0.1:8001/"
// export const baseURL = "http://192.168.0.121:8001/";  // local

export const baseURL = "https://uae.conektr.com/b2c/"; // live
export const baseURLImage = "https://uae.conektr.com"; // live
export const baseURLMap = "https://catalog.api.2gis.ru/";
// export const spotiiAuthURL = "https://auth.spotii.com/api/v1.0/merchant/authentication/"     // live
// export const spotiiCheckOutURL = "https://api.spotii.com/api/v1.0/checkouts/"              // live

// export const baseURL = "https://dev.conektr.com/b2c/"; //dev
// export const baseURLImage = "https://dev.conektr.com"; //dev
// export const baseURLMap = "https://catalog.api.2gis.ru/";
// export const spotiiAuthURL = "https://auth.sandbox.spotii.me/api/v1.0/merchant/authentication/" //dev
// export const spotiiCheckOutURL = "https://api.sandbox.spotii.me/api/v1.0/checkouts/"            //dev

export const spotiiConfirmCheckOutURL = baseURL + "checkout/onepage/success/"
export const spotiiFailCheckOutURL = baseURL + "checkout/onepage/failure/"

export const hashKey = "FpWLLg9RC958dsNICkXvyxbZZ189WA";
// Auth api
export const homePageDataURL = baseURL + "getHomepage.php";
export const sendOtpURL = baseURL + "sendOtp.php";
export const verifyOTPURL = baseURL + "validateOtpforLogin.php";
export const registrationURL =
  baseURL + "customer_registration_fullame_format.php";
export const retailersURL = baseURL + "retailers.php";
export const addressMapURL =
  baseURLMap +
  "3.0/items?local=en_AE&type=building,coordinates,street&key=rukzry3982&radius=500&page=1&page_size=5&sort=distance&fields=items.point,items.adm_div";
export const maplocationURL = baseURL + "maplocation.php";
export const addAddressURL = baseURL + "addAddressNew.php";
export const editAddressURL = baseURL + "editAddressNew.php";
export const defaultAddressURL = baseURL + "addressDefault.php";

export const oneSignaltokenURL = baseURL + "os_insert_token.php";
export const staticValueURL = baseURL + "staticValue.php";
export const activeCartURL = baseURL + "activeCart.php";
export const sendPopupCoupenCodeURL = baseURL + "sendPopupCoupenCode.php";
export const favouriteProductURL = baseURL + "favouriteProduct.php";
export const cartNew2URL = baseURL + "cartNew2.php";
export const getproductdetailURL = baseURL + "getproductdetailNew.php";
export const recentlyViewedURL = baseURL + "recentlyViewed.php";
export const deleteCartItemURL = baseURL + "removecartitemNew2.php";
export const updateCartUrl = baseURL + "updatecartitemNew2.php";
export const cartList2URL = baseURL + "cartlistNew2.php";
export const getSubCategoriesURL = baseURL + "getSubCategories.php";
export const getproductsCategoriesURL = baseURL + "getproducts_2.php";
export const CategoryListURL = baseURL + "getAllCategories.php";
export const CategoryHomeURL = baseURL + "getHomeCategories.php";
export const ProductDetailURL = baseURL + "getproducts_2.php";
export const getRewardPointsCaseURL = baseURL + "getRewardPointsCases.php";
export const storePickupSlotURL = baseURL + "storePickupSlot.php";
export const removePromoCodeURL = baseURL + "addCouponcode2.php";
export const estimateshippingURL = baseURL + "estimateshipping.php";
export const AddressListURL = baseURL + "myAddress.php";
export const MyOrdersURL = baseURL + "myOrders.php";
export const deleteAddressURL = baseURL + "deleteAddress.php";
export const customerdataURL = baseURL + "customerdata.php";
export const customerUpdateURL = baseURL + "customerUpdate.php";
export const updateTelephoneURL = baseURL + "updateTelephone.php";
export const updateWhatsappURL = baseURL + "updateWhatsapp.php";
export const getRewardBalanceURL = baseURL + "getRewardBalance.php";
export const cameraOptionsURL = baseURL + "cameraOptions.php";
export const cameraUploadURL = baseURL + "cameraUpload.php";
export const LogoutURL = baseURL + "logout";
export const orderDetailsURL = baseURL + "orderView.php";
export const invoicePdfURL = baseURL + "invoicePdf.php";
export const reorderURL = baseURL + "reorder.php";
export const creditAutofillURL = baseURL + "credit_application_autofill.php";
export const creditstatusURL = baseURL + "credit_application_status.php";
export const creditcreateURL = baseURL + "credit_application_create.php";
export const getBasketListURL = baseURL + "subscriptionCategoryProducts.php";
export const cartlistSubscriptionURL = baseURL + "cartlistSubscription.php";
export const cartSubscriptionUrl = baseURL + "cartSubscription.php";
export const placeOrderSubscriptionBasketURL = baseURL + "placeOrderSubscriptionBasket.php";
export const removeCartListSubscriptionUrl = baseURL + "removeCartItemSubscription.php";
export const updateCartListItem = baseURL + "updateCartItemSubscription.php";
export const cancelOrderURL = baseURL + "cancelOrder.php";
export const creditHistoryURL = baseURL + "customerCreditHistory.php";
export const favouriteproductListURL = baseURL + "favouriteproductList.php";
export const trendingSearchesURL = baseURL + "trendingSearches.php";
export const searchLatestURL = baseURL + "searchLatest.php";
export const oosProductsURL = baseURL + "oosProducts.php";
export const clearcartNewURL = baseURL + "clearcartNew.php";
export const placeOrderURL = baseURL + "placeOrder.php";
export const customerAccountDeleteURL = baseURL + "customerAccountDelete.php";

export const responseTimeout = 1000 * 60; // 60 seconds
