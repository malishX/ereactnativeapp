import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
  NativeModules,
  Alert
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from "moment";
import Slider from "@react-native-community/slider";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import TelrSdk from "rn-telr-sdk";
import DeviceInfo from "react-native-device-info";

import useStyles from "./Style";
import { useCalendarStyles } from "./CalenderStyle";
import useTheme from "../../theme";
import { BaseColor, font, FontFamily, getFontSize } from "../../config";
import { Button, ButtonView } from "../../components";
import { Images } from "../../Images";
import { deviceHeight, deviceWidth, scale } from "../../config/responsive";
import CreditPoint from "./HomeSubScreen/Cart/CreditPoint";
import CartItemExpand from "./HomeSubScreen/Cart/CartItemExpand";
import { ActionTypes } from "../../action";
import ApiHelper from "../../services/apiHelper";
import { RewardPointsCasesResponse } from "../../services/Responses/Home/RewardPointsCasesResponse";
import { useDispatch } from "react-redux";
import { toastController } from "../../utils";
import getHooks from "../../hooks";
import { GetCartList2Response } from "../../services/Responses/Home/GetCategoryList2";
import Preferences from "../../services/preferences";
import ProgressView from "../../components/Organisms/progressView";
import { BaseResponse } from "../../services";
import { AvenuesParams, Constants, MerchantParams, InitialParams, CardPattern } from '../../utils';
import {
  EXTRA_ORDER_TYPE_CARD,
  EXTRA_ORDER_TYPE_CASH,
  EXTRA_ORDER_TYPE_CREDIT_POINTS,
  EXTRA_ORDER_TYPE_SPOTII,
  SPOTII_PRIVATE_KEY,
  SPOTII_PRIVATE_KEY1,
  SPOTII_PUBLIC_KEY,
  SPOTII_PUBLIC_KEY1,
} from "../../services/ConstVariable";
import { EstimateShippingResponse } from "../../services/Responses/Home/EstimateShipping";
import { DeleteCartItemResponse } from "../../services/Responses/Home/DeleteCartItemResponse";
import { hashKey, spotiiConfirmCheckOutURL, spotiiFailCheckOutURL } from "../../services/Constants";
import { CalenderData, storePickupSlotResponse } from "../../services/Responses/Home/storePickupSlotResponse";
import { showToast } from "../../utils/toastController";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const Cart = ({ navigation, route }: { navigation: any; route: any }) => {
  const style = useStyles();
  const calenderStyles = useCalendarStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { toast } = toastController();
  const hooks = getHooks();
  const isFocused = useIsFocused();
  const { CCAvenueModule } = NativeModules;


  const cartList = hooks.cartList;
  const quote_id = hooks.activeCart;
  const paymentMethod = hooks.paymentMethod;
  const cartDetail = hooks.cartRes;
  const rewardPointsCases = hooks.rewardPointsCases;
  const userData = hooks.user;
  const selectedAddId = hooks.selectedAddId;

  console.log("rewardPointsCases====>>>", rewardPointsCases);
  console.log("paymentMethod====>>>", paymentMethod);
  console.log("selectedAddId", selectedAddId);
  console.log("cartList", cartDetail);
  console.log("userData", userData);
  console.log("cartRoute", route);


  const [isProgress, setProgress] = useState(false);
  const [isApply, setApply] = useState(false);
  const [isRemove, setRemove] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isSliderShow, setSliderShow] = useState(false);
  const [totalPrice, setTotalPrice] = useState({
    grand_total: 0,
    subTotal: 0,
    discount: 0,
    serviceCharge: 0,
    rewardPoint: 0,
    tax: 0,
  });

  const [sliderValue, setSliderValue] = useState(0);
  const [pointsCanRedeem, setPointsCanRedeem] = useState<any>(null);
  const [isCheckOutBtn, setCheckOutBtn] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>("");
  const [address, setAddress] = useState<any>({
    street: "",
    city: "",
    country_name: "",
    telephone: "",
    id: "",
    state: "",
    name: ""
  });
  const [selectDate, setSelectDate] = useState<any>({ "": { selected: false } });
  const [shippingMethod, setShippingMethod] = useState<any>(null);
  const [comment, setComment] = useState<string>("");

  const [telrModalVisible, setTelrModalVisible] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [billing_name_first, setBilling_name_first] = React.useState("");
  const [billing_name_last, setBilling_name_last] = React.useState("");
  const [tran_amount, setTran_amount] = React.useState("");
  const [totalItem, setTotalItem] = useState(0);

  const budgecount = () => {
    var total = 0;
    for (var i = 0; i < cartList.length; i++) {
      total = total + cartList[i].qty;
    }
    setTotalItem(total);
    return console.log("total=========>", total);
  };

  useEffect(() => {
    budgecount();
    cartDetail.cart_items > 0 && EstimatedView()
  }, [cartDetail]);

  // const [cartDetail, setCartDetail] = useState<any>(GetCartList2Response)
  console.log("selectDate", selectDate);
  console.log("totalPrice", totalPrice);
  console.log("comment", comment);
  console.log("shippingMethod", shippingMethod);
  console.log("address-------============>", address);
  console.log("paymentRequest", paymentRequest);

  const onRewardPointsCases = (data: any) => {
    console.log("data===========>", data);
    return {
      type: ActionTypes.REWARDPOINTSCASES,
      data,
    };
  };

  // useEffect(() => {
  //   findAddress();
  // }, [route.params]);

  useEffect(() => {
    findAddress();
    // estimateShippingApiCall("");
    // storePickupSlotApiCall()
  }, [isFocused])

  useEffect(() => {
    {
      // EstimatedView()
      cartDetail.cart_items > 0 && EstimatedView();
    }
  }, [sliderValue]);

  // useEffect(() => {
  //   console.log("paymentMethod====>>>>>", paymentMethod);
  //   {
  //     cartDetail.cart_items > 0 && EstimatedView();
  //   }
  // }, [paymentMethod]);

  useEffect(() => {
    rewardPoints();
  }, [totalPrice]);
  useEffect(() => {
    cartDetail.cart_items > 0 && EstimatedView()
  }, [cartDetail])
  useEffect(() => {
    setProgress(true)
    {
      // cartDetail.cart_items > 0 && EstimatedView();
      quote_id === null || quote_id === 0
        ? console.log("Cart list is null")
        : getCartList2();
    }

    setTimeout(() => {
      setProgress(false)
    }, 5000)
  }, []);

  useEffect(() => {
    changeStateOfCheckoutButton()
  }, [selectedDate])

  const onSelectedAdd = (data: any) => {
    return {
      type: ActionTypes.SELECTEDADD_ID,
      data,
    };
  };
  const findAddress = () => {
    setProgress(true);
    console.log("routePramns", route.params);

    var addressDetail = {
      street: null,
      city: null,
      country_name: null,
      telephone: null,
      id: "",
      state: null,
      name: ""
    };
    if (route.params === undefined || route.params.item === undefined) {
      for (let i = 0; i < userData.addresses.length; i++) {
        const addressItem = userData.addresses[i];
        console.log("addressItem", addressItem);

        if (
          userData.default_shipping !== null &&
          (userData.default_shipping === addressItem.id) === true
        ) {
          (addressDetail.street = addressItem.street),
            (addressDetail.city = addressItem.city),
            (addressDetail.country_name = addressItem.country_name),
            (addressDetail.telephone = addressItem.telephone);
          (addressDetail.state = addressItem.region.region);
          (addressDetail.name = `${addressItem.firstname} ${addressItem.lastname}`);
          addressDetail.id = addressItem.id;
          estimateShippingApiCall(addressItem.id);
          storePickupSlotApiCall(addressItem.id);
          console.log("addressItem", addressItem);
          break;
        }
      }
    } else {
      for (let i = 0; i < userData.addresses.length; i++) {
        const addressItem = userData.addresses[i];
        console.log("route.params.item === addressItem.id", addressItem);
        if (
          route.params.item !== null &&
          route.params.item === addressItem.id
        ) {
          (addressDetail.street = addressItem.street),
            (addressDetail.city = addressItem.city),
            (addressDetail.country_name = addressItem.country_name),
            (addressDetail.telephone = addressItem.telephone);
          (addressDetail.state = addressItem.region.region);
          (addressDetail.name = `${addressItem.firstname} ${addressItem.lastname}`)
          addressDetail.id = route.params.item;
          estimateShippingApiCall(route.params.item);
          storePickupSlotApiCall(route.params.item);
          console.log("addressItem", addressItem);
          break;
        }
      }
    }

    setAddress(addressDetail);
    dispatch(onSelectedAdd(addressDetail.id));
    setProgress(false);
  };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log("focused");

  //     findAddress()
  //   })
  //   return unsubscribe;
  // },[])
  const getRewardPointsCasesapiCall = async () => {
    setProgress(true);
    console.log("reward points cases api call");

    const apiCallObj = {
      hashkey: hashKey,
      point_style: "spending",
    };

    ApiHelper.rewardPointsCases(apiCallObj).then(
      (res: RewardPointsCasesResponse) => {
        console.log("rewardPointsCases", res);

        if (res.success === 1) {
          dispatch(onRewardPointsCases(res.data));
          rewardPoints();
          console.log("Queste_id=========>", quote_id);
          {
            quote_id === null || quote_id === 0
              ? console.log("quote_id is null ")
              : getCartList2();
          }
          setProgress(false);
        } else if (res.success === 0) {
          toast("Msg", res.specification, "info");
        } else {
          toast("network_error", "network_msg", "info");
        }
      }
    );
  };

  const onCartList = (data: any) => {
    return {
      type: ActionTypes.CART_LIST,
      data,
    };
  };
  const onCartRes = (data: any) => {
    return {
      type: ActionTypes.CART_RES,
      data,
    };
  };

  const EstimatedView = () => {
    console.log("change payment method", paymentMethod);
    setProgress(true)
    var totalValue = {
      grand_total: 0,
      subTotal: 0,
      discount: 0,
      serviceCharge: 0,
      rewardPoint: sliderValue / 10,
      tax: 0,
      serviceChargePercentage: 0,
    };
    if (cartDetail !== null) {
      console.log("cartDetail null");

      if (paymentMethod === EXTRA_ORDER_TYPE_CREDIT_POINTS) {
        (totalValue.subTotal = cartDetail.data.paybycredit.subtotal),
          (totalValue.discount = cartDetail.data.paybycredit.discount_amount);
        (totalValue.serviceChargePercentage = cartDetail.data.paybycredit.service_charge_percentage),
          (totalValue.serviceCharge =
            ((totalValue.subTotal +
              totalValue.discount -
              totalValue.rewardPoint) *
              totalValue.serviceChargePercentage) /
            100);

        totalValue.tax =
          ((totalValue.subTotal +
            totalValue.discount +
            totalValue.serviceCharge -
            totalValue.rewardPoint) *
            5) /
          100;

        totalValue.grand_total =
          totalValue.subTotal +
          totalValue.discount +
          totalValue.serviceCharge +
          totalValue.tax -
          totalValue.rewardPoint;

        console.log("Credit points method");
        console.log("reward point method", totalPrice.subTotal);
      } else if (paymentMethod === EXTRA_ORDER_TYPE_CARD) {
        console.log("enter card method");

        (totalValue.subTotal = cartDetail.data.ccavenuepay.subtotal),
          (totalValue.discount = cartDetail.data.ccavenuepay.discount_amount);
        (totalValue.serviceChargePercentage = cartDetail.data.ccavenuepay.service_charge_percentage),
          totalValue.serviceCharge =
          ((totalValue.subTotal +
            totalValue.discount -
            totalValue.rewardPoint) *
            totalValue.serviceChargePercentage) /
          100;

        totalValue.tax =
          ((totalValue.subTotal +
            totalValue.discount +
            totalValue.serviceCharge -
            totalValue.rewardPoint) *
            5) /
          100;

        totalValue.grand_total =
          totalValue.subTotal +
          totalValue.discount +
          totalValue.serviceCharge +
          totalValue.tax -
          totalValue.rewardPoint;
      } else if (paymentMethod === EXTRA_ORDER_TYPE_SPOTII) {
        (totalValue.subTotal = cartDetail.data.spotiipay.subtotal),
          (totalValue.discount = cartDetail.data.spotiipay.discount_amount);
        (totalValue.serviceChargePercentage = cartDetail.data.spotiipay.service_charge_percentage),
          totalValue.serviceCharge =
          ((totalValue.subTotal +
            totalValue.discount -
            totalValue.rewardPoint) *
            totalValue.serviceChargePercentage) /
          100;

        totalValue.tax =
          ((totalValue.subTotal +
            totalValue.discount +
            totalValue.serviceCharge -
            totalValue.rewardPoint) *
            5) /
          100;

        totalValue.grand_total =
          totalValue.subTotal +
          totalValue.discount +
          totalValue.serviceCharge +
          totalValue.tax -
          totalValue.rewardPoint;
      } else if (paymentMethod === EXTRA_ORDER_TYPE_CASH) {
        (totalValue.subTotal = cartDetail.data.cashondelivery.subtotal),
          (totalValue.discount =
            cartDetail.data.cashondelivery.discount_amount);
        (totalValue.serviceChargePercentage = cartDetail.data.cashondelivery.service_charge_percentage),
          totalValue.serviceCharge =
          ((totalValue.subTotal +
            totalValue.discount -
            totalValue.rewardPoint) *
            totalValue.serviceChargePercentage) /
          100;

        totalValue.tax =
          ((totalValue.subTotal +
            totalValue.discount +
            totalValue.serviceCharge -
            totalValue.rewardPoint) *
            5) /
          100;

        totalValue.grand_total =
          totalValue.subTotal +
          totalValue.discount +
          totalValue.serviceCharge +
          totalValue.tax -
          totalValue.rewardPoint;
      }
      console.log("totalValue", totalValue);

      setTotalPrice(totalValue);
      totalPrice.subTotal > 0 && setProgress(false);
    } else {
      console.log("cart Detail is null");
    }
  };
  const rewardPoints = () => {
    setProgress(true)
    console.log("reward point method", totalPrice.subTotal);
    if (
      rewardPointsCases !== null &&
      rewardPointsCases.can_use_reward &&
      cartDetail.reward_points > 0
    ) {
      setProgress(false)
      setSliderShow(true);
      var totalAvailablePointBalance = cartDetail.reward_points;
      var pointsCanRedeemAsPerSubTotal =
        totalPrice.subTotal === 0 ? 0 : totalPrice.subTotal / 10;
      var maxPointsCanRedeem = parseInt(rewardPointsCases.spend_max_points);
      var pointsCanRedeem;
      if (maxPointsCanRedeem <= pointsCanRedeemAsPerSubTotal) {
        pointsCanRedeem = maxPointsCanRedeem;
      } else {
        pointsCanRedeem = pointsCanRedeemAsPerSubTotal;
      }

      if (pointsCanRedeem > totalAvailablePointBalance) {
        pointsCanRedeem = totalAvailablePointBalance;
      }
      return setPointsCanRedeem(pointsCanRedeem);
    } else {
      setSliderShow(false);
    }
  };

  const getCartList2 = async () => {
    setProgress(true);

    const apiCallObj = {
      hashkey: hashKey,
      quote_id: quote_id,
    };

    ApiHelper.getCartList2(apiCallObj).then((res: GetCartList2Response) => {
      console.log("Cart Api Call", res);

      if (res.success === 1) {
        setProgress(false);
        dispatch(onCartList(res.data.items));
        dispatch(onCartRes(res));
        if (res.cart_items > 0) {
          // EstimatedView();
          findAddress();
          Preferences.setCartListQtys(res.data.items.length);
          setProgress(false)
        }
        if (
          res.data.coupon_applied != null &&
          res.data.coupon_applied.length > 0
        ) {
          setPromoCode(res.data.coupon_applied);
          setApply(false);
          setRemove(true);
        } else {
          setPromoCode("");
          setApply(true);
          setRemove(false);
        }
      } else if (res.success === 0) {
        showToast(res.specification);
      } else {
        showToast("please cheack your network");
      }
    });
  };

  const estimateShippingApiCall = async (addressId: string) => {
    setProgress(true);

    const apiCallObj = {
      hashkey: hashKey,
      quote_id: quote_id,
      addressid: addressId,
    };

    ApiHelper.estimateShipping(apiCallObj).then(
      (res: EstimateShippingResponse) => {
        console.log("Estimate Api Call", res);

        if (res.success === 1) {
          setProgress(false);
          res.result.map((item) => {
            setShippingMethod(item.carrier_title)
          })
          // dispatch(onCartList(res.data.items));
          // dispatch(onCartRes(res))
          // setCartDetail(res)
        } else if (res.success === 0) {
          setProgress(false);
          // toast("Msg", res.specification, "info");
        } else {
          setProgress(false);
          // toast("network_error", "network_msg", "info");
        }
      }
    );
  };

  const storePickupSlotApiCall = (addressId: string) => {
    return new Promise<storePickupSlotResponse>((resolve, reject) => {
      const apiCallObj = {
        hashkey: hashKey,
        quoteId: quote_id,
        addressid: addressId
      };

      ApiHelper.storePickupSlot(apiCallObj)
        .then((res: storePickupSlotResponse) => {
          console.log("calander res", res);
          var days: any = {}
          if (res.data.length > 0) {
            res.data.forEach((val) => {
              days[val.day] = {
                selected: false,
                // marked: true,
                // selectedTextColor: "#000000",
                disabled: false,
                selectedColor: BaseColor.yellowColor
              }
            })
          }

          console.log("days", days);

          setSelectDate(days)
          // setOrderDetails(res);
          resolve(res);
        })
        .catch((err) => {
          console.log("Get order details err", err);
          reject(err);
        });
    });
  };

  const removePromoCodeApiCall = async (value: any) => {
    setProgress(true);

    const apiCallObj = {
      hashkey: hashKey,
      quoteId: quote_id,
      couponCode: value === null ? "" : value,
    };

    ApiHelper.removePromoCode(apiCallObj).then((res: GetCartList2Response) => {
      console.log("Remove Promo Code", res);

      if (res.success === 1) {
        // dispatch(onRewardPointsCases(res.data));
        getCartList2();
        setProgress(false);
        showToast(res.specification);
      } else if (res.success === 0) {
        showToast(res.specification);
        setProgress(false);
      } else {
        showToast("Please check your network");
        setProgress(false);
      }
    });
  };



  const changeStateOfCheckoutButton = () => {
    // Check if any of items are not in stock, disable Checkout button
    var ifAllItemsAreInStock: boolean = true

    for (var i = 0; i < cartList.length; i++) {
      if (cartList[i].is_stock === 0) {
        ifAllItemsAreInStock = false;
        break;
      }
      // console.log("ifAllItemsAreInStock", ifAllItemsAreInStock);
    }

    if (ifAllItemsAreInStock === false) {
      console.log("DISABLE_CHECKOUT", "Out of stock item available in cart");
      setCheckOutBtn(false);
      return;
    }

    // Check if selected address not available, disable Checkout button
    if (address.street.length === 0) {
      console.log("DISABLE_CHECKOUT", "Address not selected");
      setCheckOutBtn(false);
      return;
    }

    // Check if shipping method not selected, disable Checkout button
    if (shippingMethod === null) {
      console.log("DISABLE_CHECKOUT", "Shipping Method not selected");
      setCheckOutBtn(false);
      return;
    }

    // Check if slots are not available, disable Checkout button
    if (selectDate === null) {
      console.log("DISABLE_CHECKOUT", "Delivery dates are not available");
      setCheckOutBtn(false);
      return;
    }
    setCheckOutBtn(true)
  }

  const clearCartApiCall = async () => {
    return new Promise<BaseResponse>((resolve, reject) => {
      setProgress(true);
      const apiCallObj = {
        hashkey: hashKey,
        quote_id: quote_id,
      };

      ApiHelper.clearCart(apiCallObj).then((res: BaseResponse) => {
        console.log("clear cart-===========>", res);
        resolve(res);
        setProgress(false);
        getCartList2()
      });
    });
  };

  // ORDER PLACE 
  const placeOrderApiCall = async () => {
    var shipping = shippingMethod === "Free Shipping" ? 'freeshipping_freeshipping' : `${shippingMethod}_${shippingMethod} `
    var apipaymentMethod = paymentMethod === EXTRA_ORDER_TYPE_CREDIT_POINTS ? "paybycredit" :
      paymentMethod === EXTRA_ORDER_TYPE_CARD ? "ccavenuepay" :
        paymentMethod === EXTRA_ORDER_TYPE_SPOTII ? "spotiipay" :
          paymentMethod === EXTRA_ORDER_TYPE_CASH ? "cashondelivery" : ""
    // return new Promise<BaseResponse>((resolve, reject) => {
    setProgress(true);
    const apiCallObj = {
      hashkey: hashKey,
      device_type: Platform.OS === 'android' ? 'android app' : 'ios app',
      customerId: userData.id,
      addressId: address.id,
      quoteId: quote_id,
      service_charges: totalPrice.serviceCharge,
      comments: comment,
      payment_method: apipaymentMethod,
      shipping_method: shipping,
      pickup_date: selectedDate,
      // pickup_time: selectedDate,
      spend_points: sliderValue,
      // transaction_id: "" 
    };
    console.log("apicall", apiCallObj);

    ApiHelper.placeOrder(apiCallObj).then((res: BaseResponse) => {
      console.log("place order-===========>", res);
      setProgress(false);
      showToast(res.specification)
      // resolve(res);
      // setProgress(false);
      // getCartList2()
    }).catch(err => toast("network_error", err, "info"))
    // });
  };

  const telrModalClose = () => {
    setTelrModalVisible(false)
    Alert.alert("Transaction aborted by user");
  }
  const didFailWithError = (message: any) => {
    setTelrModalVisible(false)
    Alert.alert(message);
  }
  const didPaymentSuccess = (response: any) => {
    console.log(response)
    setTelrModalVisible(false)
    Alert.alert(response.message);
  }



  const showTelrPaymentPage = () => {

    // if (billing_name_first == null || billing_name_first == "") {
    //   Alert.alert("Enter first name");
    //   return
    // } else if (billing_name_last == null || billing_name_last == "") {
    //   Alert.alert("Enter last name");
    //   return
    // } else if (tran_amount == null || tran_amount == "") {
    //   Alert.alert("Enter amount");
    //   return
    // }
    var deviceId = DeviceInfo.getDeviceId();
    console.log("deviceId", deviceId);
    var paymentRequest = {
      sdk_env: "dev",//prod//dev
      something_went_wrong_message: "Something went wrong",//  this message for suppose someitng is happen wrong with payment then you can config this one.
      store_id: "15996",
      key: "pQ6nP-7rHt@5WRFv",
      device_type: Platform.OS === "android" ? "Android" : "iOS",//Android
      device_id: deviceId,
      app_name: "TelrSDK",//enter app name
      app_version: "1.0",//app version
      app_user: "123456",//app user
      app_id: "102863o777",//app user id
      tran_test: "1", // 1=test, 0=production
      tran_type: "sale",//sale
      tran_class: "paypage",
      tran_cartid: `${Math.floor(Math.random() * 100) + 2} `,//enter cart id it shoud be unique for every transaction //1234567890
      tran_description: "Test Mobile API",// enter tran description
      tran_currency: "AED",
      tran_amount: totalPrice.grand_total.toFixed(2),
      tran_language: "en",
      tran_firstref: "",
      billing_name_title: "Mr",
      billing_name_first: userData.firstname,
      billing_name_last: userData.lastname,
      billing_address_line1: `${address.street},${address.city} `,
      billing_address_city: address.city,
      billing_address_region: address.city,
      billing_address_country: address.country_name,
      billing_custref: "001",
      billing_email: userData.email,
      billing_phone: address.telephone.replace("971", ""),
    }
    setPaymentRequest(paymentRequest)
    setTelrModalVisible(true)
  }

  const onSpotiiToken = (data: any) => {
    return {
      type: ActionTypes.SPOTII_TOKEN,
      data,
    };
  };

  // const spotiiAuthApiCall = () => {
  //   return new Promise<BaseResponse>((resolve, reject) => {
  //     const apiCallObj = {
  //       public_key: SPOTII_PUBLIC_KEY1,
  //       private_key: SPOTII_PRIVATE_KEY1,
  //     };

  //     ApiHelper.spotiiAuth(apiCallObj)
  //       .then((res: BaseResponse) => {
  //         console.log("spotii Auth Api res", res);
  //         dispatch(onSpotiiToken(res.token))
  //         spotiiCheckOutApiCall(res.token)
  //         resolve(res);
  //       })
  //       .catch((err) => {
  //         console.log("spotii auth api err", err);
  //         reject(err);
  //       });
  //   });
  // };

  // const spotiiAuthApiCall = () => {
  //   return new Promise<BaseResponse>((resolve, reject) => {
  //     const apiCallObj = {
  //       public_key: SPOTII_PUBLIC_KEY,
  //       private_key: SPOTII_PRIVATE_KEY,
  //     };
  //     axios.post(spotiiAuthURL, apiCallObj)
  //       .then((res: any) => {
  //         console.log("spotii Auth Api res", res);
  //         // dispatch(onSpotiiToken(res.token))
  //         spotiiCheckOutApiCall(res.data.token)
  //         resolve(res);
  //       })
  //       .catch((err: any) => {
  //         console.log("spotii auth api err", err);
  //         reject(err);

  //       })
  //     // ApiHelper.spotiiAuth(apiCallObj)
  //     //   .then((res: BaseResponse) => {
  //     //     console.log("spotii Auth Api res", res);
  //     //     dispatch(onSpotiiToken(res.token))
  //     //     spotiiCheckOutApiCall(res.token)
  //     //     resolve(res);
  //     //   })
  //     //   .catch((err) => {
  //     //     console.log("spotii auth api err", err);
  //     //     reject(err);
  //     //   });
  //   });
  // };

  // const spotiiCheckOutApiCall = async (token: string) => {
  //   const apiCallObj = {
  //     "reference": "1676367456898",
  //     "display_reference": "1676367456898",
  //     "discription": "Order #1676367456898",
  //     "total": "371.28",
  //     "currency": "AED",
  //     "confirm_callback_url": "https://dev.conektr.com/b2c/checkout/onepage/success/",
  //     "reject_callback_url": "https://dev.conektr.com/b2c/checkout/onepage/failure/",
  //     "order": {
  //       "tax_amount": "17.68",
  //       "shipping_amount": "0",
  //       "discount": 0,
  //       "customer": {
  //         "first_name": "Nimila",
  //         "last_name": "Jose",
  //         "email": "nimila@conektr.ae",
  //         "phone": "+971566414729"
  //       },
  //       "billing_address": {
  //         "first_name": "Nimila",
  //         "last_name": "Jose",
  //         "country": "AE",
  //         "phone": "+971566414729"
  //       },
  //       "shipping_address": {
  //         "first_name": "Nimila",
  //         "last_name": "Jose",
  //         "country": "AE",
  //         "phone": "+971566414729"
  //       },
  //       "lines": [
  //         {
  //           "sku": "HISPO-218-TEST",
  //           "title": "Marlboro Cigarette Red 1 X 10 Test Test",
  //           "quantity": 2,
  //           "price": "170",
  //           "currency": "AED",
  //           "image_url": "https://dev.conektr.com/pub/media/catalog/product/h/i/hispo-218.jpg"
  //         }
  //       ]
  //     }
  //   }
  //   await axios.post(`${ spotiiCheckOutURL } `, apiCallObj, {
  //     headers: {
  //       Accept: 'application/json',
  //       "Content-Type": 'application/json',
  //       "Authorization": `Bearer ${ token } `
  //     }
  //   }).then(response => console.log("spotii Check out Api res", response)).catch(err => console.log("spotii Check out api err", err))
  //   // console.log("Response", response);
  // }
  // const spotiiCheckOutApiCall = (token: string) => {
  //   console.log("token", token);
  //   return new Promise<BaseResponse>((resolve, reject) => {
  //     var lines: any[] = []

  //     for (let i = 0; i < cartList.length; i++) {
  //       const element = cartList[i];
  //       console.log("element: ", element);
  //       lines.push({
  //         sku: element.sku,
  //         title: element.name,
  //         quantity: element.qty,
  //         price: JSON.stringify(element.price),
  //         currency: "AED",
  //         image_url: element.small_image
  //       })
  //     }

  //     var order = {
  //       tax_amount: totalPrice.tax,
  //       shipping_amount: cartDetail.data.spotiipay.shipping_amount,
  //       discount: totalPrice.discount,
  //       customer: {
  //         first_name: userData.firstname,
  //         last_name: userData.lastname,
  //         email: userData.email,
  //         phone: `+ ${ userData.telephone } `
  //       },
  //       billing_address: {
  //         first_name: userData.firstname,
  //         last_name: userData.lastname,
  //         country: "AE",
  //         phone: `+ ${ userData.telephone } `,
  //         state: address.state
  //       },
  //       shipping_address: {
  //         first_name: userData.firstname,
  //         last_name: userData.lastname,
  //         country: "AE",
  //         phone: `+ ${ userData.telephone } `,
  //         state: address.state
  //       },
  //       lines: lines
  //     }

  //     // const apiCallObj = {
  //     //   "reference": "1676367456898",
  //     //   "display_reference": "1676367456898",
  //     //   "discription": "Order #1676367456898",
  //     //   "total": "371.28",
  //     //   "currency": "AED",
  //     //   "confirm_callback_url": "https://dev.conektr.com/b2c/checkout/onepage/success/",
  //     //   "reject_callback_url": "https://dev.conektr.com/b2c/checkout/onepage/failure/",
  //     //   "order": {
  //     //     "tax_amount": "17.68",
  //     //     "shipping_amount": "0",
  //     //     "discount": 0,
  //     //     "customer": {
  //     //       "first_name": "Nimila",
  //     //       "last_name": "Jose",
  //     //       "email": "nimila@conektr.ae",
  //     //       "phone": "+971566414729"
  //     //     },
  //     //     "billing_address": {
  //     //       "first_name": "Nimila",
  //     //       "last_name": "Jose",
  //     //       "country": "AE",
  //     //       "phone": "+971566414729"
  //     //     },
  //     //     "shipping_address": {
  //     //       "first_name": "Nimila",
  //     //       "last_name": "Jose",
  //     //       "country": "AE",
  //     //       "phone": "+971566414729"
  //     //     },
  //     //     "lines": [
  //     //       {
  //     //         "sku": "HISPO-218-TEST",
  //     //         "title": "Marlboro Cigarette Red 1 X 10 Test Test",
  //     //         "quantity": 2,
  //     //         "price": "170",
  //     //         "currency": "AED",
  //     //         "image_url": "https://dev.conektr.com/pub/media/catalog/product/h/i/hispo-218.jpg"
  //     //       }
  //     //     ]
  //     //   }
  //     // }

  //     const apiCallObj = {
  //       reference: new Date().getTime(),
  //       display_reference: new Date().getTime(),
  //       description: `Order #${ new Date().getTime() } `,
  //       total: totalPrice.grand_total.toFixed(2),
  //       currency: "AED",
  //       confirm_callback_url: spotiiConfirmCheckOutURL,
  //       reject_callback_url: spotiiFailCheckOutURL,
  //       order: order
  //     };
  //     console.log("log of order Lines", lines);
  //     console.log("spotii apiCallObj", apiCallObj);


  //     ApiHelper.spotiiCheckOut(apiCallObj, token)
  //       .then((res: BaseResponse) => {
  //         console.log("spotii Check out Api res", res);
  //         // navigation.navigate("spotiiwebview", { link: res.checkout_url });
  //         resolve(res);
  //       })
  //       .catch((err) => {
  //         console.log("spotii Check out api err", err);
  //         reject(err);
  //       });
  //   });
  // };

  const ccAvenuePayment = () => {
    console.log("call ccAvenuePayment");
    var num = Math.floor(Math.random() * 9999999) + 1;
    const payData = {
      'mId': MerchantParams.merchant_id,
      'accessCode': MerchantParams.access_code,
      'currency': MerchantParams.currency,
      'amount': totalPrice.grand_total.toFixed(2),
      'redirect_url': MerchantParams.redirect_url,
      'cancel_url': MerchantParams.cancel_url,
      'rsa_url': MerchantParams.rsa_url,
      'order_id': num.toString(),
      'customer_id': JSON.stringify(userData.id),
      'promo': promoCode,
      'merchantParam1': InitialParams.MERCHANT_PARAM1,
      'merchantParam2': InitialParams.MERCHANT_PARAM2,
      'merchantParam3': InitialParams.MERCHANT_PARAM3,
      'merchantParam4': InitialParams.MERCHANT_PARAM4,
      'merchantParam5': InitialParams.MERCHANT_PARAM5,
      'envType': "LIVE",
      'billing_name': userData.firstname,
      'billing_address': `${address.street},${address.city} `,
      'billing_country': address.country_name,
      'billing_state': address.city,
      'billing_city': address.city,
      'billing_telephone': address.telephone.replace("971", ""),
      'billing_email': userData.email,
      'shipping_name': userData.firstname,
      'shipping_address': `${address.street},${address.city} `,
      'shipping_country': address.country_name,
      'shipping_state': address.city,
      'shipping_city': address.city,
      'shipping_telephone': address.telephone.replace("971", ""),
      'siType': "",
      'siRef': "",
      'siSetupAmount': 'Y',
      'siAmount': "",
      'siStartDate': "",
      'siFreqType': 'days',
      'siFreq': "",
      'siBillCycle': "",
      'showAddress': true
    }

    console.log("pay Data is ", payData)

    CCAvenueModule.startPayment(payData,
      (response: any) => {
        console.log("ccAvenue response", response);

        // navigation.navigate('payment', { data: response }) 
      }
    )
    // navigation.navigate('PaymentStatus')
  }

  const disableDate = () => {
    for (let i = 0; i < selectDate.length; i++) {
      const element = selectDate[i];
      setSelectDate(selectDate[i].day);
    }
    return;
  }

  useEffect(() => {
    {
      quote_id === null || quote_id === 0
        ? console.log("Cart list is null")
        : getRewardPointsCasesapiCall();
    }
  }, []);

  const changeDate = (day: any) => {
    console.log("day--->", day);
    setSelectedDate(day.dateString);
  }
  console.log("selectDate", selectDate);
  console.log("selectedDate", selectedDate);

  useEffect(() => {
    console.log("zdfgdg");
    // }

    const select = Object.keys(selectDate)
    console.log("Selected date", select);
    var item = []
    for (let i = 0; i < select.length; i++) {
      const element = select[i];
      console.log("elementxvb", element);

      // if (selectedDate !== element) {
      //   console.log("call item Element");

      item.push(selectDate[element])
      // }
      console.log("select item", item);
      item.map((el) => {
        console.log("el=======>", el);

        if (el.selected === true) {
          console.log("render if");

          setSelectDate({ [element]: { disabled: false, selected: false }, [selectedDate]: { selected: true, selectedColor: BaseColor.yellowColor, selectedTextColor: 'black' } })
          // return;
        }
        else {
          console.log("render else");

          setSelectDate({ ...selectDate, [selectedDate]: { selected: true, selectedColor: BaseColor.yellowColor, selectedTextColor: 'black' } })
        }
      })
    }
  }, [selectedDate])

  return (
    <View style={[style.mainView, { backgroundColor: BaseColor.backGroundColor }]}>
      <SafeAreaView
        style={[style.mainView, {
          flex: 1,
          marginTop: StatusBar.currentHeight && StatusBar.currentHeight,
        }]}
      >
        <>
          <StatusBar
            translucent
            backgroundColor={BaseColor.purpleColor}
          // barStyle="dark-content"
          />
          <View
            style={{
              height: deviceHeight * 0.1,
              width: deviceWidth,
              backgroundColor: BaseColor.backGroundColor,
            }}
          >
            <View style={style.headerView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" color={"white"} size={25} />
                </TouchableOpacity>
                <View style={{ marginHorizontal: 15 }}>
                  <View
                    style={{
                      width: hp("20"),
                      flexDirection: "row",
                      alignItems: "center",
                      // justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: font(FontFamily.fontBold),
                        color: "white",
                        fontSize: getFontSize(20),
                      }}
                    >
                      Cart
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {cartList.length > 0 && <TouchableOpacity
                  style={{ position: "relative" }}
                  onPress={() => clearCartApiCall()}
                >
                  <Text
                    style={{
                      fontFamily: font(FontFamily.fontBold),
                      color: "white",
                      fontSize: getFontSize(18),
                    }}
                  >
                    Clear Cart
                  </Text>
                </TouchableOpacity>}
              </View>
            </View>
          </View>
          {console.log("cartDetail", cartDetail)}
          <View style={{ flex: 10, marginHorizontal: 10, backgroundColor: "#f5f5f5" }}>
            {cartList.length === 0 || quote_id === null || quote_id === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  marginHorizontal: 20,
                }}
              >
                <View style={{ marginVertical: 20 }}>
                  <Images.EmptyCart />
                </View>
                <Text
                  style={{
                    fontSize: getFontSize(20),
                    fontFamily: font(FontFamily.fontBold),
                  }}
                >
                  Your Cart is empty!
                </Text>
                <View style={{ marginVertical: 20 }}>
                  <Text
                    style={{
                      fontFamily: font(FontFamily.fontRegular),
                      fontSize: getFontSize(15),
                    }}
                  >
                    You have no items added in the Cart.
                  </Text>
                </View>
                <ButtonView
                  text="Add Products"
                  style={{ height: 40 }}
                  onPress={() => navigation.navigate("home2")}
                />
              </View>
            ) : (
              <ScrollView style={{ marginTop: 20 }}>
                {/* <TelrSdk backButtonText={"Back"} buttonBackStyle={styles.buttonBackStyle} buttonBackColor={styles.buttonBackColor} backButtonTextStyle={styles.backButtonTextStyle} paymentRequest={paymentRequest} telrModalVisible={telrModalVisible} telrModalClose={telrModalClose} didFailWithError={didFailWithError} didPaymentSuccess={didPaymentSuccess} /> */}
                <View>
                  <Text
                    style={[
                      theme.textView,
                      {
                        color: "black",
                        marginBottom: 10,
                      },
                    ]}
                  >
                    {totalItem > 1
                      ? `${totalItem} items in cart`
                      : `${totalItem} item in cart`}
                  </Text>
                  <FlatList
                    data={cartList}
                    renderItem={({ item }) => {
                      return (
                        // console.log("item +++++++++++++>>>item +++++++++++++>>>", item)
                        <CartItemExpand
                          item={item}
                          getCartList2={() => getCartList2()}
                          totalItem={totalItem}
                        />
                      )
                    }}
                  />
                </View>
                {/* <CartItemExpand getCartList2={() => getCartList2()} totalItem={totalItem} /> */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <Images.LocationIcon />
                    </View>
                    <View style={{ marginLeft: 10, width: scale(150) }}>
                      <Text
                        style={{
                          fontFamily: font(FontFamily.fontBold),
                          fontSize: getFontSize(14),
                        }}
                      >
                        Delivering To Store
                      </Text>
                      {address.street.length > 0 && (
                        <View>
                          <Text>{address.name}</Text>
                          <Text style={{}}>{address.street},</Text>
                          <Text>{address.city},</Text>
                          <Text>{address.country_name}</Text>
                          <Text>+{address.telephone}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() =>
                        navigation.navigate(
                          "manageaddress",
                          { id: 2 },
                          { addressId: selectedAddId }
                        )
                      }
                    >
                      <Text
                        style={{
                          color: BaseColor.yellowColor,
                          fontFamily: font(FontFamily.fontBold),
                        }}
                      >
                        Change
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity>
                  <View style={{
                    marginVertical: 20, backgroundColor: BaseColor.yellowColor,
                    // paddingHorizontal: 18,
                    borderRadius: 15,
                    height: 40,
                    width: 150,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}>
                    {/* {var text = `${ <Images.outOfDeliveryIcon /> } Delivery
        } ` */}
                    {shippingMethod === "Free Shipping" ?
                      <Images.outOfDeliveryIcon /> :
                      <Images.StorePickup />}
                    <Text style={{
                      marginHorizontal: 5,
                      color: "black",
                      fontSize: 15,
                      fontFamily: font(FontFamily.fontBold),
                    }}>
                      {shippingMethod === "Free Shipping" || shippingMethod === "" ? "Delivery" : shippingMethod}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={style.calendarContainer}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={[
                        calenderStyles.textStyle,
                        { fontSize: getFontSize(13), marginTop: 5 },
                      ]}
                    >
                      Choose Preferred Day for Delivery
                    </Text>
                  </View>
                  <Calendar
                    style={{ borderRadius: 80 }}
                    onDayPress={changeDate}
                    markedDates={selectDate}
                    // markedDates={
                    //   { [selectedDate]: { selected: true, selectedColor: BaseColor.yellowColor, selectedTextColor: 'black' } }}
                    // disabledByDefault={true}
                    selectedColor={BaseColor.yellowColor}
                    onDayLongPress={(day: any) => {
                      console.log('selected day', day);
                    }}
                    monthFormat={'MMMM yyyy'}
                    onMonthChange={(month: any) => {
                      console.log('month changed', month);
                    }}
                    disabledByDefault={true}
                    disableAllTouchEventsForDisabledDays={true}
                    hideArrows={false}
                    hideExtraDays={true}
                    disableMonthChange={false}
                    firstDay={1}
                    onPressArrowLeft={(subtractMonth: any) => subtractMonth()}
                    onPressArrowRight={(addMonth: any) => addMonth()}
                    enableSwipeMonths={true}
                    theme={{
                      todayTextColor: 'gray',
                      backgroundColor: BaseColor.yellowColor,
                      calendarBackground: BaseColor.purpleColor,
                      textSectionTitleColor: '#fff',
                      textSectionTitleDisabledColor: '#d9e1e8',
                      selectedDayBackgroundColor: '#fff',
                      selectedDayTextColor: 'Black',
                      dayTextColor: '#fff',
                      textDisabledColor: 'gray',
                      arrowColor: '#fff',
                      monthTextColor: '#fff',
                      textDayFontFamily: font(FontFamily.fontBold),
                      textMonthFontFamily: font(FontFamily.fontBold),
                      textDayHeaderFontFamily: font(FontFamily.fontBold),
                      textDayFontSize: 12,
                      textMonthFontSize: 12,
                      textDayHeaderFontSize: 12
                    }}
                  />

                </View>
                <Text style={[styles.textStyle, { marginTop: 20 }]}>
                  Delivery Instruction
                </Text>
                <TextInput
                  style={[styles.inputFieldView]}
                  cursorColor={BaseColor.purpleColor}
                  placeholder="e.g Please call before delivery"
                  placeholderTextColor={"black"}
                  value={comment}
                  onChangeText={setComment}
                />

                <Text style={styles.textStyle}>Promo Code</Text>
                <View
                  style={[
                    styles.inputFieldView,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    },
                  ]}
                >
                  <View style={{ marginRight: 10 }}>
                    <Images.PromoCodeIcon />
                  </View>
                  <TextInput
                    // style={styles.inputFieldView}
                    style={{
                      width: "70%",
                      fontFamily: font(FontFamily.fontBold),
                    }}
                    placeholder="Enter Promo Code"
                    placeholderTextColor={"black"}
                    cursorColor={BaseColor.purpleColor}
                    editable={isApply}
                    value={promoCode}
                    onChangeText={setPromoCode}
                  />
                  <View style={{ justifyContent: "center" }}>
                    <TouchableOpacity
                      onPress={() => removePromoCodeApiCall(promoCode)}
                    >
                      {isApply && (
                        <Text
                          style={{
                            color: BaseColor.purpleColor,
                            fontFamily: font(FontFamily.fontBold),
                          }}
                        >
                          Apply
                        </Text>
                      )}
                    </TouchableOpacity>

                    {isRemove && (
                      <TouchableOpacity
                        onPress={() => removePromoCodeApiCall(null)}
                      >
                        <Text
                          style={{
                            color: BaseColor.purpleColor,
                            fontFamily: font(FontFamily.fontBold),
                          }}
                        >
                          Remove
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {isSliderShow && pointsCanRedeem !== null && (
                  <View>
                    <View
                      style={[
                        style.cartItemList,
                        {
                          padding: 20,
                          flexDirection: "column",
                          backgroundColor: BaseColor.grayColor,
                        },
                      ]}
                    >
                      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between',backgroundColor: 'red'}}> */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <Images.RewardIcon width={40} height={40} />
                        </View>
                        <View style={{ marginRight: 15 }}>
                          <Text style={styles.textStyle}>
                            {cartDetail.reward_points} Conektr Points Available
                          </Text>
                          <Text>
                            you can use maximum {pointsCanRedeem.toFixed(2)} Points for
                            Order
                          </Text>
                        </View>
                      </View>
                      {/* </View> */}

                      {totalPrice.subTotal > 0 ?
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={[
                              style.textStyle,
                              { fontSize: getFontSize(16) },
                            ]}
                          >
                            0
                          </Text>
                          <Slider
                            style={{ width: 280 }}
                            minimumValue={0}
                            maximumValue={pointsCanRedeem}
                            minimumTrackTintColor={BaseColor.yellowColor}
                            maximumTrackTintColor={BaseColor.blackColor}
                            thumbTintColor={BaseColor.darkYellowColor}
                            value={sliderValue}
                            onValueChange={(value) =>
                              setSliderValue(Math.trunc(value))
                            }
                          />
                          <Text
                            style={[
                              style.textStyle,
                              { fontSize: getFontSize(16) },
                            ]}
                          >
                            {pointsCanRedeem}
                          </Text>
                        </View> : <View></View>}
                    </View>
                  </View>
                )}

                <Text style={styles.textStyle}>Select Payment Method</Text>
                <View style={{ marginTop: 20 }}>
                  <CreditPoint total={totalPrice.grand_total} />
                </View>

                {/* {paymentMethod === EXTRA_ORDER_TYPE_CREDIT_POINTS && */}
                {cartDetail.cart_items > 0 ?
                  <View style={styles.displayTotalView}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: font(FontFamily.fontBold),
                          fontSize: 16,
                        }}
                      >
                        Estimated Delivery Date
                      </Text>
                      <Text
                        style={{
                          fontFamily: font(FontFamily.fontBold),
                          fontSize: 16,
                        }}
                      >
                        {selectedDate}
                      </Text>
                    </View>
                    <View style={styles.dividerView}></View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text style={styles.totalText}>SubTotal</Text>
                        <Text style={styles.totalText}>Discount Amount</Text>
                        <Text style={styles.totalText}>Service Charges</Text>
                        <Text style={styles.totalText}>
                          Reward points Discount
                        </Text>
                        <Text style={styles.totalText}>Tax</Text>
                      </View>
                      <View>
                        <Text style={[styles.totalText, { textAlign: "right" }]}>
                          AED {totalPrice.subTotal.toFixed(2)}
                        </Text>
                        <Text style={[styles.totalText, { textAlign: "right" }]}>
                          AED {totalPrice.discount.toFixed(2)}
                        </Text>
                        <Text style={[styles.totalText, { textAlign: "right" }]}>
                          AED {totalPrice.serviceCharge.toFixed(2)}
                        </Text>
                        <Text style={[styles.totalText, { textAlign: "right" }]}>
                          AED {totalPrice.rewardPoint.toFixed(2)}
                        </Text>
                        <Text style={[styles.totalText, { textAlign: "right" }]}>
                          AED {totalPrice.tax.toFixed(2)}
                        </Text>
                      </View>
                      {/* } */}
                    </View>
                    <View style={styles.dividerView}></View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.textStyle}>Total</Text>
                      <Text style={styles.textStyle}>
                        AED {totalPrice.grand_total.toFixed(2)}
                      </Text>
                    </View>
                  </View> : <View></View>}
                {/* } */}

                <View style={{ marginBottom: 20 }}>
                  <ButtonView
                    onPress={() =>
                      isCheckOutBtn === false ? "" :
                        paymentMethod === EXTRA_ORDER_TYPE_CASH ? placeOrderApiCall() :
                          paymentMethod === EXTRA_ORDER_TYPE_SPOTII ? showTelrPaymentPage() :
                            paymentMethod === EXTRA_ORDER_TYPE_CARD ? ccAvenuePayment() : ""
                    }
                    // onPress={() => placeOrderApiCall()}
                    text={`Buy ${totalItem} item for AED ${totalPrice.grand_total.toFixed(
                      2
                    )
                      }`}
                    style={{
                      backgroundColor:
                        isCheckOutBtn === false
                          ? BaseColor.grayColor
                          : BaseColor.yellowColor,
                    }}
                  // onPress={() => placeOrderApiCall()}
                  />
                </View>
              </ScrollView>
            )}
          </View>
          {isProgress && <ProgressView />}
        </>
      </SafeAreaView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  textStyle: {
    color: "black",
    fontFamily: font(FontFamily.fontBold),
    fontSize: getFontSize(15),
  },
  deleteButtonView: {
    backgroundColor: BaseColor.yellowColor,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: scale(35),
  },
  inputFieldView: {
    fontFamily: font(FontFamily.fontBold),
    borderColor: BaseColor.purpleColor,
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    height: scale(50)
  },
  displayTotalView: {
    // height: hp(14),
    width: "97%",
    flex: 1,
    marginVertical: scale(30),
    marginHorizontal: scale(5),
    // flexDirection: 'row',
    justifyContent: "space-between",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowColor: "#000",
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10
  },
  dividerView: {
    borderTopWidth: 0.5,
    borderTopColor: BaseColor.dividerColor,
    marginVertical: 10,
  },
  totalText: {
    fontFamily: font(FontFamily.fontRegular),
  },
  backgroundStyle: {
    backgroundColor: 'white',
    flex: 1
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
    margin: 22
  },
  telrTextStyle: {
    color: "#2196F3",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40,
    paddingTop: 20,
    marginBottom: 30,
  },
  buttonPay: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonPayment: {
    backgroundColor: "#2196F3",
    marginTop: 20,
  },
  payButtonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  buttonBackStyle: {
    borderRadius: 10,
    padding: 5,
    margin: 5,
    elevation: 2,
    width: 80,
  },
  buttonBackColor: {
    backgroundColor: "#2196F3",
  },
  backButtonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  inputTextStyle: {
    marginTop: 10,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 14,
  },
  input: {
    marginTop: 10,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});
