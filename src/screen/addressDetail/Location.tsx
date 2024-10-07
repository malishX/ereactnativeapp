import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geolocation from "react-native-geolocation-service";
// import GeoFencing from 'react-native-geo-fencing';

import useStyles from "./Style";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ButtonView, ImageView } from "../../components";
import { Images } from "../../Images";
import { BaseColor } from "../../config";
import useTheme from "../../theme";
import getHooks from "../../hooks";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ActionTypes, AuthActions } from "../../action";
// import { toastController, _isEmailValid } from "utils";
import api from "../../services/Common/Api";
import {
  addressMapURL,
  baseURLImage,
  baseURLMap,
} from "../../services/Constants";
import { toastController } from "../../utils/toastController";
import ProgressView from "../../components/Organisms/progressView";

interface AddressDetails {
  id?: string;
  combineAdd?: string;
  city?: string;
  state?: string;
  country?: string;
  buildingName?: string;
  landmark?: string;
  flatNumber?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

interface AddressId {
  addressId: string;
  flatNumber: string;
  landmark: string;
  company: string;
  addressType: string;
}

interface Position {
  latitude: number | undefined;
  longitude: number | undefined;
  latitudeDelta: number | undefined;
  longitudeDelta: number | undefined;
}

const Location = ({ navigation, route }: any) => {
  const style = useStyles();
  const theme = useTheme();
  const hooks = getHooks();
  const { toast } = toastController();
  const dispatch = useDispatch();
  console.log("routeLocation", route.params);

  const [addressId, setAddressId] = useState<AddressId>({
    addressId: "",
    flatNumber: "",
    landmark: "",
    company: "",
    addressType: "",
  });
  const [position, setPosition] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [addressdetail, setAddressDetail] = useState<AddressDetails>({
    id: "",
    combineAdd: "",
    city: "",
    state: "",
    country: "United Arab Emirates",
    buildingName: "",
    landmark: "",
    flatNumber: "",
    address: "",
  });
  const [forceRefresh, setRefresh] = useState<number>(0);
  const [boundryList, setBoundry] = useState([]);
  const [isProgress, setProgress] = useState(false);
  console.log("forceRefresh", forceRefresh);
  console.log("boundryList", boundryList);
  console.log("position", position);
  const locationPosition = hooks?.location?.coords;
  console.log("locationPosition", locationPosition);

  useEffect(() => {
    if (route.params === undefined) {
      setPosition({
        ...position,
        latitude: locationPosition.latitude,
        longitude: locationPosition.longitude,
      });
      return;
    } else if (route.params.position) {
      setPosition({
        ...position,
        latitude: route.params.position.latitude,
        longitude: route.params.position.longitude,
      });
      return;
    } else {
      const itemDetail: AddressDetails = {
        id: "",
        combineAdd: "",
        city: "",
        state: "",
        country: "",
        buildingName: "",
        landmark: "",
        flatNumber: "",
        address: "",

        latitude: 0,
        longitude: 0,
      };

      itemDetail.id = route.params.item?.id;
      itemDetail.city = route.params.item?.city;

      itemDetail.state = route.params.item?.region?.region;

      itemDetail.country = route.params.item?.country_name;

      if (route.params.item?.street != null) {
        let street = route.params.item?.street.split(",");
        if (street.length > 0) {
          itemDetail.flatNumber = street[0].trim();
        }
        if (street.length > 1) {
          itemDetail.buildingName = street[1].trim();
        }
        if (street.length > 2) {
          itemDetail.landmark = street[2].trim();
        }

        if (route.params.item?.latlng !== null) {
          var latLngDetails = route.params.item?.latlng.split(",");

          if (latLngDetails.length == 2) {
            itemDetail.latitude = parseFloat(latLngDetails[0]);
            itemDetail.longitude = parseFloat(latLngDetails[1]);
          }
        }

        if (itemDetail.city != null) {
          itemDetail.address = itemDetail.city + ", ";
        }
        if (itemDetail.state != null) {
          if (itemDetail.state.toLowerCase().includes("umm al-quwain")) {
            itemDetail.state = itemDetail.state.replace("-", " ");
          }
          itemDetail.address = itemDetail.address + itemDetail.state + ", ";
        }
        if (itemDetail.country != null) {
          itemDetail.address = itemDetail.address + itemDetail.country;
        }
        if (itemDetail.country != null) {
          itemDetail.combineAdd = itemDetail.address;
        }
      }
      setAddressDetail(itemDetail);
      if (addressdetail.latitude === 0 || addressdetail.longitude === 0) {
        // findLocationPointsFromAddress(placeDetails);
      } else {
        setAddressId({
          ...addressId,
          addressId: route.params.item?.id,
          flatNumber: itemDetail.flatNumber ? itemDetail.flatNumber : "",
          landmark: itemDetail.landmark ? itemDetail.landmark : "",
        });
        if (itemDetail.latitude && itemDetail.longitude) {
          setPosition({
            ...position,
            latitude: itemDetail.latitude,
            longitude: itemDetail.longitude,
          });
        }
      }
      // setPosition({
      //   ...position,
      //   latitude: itemDetail.latitude,
      //   longitude: itemDetail.longitude
      // })
    }
    // else if (route.params.position !== null) {

    //   setPosition({
    //     ...position,
    //     latitude: route.params.position.latitude,
    //     longitude: route.params.position.longitude
    //   })
    // } else if (route.params === undefined) {
    //   setPosition({
    //     ...position,
    //     latitude: locationPosition.latitude,
    //     longitude: locationPosition.longitude
    //   })
    // }
  }, []);

  // console.log("route.params", route.params);
  // const locationRoute = route.params.item && route.params.item.latlng.split(",")
  // const addressData = hooks.address
  console.log("hooks", hooks.location);
  // const [addressDetail,setAddresDetail]

  const getAddressNamefromPlace = (item: any) => {
    // setProgress(true)
    // checkArea()
    console.log("item", item);
    var addressDetails: AddressDetails = {
      combineAdd: "",
      city: "",
      state: "",
      country: "United Arab Emirates",
      buildingName: "",
      landmark: "",
      flatNumber: "",
      address: "",
    };

    for (var i = 0; i < item.adm_div.length; i++) {
      let checkCityType = item.adm_div[i];
      console.log("checkCityType", checkCityType.type);
      if (checkCityType.type === "city") {
        // setAddressDetail({ ...addressdetail, city: checkCityType.name })
        addressDetails.city = checkCityType.name;
        break;
      }
    }
    if (addressDetails.city === null) {
      for (var i = 0; i < item.adm_div.length; i++) {
        let checkCityType = item.adm_div[i];
        console.log("checkCityType", checkCityType.type);
        if (checkCityType.type === "district_area") {
          // setAddressDetail({ ...addressdetail, city: checkCityType.name })
          addressDetails.city = checkCityType.name;
          break;
        }
      }
    }

    if (addressDetails.city === null) {
      addressDetails.city = item.name;
    }
    console.log("city", addressDetails.city);
    // state
    for (var i = 0; i < item.adm_div.length; i++) {
      let checkType = item.adm_div[i];
      console.log("checkType", checkType);
      if (checkType.type === "region") {
        addressDetails.state = checkType.name;
        // setAddressDetail({ ...addressdetail, state: checkType.name })
      }
    }
    // building name
    if (item.type === "building") {
      addressDetails.buildingName = item.building_name;
    } else if (item.type === "street") {
      addressDetails.buildingName = item.full_name;
    }
    console.log("addressCity1", addressDetails.address);
    //  Address name
    if (item.address_name != null) {
      addressDetails.address = `${item.address_name}${","}`;
    } else if (item.full_name != null) {
      addressDetails.address = `${item.full_name}${","}`;
    }
    console.log("addressCity2", addressDetails.address);
    // }
    if (addressDetails.city != null) {
      addressDetails.address =
        addressDetails.address + addressDetails.city + ", ";
    }
    if (addressDetails.state != null) {
      if (addressDetails.state.includes("emirates")) {
        addressDetails.state = addressDetails.state.replace("emirates", "");
      } else if (addressDetails.state.includes("emirate")) {
        addressDetails.state = addressDetails.state.replace("emirate", "");
      } else if (addressDetails.state.includes("Emirates")) {
        addressDetails.state = addressDetails.state.replace("Emirates", "");
      } else if (addressDetails.state.includes("Emirate")) {
        addressDetails.state = addressDetails.state.replace("Emirate", "");
      }
      if (addressDetails.state.toLowerCase().includes("umm al-quwain")) {
        addressDetails.state = addressDetails.state.replace("-", " ");
      }
      if (addressDetails.state.toLowerCase().includes("ras al-khaimah")) {
        addressDetails.state = addressDetails.state.replace("-", " ");
      }
      addressDetails.state = addressDetails.state.trim();
      addressDetails.address =
        addressDetails.address + addressDetails.state + ", ";
    }

    if (addressDetails.country != null) {
      addressDetails.address = addressDetails.address + addressDetails.country;
    }

    if (addressDetails.country != null) {
      addressDetails.combineAdd = `${addressDetails.city},${addressDetails.state},${addressDetails.country}`;
    }
    console.log("addressDetails56", addressDetails.combineAdd);
    setAddressDetail(addressDetails);
    dispatch(onadressData(addressDetails));
    // setProgress(false)
    // setAddressData(addressDetails)
    // dispatch()
    // console.log("addressdetail", addressDetails);
  };

  const onadressData = (data: AddressDetails) => {
    return {
      type: ActionTypes.MAPADDRESS,
      data,
    };
  };
  // const setAddressData = (addressDetails) => {
  //   dispatch(onadressData(addressDetails))
  // }
  const getAddress = async (e: any) => {
    console.log("address e----------->", e);
    setProgress(true)
    setRefresh(Math.floor(Math.random() * 100));
    console.log("call");

    const formData = new FormData();
    formData.append("latitude", e.latitude);
    formData.append("longitude", e.longitude);

    const res = await axios.get(
      `${addressMapURL}&point=${e.longitude},${e.latitude}`
    );
    console.log("getAddress res", res);
    if (res.status !== 200) {
      setProgress(false)
      return;
    } else {
      if (res.data.meta.code === 200) {
        if (!res.data.result || res.data.result === null) {
          setProgress(false)
          return;
        } else if (res.data.result.items.length > 0) {
          getAddressNamefromPlace(res.data.result.items[0]);
          setProgress(false)
          // setAddressDetail(res.result.items[0])
        } else if (res.data?.meta?.code === 404) {
          setProgress(false)
          toast("required_field", res.data.meta.error.message, "info");
          return;
        }
      } else {
        setProgress(false)
        return;
      }
    }

    // const requestData = {
    //   latitude: e.latitude,
    //   longitude: e.longitude
    // };
    // dispatch(
    //   AuthActions.getMapAddress(
    //     requestData,
    //     (res) => {
    //       console.log("Get AddressMap response-->", res);

    //       if (!res.status === 200) {
    //         return;
    //       } else {
    //         if (res.meta.code === 200) {
    //           if (!res.result || res.result === null) {
    //             return;
    //           }
    //           else if (res.result.items.length > 0) {
    //             getAddressNamefromPlace(res.result.items[0])
    //             // setAddressDetail(res.result.items[0])
    //           } else {
    //             toast(("required_field"), res.meta.error.message, "info");
    //             return;
    //           }
    //         } else {
    //           return;
    //         }
    //       }
    //     }
    //   )
    // );
  };

  // const checkArea = () => {
  //   // console.log("add coupon");

  //   // setProgress(true);
  //   dispatch(AuthActions.Maplocation((response) => {
  //     if (!response) {
  //       return;
  //     }
  //     console.log("Response", response);
  //     // setLocation(response.data)
  //     var builder = []
  //     var latlng = []
  //     for (var i = 0; i < response.data.length; i++) {
  //       var locationPoints = response.data[i].split(",");
  //       console.log("locationPoint", locationPoints);
  //       builder.push({ latitude: parseFloat(locationPoints[0]), longitude: parseFloat(locationPoints[1]) })
  //       latlng.push({ lat: parseFloat(locationPoints[0]), lng: parseFloat(locationPoints[1]) })
  //     }

  //     console.log("builder", builder);
  //     setBoundry(builder)
  //     let point = {
  //       lat: parseFloat(position.latitude.toFixed(6)),
  //       lng: parseFloat(position.longitude.toFixed(6))
  //     };
  //     console.log("point", point);
  //     // GeoFencing.containsLocation(point, latlng)
  //     //   .then(() => console.log('true'))
  //     //   .catch(() => console.log('false'))

  //   }))
  // };

  const dragMap = (e: any, isGesture: any) => {

    console.log("e", e);
    if (e.lat) {
      setPosition({ ...position, latitude: e.lat, longitude: e.lng });
    } else {
      setPosition(e);
    }
    isGesture = true;
    // setTimeout(() => {
    getAddress(e.lat ? { latitude: e.lat, longitude: e.lng } : e);
    // }, 5000)
  };

  return (
    <>
      {console.log("addressDetails", addressdetail)}
      {/* {
        boundryList.length === 0 ?
          <View></View> : */}

      {/* <> */}
      {position.latitude === null ? (
        <View></View>
      ) : (
        <>
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <MapView
              key={forceRefresh}
              provider={PROVIDER_GOOGLE}
              scrollEnabled={true}
              style={{ flex: 1 }}
              initialRegion={position}
              showsUserLocation={false}
              showsMyLocationButton={true}
              onRegionChangeComplete={(e, isGesture) => dragMap(e, isGesture)}
            ></MapView>

            <View style={{ position: "absolute", bottom: "50%", left: "50%" }}>
              <Image
                source={Images.pin}
                resizeMode="cover"
                style={{ width: 20, height: 50 }}
              />
            </View>
            <View style={style.searchView}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "metropolis",
                }}
              >
                Where do you need a delivery ?
              </Text>
              <View
                style={{
                  borderWidth: 0.5,
                  borderBottomColor: "black",
                  marginTop: 15,
                }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <GooglePlacesAutocomplete
                  placeholder="Search or move the map"
                  // returnKeyType={"search"}
                  minLength={3}
                  listViewDisplayed={false}
                  renderDescription={(row) => row.description}
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    dragMap(details?.geometry.location, null);
                    console.log("data", data, details);
                  }}
                  styles={{
                    container: {
                      width: 20,
                      marginLeft: -10,
                    },
                  }}
                  query={{
                    key: "asdfasdfasdfasdf",
                    language: "en",
                    // components: 'country:UAE',
                  }}
                />
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Images.Search />
                </View>
              </View>
            </View>
            <View style={theme.bottomView}>
              {/* <View style={{marginHorizontal: 50}}> */}
              <Text
                style={{
                  color: "white",
                  marginVertical: 10,
                  fontSize: 15,
                  fontFamily: "metropolis",
                  flex: 0.5,
                }}
              >
                Your delivery Location
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginBottom: 20,
                  fontSize: 15,
                  flex: 0.8,
                  fontFamily: "metropolis",
                }}
              >
                {addressdetail.address === null
                  ? "No Address Found"
                  : addressdetail.address}
              </Text>
              {/* </View> */}
              <ButtonView
                text="Confirm location"
                onPress={() =>
                  navigation.navigate({
                    name: "addressdetail",
                    params: {
                      addressdetail: addressdetail,
                      position: position,
                      addressId: addressId,
                      id: route.params.id
                    },
                    merge: true,
                  })
                }
              />
            </View>
          </View>
          <View style={style.locationBackView}>
            {/* <ImageView
              imageSource={Images.LeftBlackArrow}
              isSVG={false}
              width={50}
              tintColor='black'
              sizeMode='cover'
            /> */}
            {/* <Images.LeftArrow style={{ tintColor: "red" }} /> */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" color={BaseColor.purpleColor} size={25} />
            </TouchableOpacity>

            {isProgress && <ProgressView />}
            {/* <Text style={{ color: "red" }}>Hello</Text> */}
          </View>

        </>
      )}
    </>
    // <View style={{height: '100%'}}>
    //  <View style={style.locattionView}></View>
    // </View>
  );
};

export default Location;
