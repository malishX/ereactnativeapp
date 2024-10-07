import React, { useEffect, useState } from "react";
import { Image, InteractionManager, Platform, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";

import useTheme from "../../theme";
import useStyles from "./style";

import Bg from "../../assets/svgImage/SigninBg.svg";
import VerifyBg from "../../assets/svgImage/verifyBg.svg";
import { ButtonView } from "../../components";
import ProgressView from "../../components/Organisms/progressView";
import { Images } from "../../Images";
import api from "../../services/Common/Api";
import { sendOtpURL } from "../../services/Constants";
import { showToast, toastController } from "../../utils/toastController";
import { BaseColor, font, FontFamily, getFontSize } from "../../config";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { BaseResponse } from "../../services";
import ApiHelper from "../../services/apiHelper";

const Signin = ({ navigation }: any) => {
  const styles = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { toast } = toastController();

  const [mobile, setMobile] = useState<string | undefined>("");
  const [isProgress, setProgress] = useState<boolean>(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setProgress(false);
    });
  }, []);

  // const registerApiCall = async () => {
  //   setProgress(true);
  //   const formData = new FormData();
  //   formData.append("mobile", "971" + mobile);
  //   formData.append("event", "register");
  //   const res = await api.post(`${sendOtpURL}`, formData);
  //   console.log("res", res);
  //   if (res.data.success === 200) {
  //     setProgress(false);
  //     navigation.navigate("otpverify", { mobile: mobile });
  //     // showToast(res.statusText)
  //   } else {
  //     showToast(res.data.specification);
  //     setProgress(false);
  //   }
  // };

  // const registerApiCall = async () => {
  //   return await new Promise<BaseResponse>((resolve, reject) => {
  //     const apiCallObj = {
  //       mobile: "971" + mobile,
  //       event: "register",
  //     };
  //      ApiHelper.sendOTP(apiCallObj)
  //       .then((res: BaseResponse) => {
  //         console.log("register res", res);
  //         showToast(res.specification);
  //         navigation.navigate("otpverify", { mobile: mobile });
  //         // setOrderDetails(res);
  //         resolve(res);
  //       })
  //       .catch((err) => {
  //         console.log("Get order details err", err);
  //         reject(err);
  //       });
  //   });
  // };
  const registerApiCall = async () => {
    setProgress(true);

    const apiCallObj = {
      mobile: "971" + mobile,
      event: "register",
    };
    console.log("apiCallObj", apiCallObj);

    let response = await ApiHelper.sendOTP(apiCallObj).then((res: BaseResponse) => {
      console.log("ragister api Call-===========>", res);
      if (res.success === 1) {
        setProgress(false);
        Platform.OS === "android" && showToast(res.specification);
        navigation.navigate("otpverify", { mobile: mobile });
        // dispatch(onAStaticValue(res.data));
      } else if (res.success === 0) {
        Platform.OS === "android" && showToast(res.specification);
        setProgress(false);
      } else {
        setProgress(false);
        Platform.OS === "android" && showToast("Please check your Network");
      }
    }).then(() => console.log("res")).catch((error) => console.log("error", error));

  };

  const manageValidation = () => {
    // navigation.navigate("otpverify", { mobile: mobile });
    if (!mobile) {
      toast("Required Field", "please enter valid mobile number", "info");
      return;
    }
    // navigation.navigate("addressdetail")
    // const formData = new FormData();
    // formData.append("mobile", "971" + mobile);
    // formData.append("event", "register");
    registerApiCall();
    // if (response && response.status === 200) {
    //   navigation.navigate("otpverify", { mobile: mobile });
    // } else {
    //   toast(("network_error"), "Please Check Your Network", "info")
    // }
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
      <View style={{ position: "absolute" }}>
        <VerifyBg />
      </View>
      <View style={{ flex: 6, alignItems: "center" }}>
        <View style={styles.SigninView}>
          <View style={{ marginVertical: 0 }}>
            <Text style={[styles.text, { paddingBottom: 20, fontFamily: font(FontFamily.fontBold) }]}>
              Hey, What's Your Number ?
            </Text>
            <Text style={[styles.textDec, { fontFamily: font(FontFamily.fontRegular) }]}>
              Whether you're creating an account or signing back in, let's start
              with your number.
            </Text>
          </View>
          <View style={styles.inputFieldView}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={Images.country}
                style={{ width: 25, height: 25 }}
              />
              <Text style={styles.inputText}> +971 </Text>
              <View
                style={{
                  height: 30,
                  borderWidth: 0.5,
                  borderColor: "#D6D6D6",
                }}
              />

              <View style={{ flex: 1 }}>
                <TextInput
                  style={{
                    color: BaseColor.whiteColor,
                    // flex: 1,
                    fontSize: getFontSize(15),
                    fontFamily: "Metropolis-Regular",
                    marginLeft: 10,
                    borderWidth: 1,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderTopWidth: 0,
                    borderColor: 'white',
                  }}
                  value={mobile}
                  onChangeText={setMobile}
                  placeholder={"Mobile Number"}
                  allowFontScaling={false}
                  keyboardType="numeric"
                  placeholderTextColor={'white'}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              height: 50,
              // width: "70%",
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <ButtonView
              text="Continue"
              onPress={() => manageValidation()}
            />
          </View>
        </View>
      </View>
      {isProgress && <ProgressView />}
    </View>
  );
};

export default Signin;
