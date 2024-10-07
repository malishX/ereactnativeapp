import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  PermissionsAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import useStyles from "./style";
import useStyle from "../Auth/style";
import useTheme from "../../theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { Images } from "../../Images";
import { useSelector } from "react-redux";
import Check from "../../assets/svgImage/checked.svg";
import Unchecked from "../../assets/svgImage/unchecked.svg";
import { AuthActions } from "../../action";
import { Dropdown } from "react-native-element-dropdown";
import { BaseColor } from "../../config";
// import { toastController, _isEmailValid } from "utils";
import Geolocation from "react-native-geolocation-service";
import { toastController } from "../../utils/toastController";
import { _isEmailValid } from "../../utils/validationController";
import { hashKey, registrationURL } from "../../services/Constants";
import api from "../../services/Common/Api";

const Profile = ({ navigation, route }: any) => {
  const userData = useSelector((state: any) => state.auth.loginUser);
  console.log("userData", userData);
  const style = useStyles();
  const mobileStyle = useStyle();
  const { toast } = toastController();
  const theme = useTheme();
  const dispatch: any = useDispatch();

  const [isNumber, setNumber] = useState(false);
  const [isRepresentative, setReprenstative] = useState(false);
  const [fullname, setFullName] = useState({
    value: "",
    isFocus: false,
  });
  const [email, setEmail] = useState({
    value: "",
    isFocus: false,
  });
  const [outlet, setOutlet] = useState(null);
  const [trnNo, setTrnNo] = useState({
    value: "",
    isFocus: false,
  });
  const [whatsapp, setWhatsapp] = useState({
    value: "",
    isFocus: false,
  });
  const [storeName, setStoreName] = useState({
    value: "",
    isFocus: false,
  });
  const [representativeName, setRepresentativeName] = useState({
    value: "",
    isFocus: false,
  });
  const [progress, setProgress] = useState<boolean>(false);
  console.log("outlet", outlet);
  const data = [
    { label: "Grocery", value: "1" },
    { label: "Supermarket", value: "2" },
    { label: "Restaurant", value: "3" },
    { label: "Cafeteria", value: "4" },
    { label: "Pharmacy", value: "5" },
    { label: "Institution", value: "6" },
    { label: "Club and Wellness Centre", value: "7" },
  ];
  const [isFocus, setFocus] = useState(false);
  const [location, setLocation] = useState<Geolocation.GeoPosition>();

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then((res) => {
      console.log("res is:", res);
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            setLocation(position);
          },
          (error) => {
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

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Geolocation Permission",
          message: "Can we access your location?",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      console.log("granted", granted);
      if (granted === "granted") {
        console.log("You can use Geolocation");
        return true;
      } else {
        console.log("You cannot use Geolocation");
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  const manageValidation = () => {
    // getLocation()
    if (!fullname.value) {
      toast("required_field", "Please Enter Full Name", "info");
      return;
    }
    if (!email.value) {
      toast("required_field", "Please Enter Email", "info");
      return;
    }
    if (!outlet) {
      toast("required_field", "Please Enter Outlet Type", "info");
      return;
    }
    if (!trnNo.value) {
      toast("required_field", "Please Enter TRN Number", "info");
      return;
    }
    if (!storeName.value) {
      toast("required_field", "Please Enter strore Name", "info");
      return;
    }
    if (isNumber && !whatsapp.value) {
      toast("required_field", "Please Enter whatsapp Number", "info");
      return;
    }
    if (isRepresentative && !representativeName.value) {
      toast("required_field", "Please Enter Reprensentative name", "info");
      return;
    }
    if (trnNo.value.length < 15) {
      toast("required_field", "TRN No must be 15 character", "info");
      return;
    }
    if (!_isEmailValid(email.value)) {
      toast("required_field", "please enter valid Email", "info");
      return;
    }
    // retailersApiCall()
    registrationApiCall();
  };
  const retailersApiCall = () => {
    // console.log("add coupon");
    const requestBody = {
      hashkey: hashKey,
      referral_code: "fresh123",
    };
    setProgress(true);
    dispatch(
      AuthActions.Retailers(requestBody, (response) => {
        if (!response) {
          return;
        }
        setProgress(false);
        if (response && response.success === 1) {
          navigation.navigate("otpverify", { mobile: mobile });
        } else {
          toast("network_error", "Please Check Your Network", "info");
        }
        console.log("Response", response);
      })
    );
    // HomeActions.CategoryList(requestBody, (response: CategoryListResponse) => {
    // }))
  };

  const registrationApiCall = async () => {
    // getLocation()
    // console.log("add coupon");
    const formData = new FormData();
    formData.append("fullname", fullname.value);
    formData.append("email", email.value);
    formData.append("trn", trnNo.value);
    formData.append("shopname", storeName.value);
    formData.append("telephone", userData.telephone);
    formData.append(
      "whatsapp",
      isNumber ? `${"971"}${whatsapp}` : `${"971"}${route.params.mobile}`
    );
    formData.append("outlet_type", outlet);
    formData.append("amg_salesman", representativeName.value);
    formData.append("lat", location ? location.coords.latitude : null);
    formData.append("lng", location ? location.coords.longitude : null);

    setProgress(true);
    const res = await api.post(`${registrationURL}`, formData);
    console.log("res", res);
    setProgress(true);
    if (res.data.success === 1) {
      setProgress(false);
      res.data.data.addresses.length === 0
        ? navigation.navigate("addressdetail", { mobile: route.params.mobile })
        : navigation.navigate("home");
    } else if (res.data.success === 0) {
      toast("Msg", res.data.specification, "info");
    } else {
      toast("network_error", "network_msg", "info");
    }

    // const requestBody = {
    //   fullname: fullname.value,
    //   email: email.value,
    //   trn: trnNo.value,
    //   shopname: storeName.value,
    //   telephone: "971" + route.params.mobile,
    //   whatsapp: isNumber ? `${"971"}${whatsapp}` : `${"971"}${route.params.mobile}`,
    //   outlet_type: outlet,
    //   amg_salesman: representativeName.value,
    //   lat: location ? location.coords.latitude : null,
    //   lng: location ? location.coords.longitude : null
    // };
    // // setProgress(true);
    // dispatch(AuthActions.Registration(requestBody, (response) => {
    //   if (response.success === 0) {
    //     toast("error", response.specification, "info")
    //     return;
    //   }
    //   if (response && response.success === 1) {
    //     setProgress(false);
    //     console.log("token setting");
    //     // USER_TOKEN.set(response.token, "");
    //     response.data.addresses.length === 0 ?
    //       navigation.navigate("addressdetail", { mobile: route.params.mobile }) :
    //       navigation.navigate("home")
    //   } else {
    //     toast("network_error", "network_msg", "info")
    //   }
    //   console.log("Response", response);
    // }))
    // HomeActions.CategoryList(requestBody, (response: CategoryListResponse) => {
    // }))
  };
  console.log("fullname", fullname);
  console.log("email", email);
  console.log("outlet", outlet);
  console.log("trnNo", trnNo.value.length);
  console.log("whatsapp", whatsapp);
  console.log("representativeName", representativeName);
  const handleFocus = () => {
    setFocus(true);
  };
  return (
    <View style={style.mainView}>
      <View style={theme.ProfileView}>
        <Text style={theme.ProfileTitle}>
          you are just one step away to start the journey!
        </Text>
        {/* <Text style={theme.ProfileDec}>Enter details to continue</Text> */}
      </View>
      <KeyboardAwareScrollView>
        <View style={theme.formView}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={theme.formText}>Full Name</Text>
              <View
                style={[
                  theme.inputView,
                  {
                    borderBottomColor: fullname.isFocus
                      ? BaseColor.purpleColor
                      : "black",
                  },
                ]}
              >
                <TextInput
                  onFocus={() => setFullName({ ...fullname, isFocus: true })}
                  onBlur={() => setFullName({ ...fullname, isFocus: false })}
                  selectionColor={BaseColor.purpleColor}
                  style={theme.inputFieldView}
                  value={fullname.value}
                  onChangeText={(e) => setFullName({ ...fullname, value: e })}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={theme.formText}>E-mail</Text>
              <View
                style={[
                  theme.inputView,
                  {
                    borderBottomColor: email.isFocus
                      ? BaseColor.purpleColor
                      : "black",
                  },
                ]}
              >
                <TextInput
                  onFocus={() => setEmail({ ...email, isFocus: true })}
                  onBlur={() => setEmail({ ...email, isFocus: false })}
                  selectionColor={BaseColor.purpleColor}
                  style={theme.inputFieldView}
                  value={email.value}
                  onChangeText={(e) => setEmail({ ...email, value: e })}
                  // onFocus={() => handleFocus()}
                  placeholder="email"
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={theme.formText}>Store Name</Text>
              <View
                style={[
                  theme.inputView,
                  {
                    borderBottomColor: storeName.isFocus
                      ? BaseColor.purpleColor
                      : "black",
                  },
                ]}
              >
                <TextInput
                  onFocus={() => setStoreName({ ...storeName, isFocus: true })}
                  onBlur={() => setStoreName({ ...storeName, isFocus: false })}
                  selectionColor={BaseColor.purpleColor}
                  style={theme.inputFieldView}
                  value={storeName.value}
                  onChangeText={(e) => setStoreName({ ...storeName, value: e })}
                />
              </View>
            </View>
            <Text style={theme.formText}>Outlet Type</Text>
            {/* <View style={[theme.input, View{ borderBottomColor: email.isFocus ? BaseColor.purpleColor : 'black' }]}> */}
            <Dropdown
              style={[
                styles.dropdown,
                { borderColor: isFocus ? BaseColor.purpleColor : "black" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              // search
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Outlet Type"}
              value={outlet}
              onChange={(item) => {
                setOutlet(item.value);
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={theme.formText}>TRN No.</Text>
            <View
              style={[
                theme.inputView,
                {
                  borderBottomColor: trnNo.isFocus
                    ? BaseColor.purpleColor
                    : "black",
                },
              ]}
            >
              <TextInput
                maxLength={15}
                onFocus={() => setTrnNo({ ...trnNo, isFocus: true })}
                onBlur={() => setTrnNo({ ...trnNo, isFocus: false })}
                selectionColor={BaseColor.purpleColor}
                style={theme.inputFieldView}
                value={trnNo.value}
                onChangeText={(e) => setTrnNo({ ...trnNo, value: e })}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setNumber(!isNumber);
              }}
            >
              {isNumber ? <Unchecked /> : <Check />}
            </TouchableOpacity>
            {/* <Text style={{ color: 'black', marginLeft: 10 }}>{"+971"} {route.params.mobile} {"is my Whatsapp number"}</Text> */}
          </View>
          {isNumber && (
            <View
              style={[
                mobileStyle.inputFieldView,
                {
                  width: "100%",
                  borderBottomColor: whatsapp.isFocus
                    ? BaseColor.purpleColor
                    : "black",
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={Images.country}
                  style={{ width: 30, height: 40 }}
                />
                <Text
                  style={[
                    mobileStyle.inputText,
                    { color: "black", fontWeight: "400" },
                  ]}
                >
                  {" "}
                  +971{" "}
                </Text>
                <TextInput
                  onFocus={() => setWhatsapp({ ...whatsapp, isFocus: true })}
                  onBlur={() => setWhatsapp({ ...whatsapp, isFocus: false })}
                  selectionColor={BaseColor.purpleColor}
                  style={[
                    mobileStyle.inputText,
                    { color: "black", fontWeight: "400" },
                  ]}
                  placeholder={"Phone Number"}
                  allowFontScaling={false}
                  keyboardType="numeric"
                  value={whatsapp.value}
                  onChangeText={(e) => setWhatsapp({ ...whatsapp, value: e })}
                ></TextInput>
              </View>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setReprenstative(!isRepresentative);
              }}
            >
              {isRepresentative ? <Check /> : <Unchecked />}
            </TouchableOpacity>
            <Text style={{ color: "black", marginLeft: 10 }}>
              Are you coneKtr Representative
            </Text>
          </View>
          {isRepresentative && (
            <View style={{ flex: 1 }}>
              {/* <Text style={theme.formText}>Full Name</Text> */}
              <View
                style={[
                  theme.inputView,
                  {
                    marginVertical: 10,
                    borderBottomColor: representativeName.isFocus
                      ? BaseColor.purpleColor
                      : "black",
                  },
                ]}
              >
                <TextInput
                  onFocus={() =>
                    setRepresentativeName({
                      ...representativeName,
                      isFocus: true,
                    })
                  }
                  onBlur={() =>
                    setRepresentativeName({
                      ...representativeName,
                      isFocus: false,
                    })
                  }
                  selectionColor={BaseColor.purpleColor}
                  style={theme.inputFieldView}
                  value={representativeName.value}
                  onChangeText={(e) =>
                    setRepresentativeName({ ...representativeName, value: e })
                  }
                  placeholder="Please Enter Your Name"
                />
              </View>
            </View>
          )}
          <View style={{ flex: 1, marginTop: 20 }}>
            <TouchableOpacity
              style={theme.buttonView}
              onPress={
                () => manageValidation()
                // navigation.navigate('home')
              }
            >
              <Text style={theme.buttonText}>Save and Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 40,
    // borderColor: isFocus ? BaseColor.purpleColor : BaseColor.grayBorderColor,
    borderWidth: 0.5,
    borderRadius: 30,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "metropolis",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

// import { StyleSheet, Text, View, PermissionsAndroid, Button } from 'react-native'
// import React, { useState } from 'react'
// import { ButtonView } from '../../components'
// import Geolocation from 'react-native-geolocation-service';

// const Profile = () => {
//   const [location, setLocation] = useState(false);
//   const getLocation = () => {
//     const result = requestLocationPermission();
//     result.then(res => {
//       console.log('res is:', res);
//       if (res) {
//         Geolocation.getCurrentPosition(
//           position => {
//             console.log(position);
//             setLocation(position);
//           },
//           error => {
//             // See error code charts below.
//             console.log(error.code, error.message);
//             setLocation(false);
//           },
//           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
//         );
//       }
//     });
//     console.log(location);
//   };

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Geolocation Permission',
//           message: 'Can we access your location?',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       console.log('granted', granted);
//       if (granted === 'granted') {
//         console.log('You can use Geolocation');
//         return true;
//       } else {
//         console.log('You cannot use Geolocation');
//         return false;
//       }
//     } catch (err) {
//       return false;
//     }
//   };
//   return (
//     <>

//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         {/* <View style={{ flex: 1 }}> */}
//         <ButtonView
//           text="Get Location"
//           onPress={() => getLocation()}
//         />
//         {/* </View> */}
//         <View style={{ flex: 1 }}>
//           <Text>lat: </Text>
//           <Text>long: </Text>
//         </View>
//       </View>
//     </>

//   )
// }

// export default Profile

// const styles = StyleSheet.create({})
