import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

import useTheme from "../../theme";
import useStyles from "./Style";
import VerifyOTP from "../Auth/VerifyOTP";
import AddressDetail from "../addressDetail/AddressDetail";
import Orders from "./Orders";
import Cart from "./Cart";
import Account from "./Account";
import Home from "./Home";

import { ImageView } from "../../components";
import ProductDetail from "./HomeSubScreen/HomeScreen/ProductDetail";
import CategorySeeAll from "./HomeSubScreen/Categories/CategorySeeAll";
import SearchView from "./HomeSubScreen/Search/SearchView";
import { Images } from "../../Images";
import MyOrders from "./HomeSubScreen/Orders/MyOrders";
import ManageAdd from "./HomeSubScreen/Account/ManageAdd";
import ProfileDetail from "./HomeSubScreen/Account/ProfileDetail";
import Favorite from "./HomeSubScreen/Account/Favorite";
import Basket from "./HomeSubScreen/Account/Basket";
import Location from "../addressDetail/Location";
import { BaseColor, font, FontFamily } from "../../config";
import getHooks from "../../hooks";
import Preferences from "../../services/preferences";
import CreditForm from "./HomeSubScreen/Account/CreditForm/CreditForm";
import CategoryDetail from "./HomeSubScreen/Categories/CategoryDetail";
import CategoryFilterScreen from "./HomeSubScreen/Categories/CategoryFilterScreen";
import WebView from "./HomeSubScreen/HomeScreen/WebView";
import OneSignal from "react-native-onesignal";
import DeviceInfo from "react-native-device-info";
import { BaseResponse } from "../../services";
import ApiHelper from "../../services/apiHelper";
import MyRewardPointsScreen from "./HomeSubScreen/Account/MyRewardPointsScreen";
import TrackOrderScreen from "../Orders/TrackOrder/TrackOrderScreen";
import RewardHelpScreen from "./HomeSubScreen/Account/RewardHelpScreen";
import AdditionalServiceScreen from "./HomeSubScreen/Account/AdditionalServiceScreen";
import TermsAndConditionSceen from "./HomeSubScreen/Account/CreditForm/TermsAndConditionSceen";
import CreditNextScreen from "./HomeSubScreen/Account/CreditForm/CreditNextScreen";
import SignatureForm from "./HomeSubScreen/Account/CreditForm/SignatureForm";
import CreditScreen from "./HomeSubScreen/Account/CreditScreen";
import SpotiiWebView from "./HomeSubScreen/Cart/SpotiiWebView";
import PaymentStatusScreen from "./HomeSubScreen/PaymentStatusScreen";
import HomeScreen from "./HomeSubScreen/HomeScreen";
import OrderDetailsScreen from "../Orders/OrderDetails/OrderDetailsScreen";

const theme = useTheme();
const style = useStyles();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  headerMode: string | undefined;
};

