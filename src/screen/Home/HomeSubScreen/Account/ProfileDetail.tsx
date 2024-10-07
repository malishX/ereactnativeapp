import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, TextInput, Image, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import useStyles from "../../Style";
import { Images } from "../../../../Images";
import { BaseColor, font, FontFamily, getFontSize } from "../../../../config";
import useTheme from "../../../../theme";
import { ButtonView } from "../../../../components";
import getHooks from "../../../../hooks";
import Preferences from "../../../../services/preferences";
import { toastController } from "../../../../utils";
import ApiHelper from "../../../../services/apiHelper";
import { BaseResponse } from "../../../../services";
import ProgressView from "../../../../components/Organisms/progressView";
import { BottomModalProvider } from "react-native-bottom-modal";
import BottomModal from "../../../../components/Atoms/BottomModal";
import { showToast } from "../../../../utils/toastController";
import OTPInputView from "@twotalltotems/react-native-otp-input";
// import Modal from "react-native-modal/dist/modal";

const ProfileDetail = ({ navigation }: any) => {
  const style = useStyles();
  const theme = useTheme()
  const hooks = getHooks()
  const { toast } = toastController()

  const userData = hooks.user
  console.log("userData", userData);

  const [firstName, setFirstName] = useState<string>(userData.firstname)
  const [lastName, setLastName] = useState<string>(userData.lastname)
  const [storeName, setStoreName] = useState<string>(userData.shopName)
  const [assignedRep, setAssignedRep] = useState<string>("")
  const [mobileNumber, setMobileNumber] = useState<string>(userData.telephone.replace("971", ""))
  const [whatsApp, setWhatsApp] = useState<string>(userData.whatsapp.replace("971", ""))
  const [isProgress, setProgress] = useState<boolean>(false)
  const [isChangeMobile, setChangeMobile] = useState<boolean>(false)
  const [isChangeWhatsApp, setChangeWhatsApp] = useState<boolean>(false)
  const [isShowOtpModal, setShowOtpModal] = useState<boolean>(false)
  const [otpCode, setOTPCode] = useState("");
  const [changeMobile, setChangeMobileNO] = useState<any>({ event: "", mobile: "" });

  console.log("changeMobile", changeMobile);

  const manageValidation = () => {
    if (!firstName) {
      showToast("Please enter First Name");
      return;
    }
    if (!lastName) {
      showToast("Please enter Last Name");
      return;
    }
    if (!storeName) {
      showToast("Please enter Store Name");
      return;
    }
    customerUpdateApiCall()
  };

  const customerUpdateApiCall = async () => {
    return new Promise<BaseResponse>((resolve, reject) => {
      setProgress(true);
      // const formData = new FormData();
      const apiCallObj = {
        customerId: userData.id,
        shopname: storeName,
        amg_salesman: assignedRep,
        first_name: firstName,
        last_name: lastName,
      };

      ApiHelper.customerUpdate(apiCallObj).then((res: BaseResponse) => {
        console.log("customer update List Call-===========>", res);
        resolve(res);
        setProgress(false);
        showToast(res.specification)
      }).catch((error) => console.log("error", error)
      );
    });
  };

  const sendOTPApiCall = async (eventName: string) => {
    setChangeMobileNO({ ...changeMobile, event: eventName, mobile: eventName === "whatsApp" ? whatsApp : mobileNumber })
    return new Promise<BaseResponse>((resolve, reject) => {
      setProgress(true);
      // const formData = new FormData();
      const mobile = eventName === "whatsApp" ? whatsApp : mobileNumber;
      const apiCallObj = {
        mobile: "971" + mobile,
        event: eventName
      };

      ApiHelper.sendOTP(apiCallObj).then((res: BaseResponse) => {
        console.log("send OTP API CALL", res);
        resolve(res);
        setProgress(false);
        setShowOtpModal(true)
        setChangeMobile(false)
        showToast(res.specification)
      }).catch((error) => console.log("error", error)
      );
    });
  };

  const updateTelephoneApiCall = async () => {
    // setChangeMobileNO({ ...changeMobile, event: eventName, mobile: eventName === "whatsApp" ? whatsApp : mobileNumber })
    return new Promise<BaseResponse>((resolve, reject) => {
      setProgress(true);
      // const formData = new FormData();
      // const mobile = eventName === "whatsApp" ? whatsApp : mobileNumber;
      const apiCallObj = {
        telephone: "971" + mobileNumber,
        customerId: userData.id,
        otp: otpCode
      };

      ApiHelper.updateTelephone(apiCallObj).then((res: BaseResponse) => {
        console.log("Verify API CALL", res);
        resolve(res);
        setProgress(false);
        setShowOtpModal(false)
        showToast(res.specification)
      }).catch((error) => console.log("error", error)
      );
    });
  };

  const updateWhatsappApiCall = async () => {
    // setChangeMobileNO({ ...changeMobile, event: eventName, mobile: eventName === "whatsApp" ? whatsApp : mobileNumber })
    return new Promise<BaseResponse>((resolve, reject) => {
      setProgress(true);
      // const formData = new FormData();
      // const mobile = eventName === "whatsApp" ? whatsApp : mobileNumber;
      const apiCallObj = {
        whatsapp: "971" + whatsApp,
        customerId: userData.id,
        otp: otpCode
      };

      ApiHelper.updateWhatsapp(apiCallObj).then((res: BaseResponse) => {
        console.log("whatsapp Verify API CALL", res);
        resolve(res);
        setProgress(false);
        setShowOtpModal(false)
        showToast(res.specification)
        setChangeWhatsApp(false)
      }).catch((error) => console.log("error", error)
      );
    });
  };

  const changeNumber = () => {
    setMobileNumber("")
    setChangeMobile(true)
  }

  const changeWhatsappNumber = () => {
    setWhatsApp("")
    setChangeWhatsApp(true)
  }

  return (
    <SafeAreaView
      style={[
        style.mainView,
        {
          marginTop: StatusBar.currentHeight,
          backgroundColor: BaseColor.backGroundColor,
        },
      ]}
    >
      <View style={[style.headerView, { justifyContent: "flex-start" }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" color={"white"} size={25} />
        </TouchableOpacity>
        <Text style={style.headerTextView}>My Account</Text>
      </View>
      <ScrollView style={{ margin: 20 }}>
        <Text style={styles.textView}>Account Information</Text>
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.formTextView}>First Name</Text>
          <TextInput
            style={styles.inputFieldView}
            cursorColor={BaseColor.purpleColor}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.formTextView}>Last Name</Text>
          <TextInput
            style={styles.inputFieldView}
            cursorColor={BaseColor.purpleColor}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.formTextView}>Store Name</Text>
          <TextInput
            style={styles.inputFieldView}
            cursorColor={BaseColor.purpleColor}
            value={storeName}
            onChangeText={setStoreName}
          />
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.formTextView}>Assigned Representative</Text>
          <TextInput
            style={styles.inputFieldView}
            cursorColor={BaseColor.purpleColor}
            value={assignedRep}
            onChangeText={setAssignedRep}
          />
        </View>
        <View>
          <ButtonView
            text="Update Information"
            onPress={() => manageValidation()}
          />
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.formTextView}>Phone Number</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image
              source={Images.country}
              style={{ width: 40, height: 40 }}
            />
            <Text style={[styles.formTextView, { color: 'black' }]}>+971</Text>
            <View style={{ borderLeftWidth: 1, borderLeftColor: 'black', height: 30 }}></View>
            <View>
              <TextInput
                style={[styles.inputFieldView, { width: 160, marginHorizontal: 10 }]}
                cursorColor={BaseColor.purpleColor}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                editable={isChangeMobile ? true : false}
                keyboardType={'phone-pad'}
              />
            </View>
            {isChangeMobile ?
              <TouchableOpacity onPress={() => sendOTPApiCall("telephone")}>
                <Text style={styles.fontView}>Send OTP</Text>
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => changeNumber()}>
                <Text style={styles.fontView}>Change</Text>
              </TouchableOpacity>}
          </View>
        </View>

        <View style={{ marginVertical: 15 }}>
          <Text style={styles.formTextView}>WhatsApp Number</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image
              source={Images.country}
              style={{ width: 40, height: 40 }}
            />
            <Text style={[styles.formTextView, { color: 'black' }]}>+971</Text>
            <View style={{ borderLeftWidth: 1, borderLeftColor: 'black', height: 30 }}></View>
            <View>
              <TextInput
                style={[styles.inputFieldView, { width: 160, marginHorizontal: 10 }]}
                cursorColor={BaseColor.purpleColor}
                value={whatsApp}
                onChangeText={setWhatsApp}
                editable={isChangeWhatsApp ? true : false}
                keyboardType={'phone-pad'}
              />
            </View>
            {isChangeWhatsApp ?
              <TouchableOpacity onPress={() => sendOTPApiCall("whatsapp")}>
                <Text style={styles.fontView}>Send OTP</Text>
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => changeWhatsappNumber()}>
                <Text style={styles.fontView}>Change</Text>
              </TouchableOpacity>}
          </View>
          
          <Modal
            animationType="slide"
            transparent={true}
            visible={isShowOtpModal}
            onRequestClose={() => {
              setShowOtpModal(false)
            }}>
            <View
              style={{
                height: '35%',
                marginTop: 'auto',
                backgroundColor: BaseColor.purpleColor,
                paddingHorizontal: 40,
                paddingVertical: 25,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50
              }}>
              <Text
                style={[
                  // styles.textDec,
                  { fontFamily: font(FontFamily.fontRegular), color: 'white', textAlign: 'center' },
                ]}
              >
                We have sent a 4 digit code to{" "}
                <Text style={{ color: "#EEB417" }}>+971-{changeMobile.mobile}</Text>
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
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginStart: 5,
                      fontFamily: font(FontFamily.fontBold),
                    }}
                  >
                    Resend OTP
                  </Text>
                  {/* )} */}
                </View>
              </View>
              <View
                style={{
                  height: 50,
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <ButtonView text="Verify" onPress={() =>
                  changeMobile.event === "whatsapp" ?
                    updateWhatsappApiCall() :
                    updateTelephoneApiCall()
                } />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      {isProgress && <ProgressView />}
    </SafeAreaView>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  textView: {
    fontFamily: font(FontFamily.fontBold),
    color: 'black',
    fontSize: getFontSize(15)
  },
  formTextView: {
    fontFamily: font(FontFamily.fontRegular),
    fontSize: getFontSize(14)
  },
  inputFieldView: {
    borderBottomWidth: 1,
    height: 40
  },
  fontView: {
    color: BaseColor.purpleColor,
    fontFamily: font(FontFamily.fontBold)
  },
  otpView: {
    width: '80%',
    height: 80,
    // marginTop: ,
    alignSelf: "center",
  },
  underlineStyleBase: {
    width: 50,
    height: 50,
    // borderWidth: 1,
    // borderColor: colors.optBorder,
    // fontFamily:font(FontFamily.fontRobotoRegular),
    // borderBottomColor:colors.otpBoxBackground,
    // borderBottomWidth: 2,
    borderRadius: 6,
    fontSize: getFontSize(18),
    backgroundColor: "white",
    color: "#000",
    // color: colors.text,
  },
});
