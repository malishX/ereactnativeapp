import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import React from "react";
import { Images } from "../../Images";
import useStyles from "./style";
import { useState } from "react";
import { OtpVerifyRequestBody, RegisterResponse } from "../../services";
import { useDispatch } from "react-redux";
import { ActionTypes, AuthActions } from "../../action";
// import { toastController } from "utils";
import Modal from "react-native-modal/dist/modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useEffect } from "react";
import useTheme from "../../theme";
import Bg from "../../assets/svgImage/SigninBg.svg";
import VerifyBg from "../../assets/svgImage/verifyOtp.svg";
import Demo1 from "../../assets/svgImage/splash screen-2 bg.svg";
import { ButtonView } from "../../components";
import ProgressView from "../../components/Organisms/progressView";
import getHooks from "../../hooks";
import { verifyOTPURL } from "../../services/Constants";
import api from "../../services/Common/Api";
import { toastController } from "../../utils/toastController";
import { font, FontFamily } from "../../config";

const VerifyOTP = ({ navigation, route }: any) => {
  const [otpCode, setOTPCode] = useState("");
  const [isShowPandingModal, setShowPandingModal] = useState(false);
  const [isShowRejectModal, setShowRejectModal] = useState(false);
  const [isProgress, setProgress] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(45);

  console.log("otpCode", otpCode);
  const hooks = getHooks();
  const styles = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { toast } = toastController();
  console.log("route", route);
  // useEffect(() => {
  //     verifyCode === "1234" ? navigation.navigate("profile") : <View></View>
  // })
  const user = hooks.user && hooks.user;
  console.log("user", user);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const manageValidation = () => {
    // navigation.navigate("profile")
    if (!otpCode) {
      toast("required_field", "Please enter OTP", "info");
      return;
    }
    otpVerifyApiCall();
  };

  const onLogin = (data: any) => {
    console.log("login Data", data);

    return {
      type: ActionTypes.REGISTER,
      data,
    };
  };

  const otpVerifyApiCall = async () => {
    // const requestBody = {
    //     mobile: "971" + route.params.mobile,
    //     otp: otpCode,
    // };
    setProgress(true);
    const formData = new FormData();
    formData.append("mobile", "971" + route.params.mobile);
    formData.append("otp", otpCode);
    const res = await api.post(`${verifyOTPURL}`, formData);
    console.log("Login res->", res);
    if (res.data.success === 1) {
      dispatch(onLogin(res.data));
      setProgress(false);
      res.data.data === null
        ? navigation.navigate("profile", { mobile: route.params.mobile })
        : res.data.data.customer_status === 1
          ? setShowPandingModal(true)
          : res.data.data.customer_status === 3
            ? setShowRejectModal(true)
            : navigation.navigate("home");
    } else if (res.data.success === 0) {
      toast("Msg", res.data.specification, "info");
      setProgress(false)
    } else {
      toast("network_error", "network_msg", "info");
    }
    // setProgress(true);
    // dispatch(
    //     AuthActions.OtpVerify(requestBody, (response) => {
    //         console.log("otp Verification Response-->", response);
    //         if (response.success === 0) {
    //             toast("error", response.specification, "info")
    //             return;
    //         }

    //         if (response && response.success === 1) {
    //             setProgress(false);
    //             console.log("token setting");
    //             // navigation.navigate("addressdetail")
    //             // USER_TOKEN.set(response.token, "");
    //             response.data === null ?
    //                 navigation.navigate("profile", { mobile: route.params.mobile }) :
    //                 response.data.customer_status === 1 ?
    //                     setShowPandingModal(true) :
    //                     response.data.customer_status === 3 ?
    //                         setShowRejectModal(true) :
    //                         navigation.navigate("home")
    //         } else {
    //             toast("network_error", "network_msg", "info")
    //         }
    //     })
    // );
  };

  return (
    <View style={theme.mainView}>
      <View
        style={{
          flex: 4,
          alignItems: "center",
        }}
      >
        <Bg />
      </View>
      <View style={styles.verifyImg}>
        <VerifyBg />
      </View>
      <View style={{ flex: 6, alignItems: "center" }}>
        <View style={[styles.SigninView]}>
          <Text
            style={[styles.text, { fontFamily: font(FontFamily.fontBold) }]}
          >
            Verify Mobile Number
          </Text>
          <Text
            style={[
              styles.textDec,
              { fontFamily: font(FontFamily.fontRegular) },
            ]}
          >
            We have sent a 4 digit code to{" "}
            <Text style={{ color: "#EEB417" }}>+971-{route.params.mobile}</Text>
            , please enter it below to complete verification.
          </Text>
          <OTPInputView
            style={styles.otpView}
            pinCount={4}
            // onCodeChanged={(code) => {
            //   setOTPCode(code);
            // }}
            autoFocusOnLoad={true}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code) => {
              setOTPCode(code);
            }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontFamily: font(FontFamily.fontRegular),
                }}
              >
                Message not received?
              </Text>
            </View>
            <View>
              {seconds > 0 || minutes > 0 ? (
                <Text
                  style={{
                    color: "white",
                    fontFamily: font(FontFamily.fontBold),
                  }}
                >
                  {" "}
                  Resend in{" "}
                  <Text>
                    {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </Text>
                </Text>
              ) : (
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginStart: 5,
                    fontFamily: font(FontFamily.fontBold),
                  }}
                  onPress={() => {
                    setSeconds(5);
                  }}
                >
                  Resend OTP
                </Text>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("signin")}>
            <Text
              style={{
                color: "white",
                marginTop: 10,
                textDecorationLine: "underline",
                fontFamily: font(FontFamily.fontRegular),
              }}
            >
              Use Different Mobile Number
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: 50,
              // width: "70%",
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <ButtonView text="Verify" onPress={() => manageValidation()} />
          </View>
        </View>
      </View>
      <Modal
        style={{ margin: 15 }}
        isVisible={isShowPandingModal}
        useNativeDriver={true}
        hideModalContentWhileAnimating
        onBackdropPress={() => setShowPandingModal(false)}
      >
        <View
          style={{
            display: "flex",
            width: "100%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            paddingHorizontal: 10,
          }}
        >
          <View style={{ justifyContent: "center", padding: 20 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                fontFamily: "metropolis",
              }}
            >
              Your account approval process is in pending, please try again
              later!
            </Text>
          </View>
          <View></View>
          <View
            style={{
              flexDirection: "row",
              paddingBottom: hp("3%"),
              paddingHorizontal: wp("10%"),
            }}
          >
            <ButtonView text="Ok" onPress={() => setShowPandingModal(false)} />
          </View>
        </View>
      </Modal>
      <Modal
        style={{ margin: 15 }}
        isVisible={isShowRejectModal}
        useNativeDriver={true}
        hideModalContentWhileAnimating
        onBackdropPress={() => setShowRejectModal(false)}
      >
        <View
          style={{
            display: "flex",
            width: "100%",
            // height: "20%",
            backgroundColor: "white",
            // alignItems: "center",
            // flex:1,
            justifyContent: "center",
            alignItems: "center",
            // alignItems:'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            paddingHorizontal: 10,
          }}
        >
          <View style={{ justifyContent: "center", padding: 20 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                fontFamily: "metropolis",
              }}
            >
              Your account has been rejected, please contact support!
            </Text>
            {/* <Text>{showData.time}</Text> */}
          </View>
          <View></View>
          <View
            style={{
              flexDirection: "row",
              paddingBottom: hp("3%"),
              paddingHorizontal: wp("10%"),
            }}
          >
            {/* <ButtonView
                            text="Decline"
                            isBordered
                        /> */}
            {/* <View style={{ flex: 0.2 }}></View> */}
            <ButtonView text="Ok" onPress={() => setShowRejectModal(false)} />
          </View>
        </View>
      </Modal>
      {isProgress && <ProgressView />}
    </View>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({});