export function BottomTabNavigator({ navigation }: { navigation: any }) {
  const hooks = getHooks();
  const cartList = hooks.cartList;
  const userData = hooks.user;

  const [budge, setBudge] = useState(0);
  const [notificationtoken, setToken] = useState<string>("");
  const [isProgress, setProgress] = useState<Boolean>(false);
  const budgecount = () => {
    var total = 0;
    for (var i = 0; i < cartList.length; i++) {
      total = total + cartList[i].qty;
    }
    setBudge(total);
    return console.log("total", total);
  };

  useEffect(() => {
    budgecount();
  });

  const onSignalApiCall = async (deviceId: string, player_id: string) => {
    setProgress(true);
    const apiCallObj = {
      app_type: Platform.OS === "android" ? 1 : 2,
      user_id: userData.id,
      token: player_id,
      device_id: deviceId,
    };

    ApiHelper.getoneSignalToken(apiCallObj).then((res: BaseResponse) => {
      console.log("one signal api call", res);
      if (res.success === 1) {
        // setRecentlyViewed(res.result);
        setProgress(false);
      } else {
        setProgress(false);
      }
    });
  };

  const getToken = async (deviceId: string) => {
    var tokenData: any;
    tokenData = await OneSignal.getDeviceState();
    const player_id = tokenData.userId;
    setToken(player_id);
    console.log("player_id", player_id);
    onSignalApiCall(deviceId, player_id);
  };

  useEffect(() => {
    var deviceId = DeviceInfo.getDeviceId();
    console.log("deviceId", deviceId);

    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("97d540cf-0980-4a4f-aa50-09e6f89352b5");
    OneSignal.promptForPushNotificationsWithUserResponse();
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log("OneSignal: notification opened:", notification);
    });
    getToken(deviceId);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: style.tabbarView,
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: "#5e348c",
        tabBarItemStyle: {
          borderRadius: 10,
          marginHorizontal: 8,
          marginVertical: 5,
          padding: 7,
          // fontSize: 40
        },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tab.Screen
        name="home2"
        component={Home}
        options={{
          tabBarLabelStyle: style.tabBarLabelStyle,
          tabBarLabel: "Home",
          tabBarIcon: () => <Images.HomeIcon width={25} height={22} />,
        }}
      />
      <Tab.Screen
        name="orders"
        component={Orders}
        options={{
          tabBarLabelStyle: style.tabBarLabelStyle,
          tabBarLabel: "Orders",
          headerShown: false,
          tabBarIcon: () => <Images.OrderIcon width={30} height={22} />,
        }}
      />

      <Tab.Screen
        name="cart"
        component={Cart}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ item: undefined }),
        })}
        options={{
          tabBarStyle: { display: "none" },
          tabBarLabelStyle: style.tabBarLabelStyle,
          tabBarLabel: "My Cart",
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: () => (
            <View style={{ position: "relative" }}>
              {cartList.length > 0 && (
                <View
                  style={{
                    backgroundColor: BaseColor.yellowColor,
                    position: "absolute",
                    width: 15,
                    height: 15,
                    top: -9,
                    left: 20,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      fontFamily: font(FontFamily.fontBold),
                    }}
                  >
                    {budge}
                  </Text>
                </View>
              )}
              <Images.CartIcon width={30} height={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="account"
        component={Account}
        options={{
          tabBarLabelStyle: style.tabBarLabelStyle,
          tabBarLabel: "Account",
          headerShown: false,
          tabBarIcon: () => <Images.AccountIcon width={30} height={22} />,
        }}
      />
    </Tab.Navigator>
  );
}
const Main = () => {
  // const theme = useTheme()
  // const style = useStyles()
  // const MainStack = createStackNavigator();
  // const Tab = createBottomTabNavigator();

  const userData = useSelector((state: any) => state.auth);
  console.log("userData", userData);

  return (
    <>
      <StatusBar backgroundColor={"transparent"} translucent={true} />
      <MainStack.Navigator
        headerMode="none"
        initialRouteName="bottomtabnavigator"
      >
        <MainStack.Screen
          name="bottomtabnavigator"
          component={BottomTabNavigator}
        // options={{ headerShown: false }}
        />
        <MainStack.Screen name="productdetail" component={ProductDetail} />
        <MainStack.Screen name="categoryseeall" component={CategorySeeAll} />
        <MainStack.Screen name="categorydetail" component={CategoryDetail} />
        <MainStack.Screen
          name="categoryfilter"
          component={CategoryFilterScreen}
        />
        <MainStack.Screen name="searchdetail" component={SearchView} />
        <MainStack.Screen name="myOrders" component={Orders} />
        <MainStack.Screen name="manageaddress" component={ManageAdd} />
        <MainStack.Screen name="profiledetail" component={ProfileDetail} />
        <MainStack.Screen name="favorite" component={Favorite} />
        <MainStack.Screen name="basket" component={Basket} />
        <MainStack.Screen name="location" component={Location} />
        <MainStack.Screen name="addressdetail" component={AddressDetail} />
        <MainStack.Screen name="creditform" component={CreditForm} />
        <MainStack.Screen name="webview" component={WebView} />
        <MainStack.Screen name="myrewards" component={MyRewardPointsScreen} />
        <MainStack.Screen name="trackOrder" component={TrackOrderScreen} />
        <MainStack.Screen name="help" component={RewardHelpScreen} />
        <MainStack.Screen name="additionalservice" component={AdditionalServiceScreen} />
        <MainStack.Screen name="termsandconditions" component={TermsAndConditionSceen} />
        <MainStack.Screen name="creditnext" component={CreditNextScreen} />
        <MainStack.Screen name="signatureform" component={SignatureForm} />
        <MainStack.Screen name="credit" component={CreditScreen} />
        <MainStack.Screen name="spotiiwebview" component={SpotiiWebView} />
        <MainStack.Screen name="PaymentStatus" component={HomeScreen} />
        <MainStack.Screen name="payment" component={PaymentStatusScreen}
          options={{ title: 'Payment Status' }} />
        <MainStack.Screen name='orderdetail' component={MyOrders} />
      </MainStack.Navigator>
    </>
  );
};

export default Main;
