import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollViewComponent,
  ScrollView,
  SafeAreaView,
  StatusBar,
  InteractionManager,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal/dist/modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import useStyles from "../../Style";
import { Images } from "../../../../Images";
import { ButtonView } from "../../../../components";
import getHooks from "../../../../hooks";
import { useDispatch } from "react-redux";
import { ActionTypes, HomeActions } from "../../../../action";
import { BaseColor, font, FontFamily } from "../../../../config";
import ProgressView from "../../../../components/Organisms/progressView";
import DeleteModal from "../../../../components/Atoms/DeleteModal";
import {
  AddressListURL,
  defaultAddressURL,
  deleteAddressURL,
  hashKey,
} from "../../../../services/Constants";
import api from "../../../../services/Common/Api";
import { toastController } from "../../../../utils/toastController";
import { deviceHeight, scale } from "../../../../config/responsive";

const ManageAdd = ({ navigation, route }: any) => {
  const style = useStyles();
  const hooks = getHooks();
  const dispatch = useDispatch();
  const { toast } = toastController();
  const isFocused = useIsFocused();

  const customerId = hooks.user;
  const addresslist = hooks.addressList;
  const selectedAddId = hooks.selectedAddId;

  console.log("selectedAddId", selectedAddId);

  console.log("addressList", addresslist);
  console.log("customerId", customerId);
  const [deleteId, setDeleteId] = useState(false);
  const [isShowDeleteModal, setShowDeleteModal] = useState(false);
  const [isProgress, setProgress] = useState(true);
  const [id, setId] = useState(selectedAddId);

  console.log("isShowDeleteModal", isShowDeleteModal);
  console.log("route", route);

  const onAddressList = (data: any) => {
    console.log("data", data);
    return {
      type: ActionTypes.ADDRESS_LIST,
      data,
    };
  };
  const addressListApiCall = async () => {
    setProgress(true);
    const formData = new FormData();
    formData.append("hashkey", hashKey);
    formData.append("customerId", customerId.id);
    const res = await api.post(`${AddressListURL}`, formData);
    console.log("res", res);
    if (res.data.success === 1) {
      setProgress(false);
      dispatch(onAddressList(res.data.result));
      // navigation.navigate("otpverify", { mobile: mobile });
    } else if (res.data.success === 0) {
      toast("Msg", res.data.specification, "info");
    } else {
      toast("network_error", "network_msg", "info");
    }
    // const requestBody = {
    //     hashkey: "FpWLLg9RC958dsNICkXvyxbZZ189WA",
    //     customerId: customerId.id
    // };
    // setProgress(true);
    // dispatch(HomeActions.AddressList(requestBody, (response) => {
    //     if (!response) {
    //         return;
    //     }
    //     if (response && response.success === 1) {
    //         setProgress(false)
    //         // latlng()
    //     }
    //     console.log("Response", response);
    // }))
  };

  useEffect(() => {
    // InteractionManager.runAfterInteractions(() => {
    setProgress(true);
    addressListApiCall();
    // });
  }, [isFocused]);

  const openDeleteModel = (item: any) => {
    console.log(item);
    setShowDeleteModal(true);
    setDeleteId(item);
  };

  const selecetAddress = (item: any) => {
    navigation.navigate("cart", { item: item });
  };

  const deleteaddressListApiCall = async () => {
    setProgress(true);
    console.log("deleteId", deleteId);
    const formData = new FormData();
    formData.append("hashkey", hashKey);
    formData.append("addressID", deleteId);
    const res = await api.post(`${deleteAddressURL}`, formData);
    console.log("res", res);
    if (res && res.data.success === 1) {
      setProgress(false);
      addressListApiCall();
    } else {
      toast("network_error", "Please Check Your Network", "info");
    }
  };

  const defaultaddressListApiCall = async (item: any) => {
    setProgress(true);
    const formData = new FormData();
    formData.append("customerId", customerId.id);
    formData.append("addressId", item);
    const res = await api.post(`${defaultAddressURL}`, formData);
    console.log("res", res);
    if (res && res.data.success === 1) {
      addressListApiCall();
    } else {
      toast("network_error", "Please Check Your Network", "info");
    }
  };

  return (
    <>
      {/* <View
        style={[style.mainView, { backgroundColor: BaseColor.purpleColor }]}
      > */}
      <SafeAreaView
        style={[
          style.mainView,
          {
            marginTop: StatusBar.currentHeight,
            backgroundColor: BaseColor.backGroundColor,
          },
        ]}
      >
        {isShowDeleteModal && (
          <DeleteModal
            image={<Images.Delete width={50} height={40} />}
            headerText={"Confirmation"}
            text={"Are you sure you want to Delete an Address ?"}
            isShowDeleteModal={isShowDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            onPress={() => (
              setShowDeleteModal(false), deleteaddressListApiCall()
            )}
          />
        )}
        <View style={[style.headerView, { justifyContent: "flex-start" }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" color={"white"} size={25} />
          </TouchableOpacity>
          <Text style={style.headerTextView}>Manage Addresses</Text>
        </View>
        <View style={{ flex: 10, marginHorizontal: 12, marginTop: 10 }}>
          {/* <ScrollView> */}
          {route.params.id === 1 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={addresslist}
              renderItem={({ item }) => {
                return (
                  <>
                    <View
                      style={[
                        style.addressView,
                        {
                          borderColor:
                            item.IsDefaultBilling &&
                            item.IsDefaultShipping &&
                            BaseColor.yellowColor,
                          borderWidth:
                            item.IsDefaultBilling &&
                            item.IsDefaultShipping &&
                            4,
                        },
                      ]}
                    >
                      <View>
                        <View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View>
                              <Text
                                style={{
                                  fontFamily: font(FontFamily.fontBold),
                                  fontSize: 15,
                                  color: "black",
                                  fontWeight: "bold",
                                  marginVertical: 5,
                                }}
                              >
                                {item.address_type}
                              </Text>
                            </View>
                            {item.IsDefaultBilling &&
                              item.IsDefaultShipping && (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginVertical: 5,
                                  }}
                                >
                                  <Images.Check />
                                  <Text
                                    style={{
                                      marginHorizontal: 8,
                                      color: BaseColor.blackColor,
                                      // fontWeight: "bold",
                                      fontFamily: font(FontFamily.fontBold),
                                    }}
                                  >
                                    Default
                                  </Text>
                                </View>
                              )}
                          </View>
                          <Text
                            style={{
                              fontFamily: font(FontFamily.fontBold),
                              fontSize: 15,
                              color: "black",
                              fontWeight: "bold",
                            }}
                          >
                            {`${item.firstname} ${item.lastname}`}
                          </Text>
                          <Text
                            style={{
                              fontFamily: font(FontFamily.fontRegular),
                              color: "black",
                            }}
                          >
                            {`${item.street}`}
                          </Text>
                          <Text
                            style={{
                              fontFamily: font(FontFamily.fontRegular),
                              color: "black",
                            }}
                          >
                            {`${item.city},${item.region.region} `}
                          </Text>
                          <Text
                            style={{
                              fontFamily: font(FontFamily.fontRegular),
                              color: "black",
                            }}
                          >
                            {`${item.country_name}`}
                          </Text>
                          <Text
                            style={{
                              color: "black",
                              // fontWeight: "bold",
                              fontFamily: font(FontFamily.fontBold),
                            }}
                          >
                            {`${"+"}${item.telephone}`}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          alignItems: "flex-end",
                          flexDirection: "row-reverse",
                        }}
                      >
                        {item.IsDefaultBilling && item.IsDefaultShipping ? (
                          <View></View>
                        ) : (
                          <>
                            <TouchableOpacity
                              onPress={() => defaultaddressListApiCall(item.id)}
                            >
                              <Text
                                style={{
                                  color: BaseColor.purpleColor,
                                  fontWeight: "bold",
                                  fontFamily: font(FontFamily.fontBold),
                                }}
                              >
                                Set as Default
                              </Text>
                            </TouchableOpacity>
                            <View
                              style={{
                                borderLeftColor: BaseColor.purpleColor,
                                borderWidth: 1,
                                height: 17,
                                marginHorizontal: 10,
                              }}
                            ></View>
                            <TouchableOpacity
                              onPress={() => openDeleteModel(item.id)}
                            >
                              <Ionicons name="trash-outline" color={BaseColor.purpleColor} size={20} />
                              {/* <Images.Delete width={20} height={15} /> */}
                            </TouchableOpacity>
                            <View
                              style={{
                                borderLeftColor: BaseColor.purpleColor,
                                borderWidth: 1,
                                height: 17,
                                marginHorizontal: 10,
                              }}
                            ></View>
                          </>
                        )}
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("location", {
                              item: item,
                              from: "list",
                              id: route.params.id,
                            })
                          }
                        >
                          <Images.Edit width={20} height={15} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                );
              }}
            />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={addresslist}
              renderItem={({ item }) => {


                return (
                  <View
                    style={[
                      style.addressView,
                      {
                        // borderColor:
                        //   item.IsDefaultBilling &&
                        //   item.IsDefaultShipping &&
                        //   BaseColor.yellowColor,
                        // borderWidth:
                        //   item.IsDefaultBilling &&
                        //   item.IsDefaultShipping &&
                        //   4,
                      },
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        // width: scale(30)
                      }}
                    >
                      <View style={{ width: scale(30) }}>
                        {item.id === id ? (
                          <TouchableOpacity onPress={() => setId(item.id)}>
                            <Images.Check />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity onPress={() => setId(item.id)}>
                            <Images.UnChack />
                          </TouchableOpacity>
                        )}
                      </View>
                      <View style={{ width: scale(250) }}>
                        <View>
                          <Text
                            style={{
                              fontFamily: font(FontFamily.fontBold),
                              fontSize: 15,
                              color: "black",
                              fontWeight: "bold",
                              marginVertical: 5,
                            }}
                          >
                            {item.address_type}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        ></View>
                        <Text
                          style={{
                            fontFamily: font(FontFamily.fontBold),
                            fontSize: 15,
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          {`${item.firstname} ${item.lastname}`}
                        </Text>
                        <Text
                          style={{
                            fontFamily: font(FontFamily.fontRegular),
                            color: "black",
                          }}
                        >
                          {`${item.street}`}
                        </Text>
                        <Text
                          style={{
                            fontFamily: font(FontFamily.fontRegular),
                            color: "black",
                          }}
                        >
                          {`${item.city}, ${item.region.region}`}
                        </Text>
                        <Text
                          style={{
                            fontFamily: font(FontFamily.fontRegular),
                            color: "black",
                          }}
                        >
                          {`${item.country_name}`}
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            // fontWeight: "bold",
                            fontFamily: font(FontFamily.fontBold),
                          }}
                        >
                          {`${"+"}${item.telephone}`}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: "flex-end",
                          flexDirection: "row-reverse",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("location", {
                              item: item,
                              from: "list",
                              id: route.params.id,
                            })
                          }
                        >
                          <Images.Edit width={20} height={15} />
                        </TouchableOpacity>
                        {/* <Images.check /> */}
                      </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                      {item.id === id && (
                        <ButtonView
                          text="Select this address"
                          style={{ height: 40 }}
                          onPress={() => selecetAddress(item.id)}
                        />
                      )}
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 15,
            marginVertical: 7,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonView
            text={` +  Add New Address`}
            onPress={() =>
              navigation.navigate("location", { id: route.params.id })
            }
          />
        </View>
        {/* </ScrollView> */}
        {isProgress && <ProgressView />}
      </SafeAreaView >
      {/* </View> */}
    </>
  );
};

export default ManageAdd;

const styles = StyleSheet.create({});
