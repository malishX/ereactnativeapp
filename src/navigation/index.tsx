import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Images } from "../Images";
import AddressDetail from "../screen/addressDetail/AddressDetail";
import Location from "../screen/addressDetail/Location";
import Signin from "../screen/Auth/Signin";
import SignInHome from "../screen/Auth/SignInHome";
import VerifyOTP from "../screen/Auth/VerifyOTP";
import Account from "../screen/Home/Account";
import Cart from "../screen/Home/Cart";
import Home from "../screen/Home/Home";
import Basket from "../screen/Home/HomeSubScreen/Account/Basket";
import Favorite from "../screen/Home/HomeSubScreen/Account/Favorite";
import ManageAdd from "../screen/Home/HomeSubScreen/Account/ManageAdd";
import ProfileDetail from "../screen/Home/HomeSubScreen/Account/ProfileDetail";
import CategoryDetail from "../screen/Home/HomeSubScreen/Categories/CategoryDetail";
import ProductDetail from "../screen/Home/HomeSubScreen/HomeScreen/ProductDetail";
import MyOrders from "../screen/Home/HomeSubScreen/Orders/MyOrders";
import SearchView from "../screen/Home/HomeSubScreen/Search/SearchView";
import Orders from "../screen/Home/Orders";
import Profile from "../screen/profile/Profile";
import Index from "../SplashScreen/Index";
import { useStyles } from "./styles";

const Navigation = () => {
  const isLogin = useSelector((state: any) => state.auth.isLogin);
  const styles = useStyles();
  const [isLoading, setLoading] = useState(true);

  const AuthStack = createStackNavigator();
  const MainStack = createStackNavigator();
  const BottomTab = createBottomTabNavigator();
  const LoadingStack = createStackNavigator();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  const LoadingNavigation = () => {
    return (
      <LoadingStack.Navigator>
        <LoadingStack.Screen name="Splash" component={Index} />
      </LoadingStack.Navigator>
    );
  };

  const AuthNavigation = () => {
    return (
      <AuthStack.Navigator>
        {isLoading ? (
          <AuthStack.Screen
            name="Splash"
            component={Index}
            options={{ headerShown: false }}
          />
        ) : (
          <AuthStack.Screen
            name="signinHome"
            component={SignInHome}
            options={{ headerShown: false }}
          />
        )}
        <AuthStack.Screen
          name="signin"
          component={Signin}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="otpverify"
          component={VerifyOTP}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="addressdetail"
          component={AddressDetail}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="location"
          component={Location}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="manageaddress"
          component={ManageAdd}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="home"
          component={MainNavigation}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="orders"
          component={Orders}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  };

  const BottomTabNavigator = () => {
    return (
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabbarView,
          tabBarActiveTintColor: "white",
          tabBarActiveBackgroundColor: "#693A9C",
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
        <BottomTab.Screen
          name="home2"
          component={Home}
          options={{
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarLabel: "Home",
            tabBarIcon: () => <Images.HomeIcon width={25} height={22} />,
          }}
        />
        <BottomTab.Screen
          name="orders"
          component={Orders}
          options={{
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarLabel: "Orders",
            headerShown: false,
            tabBarIcon: () => <Images.OrderIcon width={30} height={22} />,
          }}
        />
        <BottomTab.Screen
          name="cart"
          component={Cart}
          options={{
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarLabel: "Cart",
            headerShown: false,
            tabBarIcon: () => <Images.CartIcon width={30} height={20} />,
          }}
        />
        <BottomTab.Screen
          name="account"
          component={Account}
          options={{
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarLabel: "Account",
            headerShown: false,
            tabBarIcon: () => <Images.AccountIcon width={30} height={22} />,
          }}
        />
      </BottomTab.Navigator>
    );
  };

  const MainNavigation = () => {
    return (
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
      <MainStack.Screen name="categorydetail" component={CategoryDetail} />
      <MainStack.Screen name="searchdetail" component={SearchView} />
      <MainStack.Screen name="myOrders" component={MyOrders} />
      <MainStack.Screen name="manageaddress" component={ManageAdd} />
      <MainStack.Screen name="profiledetail" component={ProfileDetail} />
      <MainStack.Screen name="favorite" component={Favorite} />
      <MainStack.Screen name="basket" component={Basket} />
      <MainStack.Screen name="location" component={Location} />
      <MainStack.Screen name="addressdetail" component={AddressDetail} />
    </MainStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {isLogin ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
