import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import GeoFencing from 'react-native-geo-fencing';

import useStyles from "./Style";
import useTheme from "../../theme";
import useStyle from "../Auth/style";
import { Images } from "../../Images";
import { BaseColor, font, FontFamily } from "../../config";
import getHooks from "../../hooks";
// import { toastController } from "utils";
import axios from "axios";
import {
  addAddressURL,
  AddressListURL,
  baseURL,
  editAddressURL,
  hashKey,
} from "../../services/Constants";
import { authApi } from "../../services";
import { useDispatch } from "react-redux";
import { AuthActions, HomeActions } from "../../action";
import ProgressView from "../../components/Organisms/progressView";
import api from "../../services/Common/Api";
import { toastController } from "../../utils/toastController";

const AddressDetail = ({ navigation, route }: any) => {
  const style = useStyles();
  const mobileStyle = useStyle();
  const theme = useTheme();
  const hooks = getHooks();
  const dispatch = useDispatch();

  const { toast } = toastController();

  console.log("props", route);
  console.log("hooks", hooks.user);

  const userData = hooks.user;

  const [addLabel, setAddLabel] = useState("Store");
  console.log("addLabel", addLabel);
  const addressData = route.params?.addressdetail
    ? route.params.addressdetail.city
    : null;
  // const { addressdetail } = route.params === undefined ? null : route.params
  console.log("addressData", addressData);
  const [address, setAddress] = useState(
    route.params === undefined ? "" : route.params.addressdetail.combineAdd
  );

  // const [mobile, setMobile] = useState(userData.telephone)
  // const [fullname, setFullName] = useState(name)
  const [fullname, setFullName] = useState(
    `${userData.firstname} ${userData.lastname}`
  );
  const [mobile, setMobile] = useState(userData.telephone.replace("971", ""));
  const [buildingName, setBuildingName] = useState(
    route.params === undefined ? "" : route.params.addressdetail.buildingName
  );
  const [flatName, setFlatName] = useState(
    route.params === undefined ? "" : route.params.addressId.flatNumber
  );
  const [landmark, setLandMark] = useState(
    route.params === undefined ? "" : route.params.addressId.landmark
  );
  const [company, setCompany] = useState<string | undefined>();
  const [locationList, setLocation] = useState();
  const [isProgress, setProgress] = useState<boolean>(false);
  const [addressId, setAddressId] = useState(
    route.params.addressId === null ? null : route.params.addressId.addressId
  );
  console.log("addressId", addressId);
  console.log("address", address);
  console.log("locationList", locationList);

  const manageValidation = () => {
    if (!fullname) {
      toast("required_field", "please enter full name", "info");
      return;
    }
    if (!mobile) {
      toast("required_field", "please enter Mobile number", "info");
      return;
    }
    if (!addressData) {
      toast("required_field", "please enter address", "info");
      return;
    }
    if (!buildingName) {
      toast("required_field", "please enter Building Name", "info");
      return;
    }
    if (!flatName) {
      toast(
        "required_field",
        "please enter flat / Office / Unit number",
        "info"
      );
      return;
    }
    if (!landmark) {
      toast("required_field", "please enter nearest landmark", "info");
      return;
    }
    if (!company) {
      toast("required_field", "please enter company", "info");
      return;
    }
    if (!addLabel) {
      toast("required_field", "please enter address type", "info");
      return;
    }
    // checkArea()
    addressId === null || addressId === undefined ? addAddress() : editAddress();
  };
  const addAddress = async () => {
    setProgress(true);
    const formData = new FormData();
    formData.append("customerId", userData.id);
    formData.append("fullname", `${userData.firstname} ${userData.lastname}`);
    formData.append("address", address);
    formData.append("Telephone", userData.telephone);
    formData.append("flat", flatName);
    formData.append("building_name", buildingName);
    formData.append("addressType", addLabel);
    formData.append("landmark", landmark);
    formData.append("company", company);
    formData.append(
      "latitude",
      route.params === undefined ? 0 : route.params.position.latitude
    );
    formData.append(
      "longitude",
      route.params === undefined ? 0 : route.params.position.longitude
    );
    formData.append("is_in_superhub", false);

    const res = await api.post(`${addAddressURL}`, formData);
    console.log("res", res);
    setProgress(true);
    if (res.data.success === 1) {
      addressListApiCall();
      setProgress(false);
    } else if (res.data.success === 0) {
      toast("Msg", res.data.specification, "info");
    } else {
      toast("network_error", "network_msg", "info");
    }
    // const requestBody = {
    //     customerId: userData.id,
    //     fullname: `${userData.firstname} ${userData.lastname}`,
    //     address: address,
    //     Telephone: userData.telephone,
    //     flat: flatName,
    //     building_name: buildingName,
    //     addressType: addLabel,
    //     landmark: landmark,
    //     company: company,
    //     latitude: route.params === undefined ? 0 : route.params.position.latitude,
    //     longitude: route.params === undefined ? 0 : route.params.position.longitude,
    //     is_in_superhub: false
    // };
    // setProgress(true);
    // dispatch(AuthActions.AddAddress(requestBody, (response) => {
    //     if (response.success === 0) {
    //         toast("error", response.specification, "info")
    //         return;
    //     }
    //     if (response && response.success === 1) {
    //         setProgress(false);
    //         addressListApiCall()
    //         // navigation.navigate("manageaddress")
    //         // setProgress(false);
    //         // console.log("token setting");
    //         // // USER_TOKEN.set(response.token, "");
    //         // response.data.addresses.length === 0 ?
    //         //     navigation.navigate("addressdetail", { mobile: route.params.mobile }) :
    //         //     navigation.navigate("home")
    //     } else {
    //         toast("network_error", "network_msg", "info")
    //     }
    //     console.log("Response", response);
    // }))
  };

  const editAddress = async () => {
    setProgress(true);
    const formData = new FormData();
    formData.append("AddressId", addressId);
    formData.append("customerId", userData.id);
    formData.append("fullname", `${userData.firstname} ${userData.lastname}`);
    formData.append("address", address);
    formData.append("Telephone", userData.telephone);
    formData.append("flat", flatName);
    formData.append("building_name", buildingName);
    formData.append("addressType", addLabel);
    formData.append("landmark", landmark);
    formData.append("company", company);
    formData.append(
      "latitude",
      route.params === undefined ? 0 : route.params.position.latitude
    );
    formData.append(
      "longitude",
      route.params === undefined ? 0 : route.params.position.longitude
    );
    formData.append("is_in_superhub", false);

    setProgress(true);
    const res = await api.post(`${editAddressURL}`, formData);
    console.log("res", res);
    setProgress(true);
    if (res.data.success === 1) {
      addressListApiCall();
      setProgress(false);
    } else if (res.data.success === 0) {
      toast("Msg", res.data.specification, "info");
    } else {
      toast("network_error", "network_msg", "info");
    }
  };

  const addressListApiCall = async () => {
    const formData = new FormData();
    formData.append("hashkey", hashKey);
    formData.append("customerId", userData.id);
    const res = await api.post(`${AddressListURL}`, formData);
    console.log("res", res);
    if (res.data.success === 1) {
      setProgress(false);
      if (route.params.id === 1 || route.params === undefined) {
        navigation.navigate("manageaddress", { id: 1 });
      } else {
        navigation.navigate("manageaddress", { id: 2 });
      }
    } else if (res.data.success === 0) {
      toast("Msg", res.data.specification, "info");
    } else {
      toast("network_error", "network_msg", "info");
    }
  };

  // const checkArea = () => {
  //     // console.log("add coupon");

  //     // setProgress(true);
  //     dispatch(AuthActions.Maplocation((response) => {
  //         if (!response) {
  //             return;
  //         }
  //         console.log("Response", response);
  //         setLocation(response.data)
  //         var builder = []
  //         for (var i = 0; i < response.data.length; i++) {
  //             var locationPoints = response.data[i].split(",");
  //             console.log("locationPoint", locationPoints);
  //             builder.push({ latitude: parseFloat(locationPoints[0]), longitude: parseFloat(locationPoints[1]) })

  //         }
  //         console.log("builder", builder);
  //         let point = {
  //             lat: route.params.position.latitude,
  //             lng: route.params.position.longitude
  //         };
  //         GeoFencing.containsLocation(point, builder)
  //             .then(() => console.log('true'))
  //             .catch(() => console.log('false'))

  //     }))
  // };

  return (
    <View style={{ height: "100%" }}>
      <View style={theme.ProfileView}>
        <Text style={theme.ProfileTitle}>Address Details</Text>
        <Text style={theme.ProfileDec}>Enter details to continue</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={theme.formView}>
          {/* <View style={{ flex: 1 }}> */}
          <Text style={theme.formText}>Address</Text>
          <View style={theme.inputView}>
            <TextInput
              style={theme.inputFieldView}
              value={address}
              onChangeText={setAddress}
            />
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "20%",
                height: 55,
              }}
              onPress={() =>
                route.params === undefined
                  ? navigation.navigate("location")
                  : navigation.navigate("location", {
                    position: route.params.position,
                  })
              }
            >
              <Text
                style={[
                  {
                    color: BaseColor.yellowColor,
                    alignSelf: "center",
                    fontWeight: "bold",
                    fontFamily: font(FontFamily.fontRegular),
                  },
                ]}
              >
                Change
              </Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
          <View style={{ flex: 1 }}>
            <Text style={theme.formText}>Full Name</Text>
            <View style={theme.inputView}>
              <TextInput
                style={theme.inputFieldView}
                value={fullname}
                onChangeText={() =>
                  setFullName(`${userData.firstname} ${userData.lastname}`)
                }
              />
            </View>
          </View>
          <Text style={[theme.formText]}>Mobile Number</Text>
          <View
            style={[
              mobileStyle.inputFieldView,
              {
                width: "100%",
                marginBottom: 5,
                borderColor: "black",
                marginVertical: 10,
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
                //   onFocus={() => setWhatsapp({ ...whatsapp, isFocus: true })}
                //   onBlur={() => setWhatsapp({ ...whatsapp, isFocus: false })}
                selectionColor={BaseColor.purpleColor}
                style={[
                  mobileStyle.inputText,
                  { color: "black", fontWeight: "400" },
                ]}
                placeholder={"Phone Number"}
                allowFontScaling={false}
                keyboardType="numeric"
                value={mobile}
                onChangeText={setMobile}
              //   onChangeText={(e) => setWhatsapp({ ...whatsapp, value: e })}
              ></TextInput>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[theme.formText, { marginTop: 15 }]}>
              Building Name
            </Text>
            <View style={theme.inputView}>
              <TextInput
                style={theme.inputFieldView}
                value={buildingName}
                onChangeText={setBuildingName}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={theme.formText}>Flat / Office / Unit No.</Text>
            <View style={theme.inputView}>
              <TextInput
                style={theme.inputFieldView}
                value={flatName}
                onChangeText={setFlatName}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={theme.formText}>Nearest Landmark</Text>
            <View style={theme.inputView}>
              <TextInput
                style={theme.inputFieldView}
                value={landmark}
                onChangeText={setLandMark}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={theme.formText}>Company</Text>
            <View style={theme.inputView}>
              <TextInput
                style={theme.inputFieldView}
                value={company}
                onChangeText={setCompany}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={theme.formText}>Address Label</Text>
            <View style={style.addressLabelView}>
              <TouchableOpacity
                style={[
                  style.addressLabel,
                  {
                    borderColor:
                      addLabel === "Store" ? BaseColor.purpleColor : "black",
                  },
                ]}
                onPress={() => setAddLabel("Store")}
              >
                <Text>Store</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.addressLabel,
                  {
                    borderColor:
                      addLabel === "Warehouse"
                        ? BaseColor.purpleColor
                        : "black",
                  },
                ]}
                onPress={() => setAddLabel("Warehouse")}
              >
                <Text>Warehouse</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={style.addressLabel}><Text>Other</Text></TouchableOpacity> */}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={theme.buttonView}
              onPress={() => manageValidation()}
            >
              <Text style={theme.buttonText}>Save Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {isProgress && <ProgressView />}
    </View>
  );
};

export default AddressDetail;
