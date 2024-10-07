import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import Bg from "../../assets/svgImage/SigninBg.svg";
import Logo from "../../assets/svgImage/logo.svg";
import Men from "../../assets/svgImage/createAccount.svg";
import useStyles from "./style";
import useTheme from "../../theme";
import { ButtonView } from "../../components";
import Geolocation from "react-native-geolocation-service";
import { ActionTypes } from "../../action";
import { useDispatch } from "react-redux";
import getHooks from "../../hooks";
import useIsReady from "../../utils/useIsReady";
import { Images } from "../../Images";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { getFontSize } from "../../config";
import { request, PERMISSIONS } from 'react-native-permissions';

const SignInHome = ({ navigation }: any) => {
  const style = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const hooks = getHooks();
  console.log("hooks.location", hooks.location);
  console.log("userData", hooks.user);
  console.log("userLogin", hooks.isLogin);

  const [location, setLocation] = useState<Geolocation.GeoPosition | undefined>(
    undefined
  );

  const OnLocation = (data: Geolocation.GeoPosition) => {
    return {
      type: ActionTypes.LOCATION,
      data,
    };
  };
  const getLocation = () => {
    const result = requestLocationPermission(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    result.then((res) => {
      console.log("res is:", res);
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            dispatch(OnLocation(position));
            setLocation(position);
          },
          (error: Geolocation.GeoError) => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(undefined);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    });
    console.log(location);
  };
  const requestLocationPermission = async (permissions: any) => {
    try {
      const getPermission = await request(permissions)
      console.log("result~~~~~~>", getPermission)
      if (getPermission === 'granted') {
        console.log("You can use Geolocation");
        return true;
      } else {
        console.log("You cannot use Geolocation");
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  // const requestLocationPermission = async () => {
  //   if (Platform.OS === 'ios') {
  //     Geolocation.requestAuthorization();
  //     getGeoLocation();
  //   } else {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: "Geolocation Permission",
  //           message: "Can we access your location?",
  //           buttonNeutral: "Ask Me Later",
  //           buttonNegative: "Cancel",
  //           buttonPositive: "OK",
  //         }
  //       );
  //       console.log("granted", granted);
  //       if (granted === "granted") {
  //         console.log("You can use Geolocation");
  //         return true;
  //       } else {
  //         console.log("You cannot use Geolocation");
  //         return false;
  //       }
  //     } catch (err) {
  //       return false;
  //     }
  //   }
  // };
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={style.mainView}>
      {/* <View> */}
      <Images.Bg height="100%" preserveAspectRatio="xMinYMin slice" width="100%" />

      <View style={style.logo}>
        <Logo height={75} width={200} />
        <Text style={{
          fontFamily: "Metropolis-Bold", fontSize: getFontSize(20),
          color: "white",
          textAlign: "center",
          marginVertical: 10
        }}
        >
          Your Grocery's <Text style={{ color: "#EEB417" }}>Best Friend</Text>
        </Text>
      </View>

      <View style={{ alignItems: "center", justifyContent: 'center', marginTop: heightPercentageToDP('25'), position: 'absolute' }}>
        <Bg />
        <View
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            alignItems: "center",
          }}
        >
          <Men />
        </View>
        <View
          style={{
            height: 50,
            width: "70%",
            alignItems: "center",
          }}
        >
          <ButtonView
            text="Create Account or Sign-in"
            onPress={() => navigation.navigate("signin")}
          />
        </View>
      </View>
    </View>
    // </View>
  );
};

export default SignInHome;
