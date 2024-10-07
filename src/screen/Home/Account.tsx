import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { BaseColor, font, FontFamily } from "../../config";
import getHooks from "../../hooks/index";
import useStyles from "./Style";

import { useDispatch } from "react-redux";
import { ActionTypes } from "../../action";
import { ButtonView, ImageView } from "../../components";
import { Images } from "../../Images";
import DeleteModal from "../../components/Atoms/DeleteModal";
import { BaseResponse, RegisterResponse } from "../../services";
import ApiHelper from "../../services/apiHelper";
import ProgressView from "../../components/Organisms/progressView";
import { USER_TYPE_CREDIT } from "../../services/ConstVariable";
import { RewardPointsCasesResponse } from "../../services/Responses/Home/RewardPointsCasesResponse";
import { hashKey } from "../../services/Constants";
import { scale } from "../../config/responsive";

const Account = ({ navigation }: any) => {
  const style = useStyles();
  const hooks = getHooks();
  const dispatch = useDispatch();
  const user = hooks.user;
  const rewardPointsCases = hooks.rewardPointsCases;

  console.log("hooks", rewardPointsCases);
  const mobileNumber = "565911918";
  // const { signOut } = React.useContext(AuthContext);
  const [isProgress, setProgress] = useState<Boolean>(false);
  const [profileList, setProfileList] = useState([
    {
      name: "Profile Details",
      navigation: "profiledetail",
      icon: Images.ProfileDetail,
      isShow: true,
    },
    {
      name: "My Favorites",
      navigation: "favorite",
      icon: Images.MyFavorite,
      isShow: true,
    },
    {
      name: "My Orders",
      navigation: "myOrders",
      icon: Images.PurpleorderIcon,
      isShow: true,
    },
    {
      name: "Set Basket",
      navigation: "basket",
      icon: Images.PurpleBasketIcon,
      isShow: true,
    },
    {
      name: "My Subscription",
      navigation: "",
      icon: Images.PurpleBasketIcon,
      isShow: true,
    },
    {
      name: "Manage Addresses",
      navigation: "manageaddress",
      icon: Images.LocationIcon,
      isShow: true,
    },
    {
      name: "Credit Form",
      navigation: "creditform",
      icon: Images.Credit,
      isShow: true,
    },
    {
      name: "Credit",
      navigation: "credit",
      icon: Images.Credit,
      isShow: false,
    },
    {
      name: "My Reward Points",
      navigation: "myrewards",
      icon: Images.Credit,
      isShow: true,
    },
    {
      name: "Additional Services ",
      navigation: "additionalservice",
      icon: Images.Credit,
      isShow: true,
    },
    {
      name: "Delete Account",
      navigation: "",
      icon: Images.ProfileDetail,
      isShow: true,
    },
  ]);

  const [isShowLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);

  console.log("ProfileList", profileList);

  const onLogOut = () => {
    return {
      type: ActionTypes.LOGOUT,
    };
  };

  const logOutApiCall = () => {
    // console.log("add coupon");
    // const requestBody = {
    //   hashkey: "FpWLLg9RC958dsNICkXvyxbZZ189WA",
    //   retailer_id: '28'
    // };
    // setProgress(true);
    dispatch(onLogOut());
    // HomeActions.CategoryList(requestBody, (response: CategoryListResponse) => {
    // }))
  };

  const deleteAccountApiCall = async () => {
    setProgress(true);

    const apiCallObj = {
      customer_id: user.id
    };

    ApiHelper.deleteAccount(apiCallObj).then((res: BaseResponse) => {
      console.log("delete account response", res);

      if (res.success === 1) {
        // dispatch(onRewardPointsCases(res.data));
        dispatch(onLogOut());
        navigation.navigate("signinHome");
        setProgress(false);
      } else if (res.success === 0) {
        setProgress(false);
      } else {
      }
    });
  };

  const onLogin = (data: any) => {
    console.log("login Data", data);

    return {
      type: ActionTypes.REGISTER,
      data,
    };
  };

  // const checkType = (rewardPoints: any) => {
  //   console.log("rewardPoints", rewardPoints);

  //   // CREDIT
  //   if (user.customer_type === USER_TYPE_CREDIT) {
  //     profileList.splice(7, 1)

  //     // setProfileList(updateProfileList);


  //   } else {
  //     return;
  //   }
  //   // REWARD POINTS
  //   if (rewardPoints.can_use_reward === true) {
  //     return profileList;
  //   } else {
  //     profileList.splice(8, 1)
  //   }
  //   console.log("updateProfileList", profileList);
  // };

  const checkType = (rewardPoints: any) => {
    console.log("rewardPoints", rewardPoints);

    // CREDIT
    if (user.customer_type === USER_TYPE_CREDIT) {
      // profileList.splice(6, 1)
      const updateProfileList = profileList.map((item) => {
        if (item.name === "Credit") {
          return {
            ...item,
            isShow: false,
          };
        } else {
          return item;
        }
      });
      setProfileList(updateProfileList);
    } else {
      return;
    }
    // REWARD POINTS
    if (rewardPoints.can_use_reward === true) {
      return profileList;
    } else {
      const updateProfileList = profileList.map((item) => {
        if (item.name === "My Reward Points") {
          return {
            ...item,
            isShow: false,
          };
        } else {
          return item;
        }
      });
      setProfileList(updateProfileList);
    }
  };

  const onRewardPointsCases = (data: any) => {
    console.log("data===========>", data);
    return {
      type: ActionTypes.REWARDPOINTSCASES,
      data,
    };
  };

  const getRewardPointsCasesapiCall = async () => {
    setProgress(true);
    console.log("reward points cases api call");

    const apiCallObj = {
      hashkey: hashKey,
      point_style: "spending",
    };

    ApiHelper.rewardPointsCases(apiCallObj).then(
      (res: RewardPointsCasesResponse) => {
        console.log("rewardPointsCases", res);

        if (res.success === 1) {
          dispatch(onRewardPointsCases(res.data));
          checkType(res.data);
          setProgress(false);
        } else if (res.success === 0) {
          setProgress(false);
        } else {
          setProgress(false);
        }
      }
    );
  };

  const getProfileApiCall = async () => {
    setProgress(true);
    const apiCallObj = {
      customer_id: user.id,
    };

    ApiHelper.getProfileData(apiCallObj).then((res: RegisterResponse) => {
      console.log("get profile res", res);
      if (res.success === 1) {
        dispatch(onLogin(res));
        getRewardPointsCasesapiCall();
        // checkType();
        setProgress(false);
      } else {
        setProgress(false);
      }
    });
  };

  useEffect(() => {
    getProfileApiCall();
  }, []);

  const navigateScreen = (item: any) => {
    if (item.navigation === "manageaddress") {
      navigation.navigate(item.navigation, { id: 1 });
    } else if (item.name === "Delete Account") {
      setIsDeleteModalVisible(true)
    } else {
      navigation.navigate(item.navigation);
    }
  };
  const divider = () => {
    return (
      <View style={style.dividerView}></View>
    )
  }
  return (
    <View style={[style.mainView, { backgroundColor: BaseColor.purpleColor }]}>
      <SafeAreaView
        style={[
          style.mainView,
          {
            marginTop: StatusBar.currentHeight,
            backgroundColor: BaseColor.purpleColor,
          },
        ]}
      >
        {/* <View style={[style.headerView]}> */}
        {/*<View style={{
            marginVertical: 20, marginHorizontal: 20, alignItems: 'flex-start',
            flexDirection: 'row',
          }}>
            <Avtar /> */}
        <View
          style={{
            alignItems: "flex-start",
            marginVertical: 20,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{ color: "white", fontSize: 20, fontFamily: "metropolis" }}
          >{`${user.firstname} ${user.lastname}`}</Text>
          <Text style={{ color: "white" }}>{user.email}</Text>
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            backgroundColor: BaseColor.whiteColor,
            paddingBottom: 10,
            paddingHorizontal: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {/* <FlatList
            data={profileList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>{item.name}</Text>
                  <View style={style.dividerView}></View>
                </View>
              )
            }}
          /> */}
          <FlatList
            data={profileList}
            // ItemSeparatorComponent={divider}
            renderItem={({ item }) => {
              return (
                <>
                  {item.isShow === true && (
                    <View>
                      <TouchableOpacity
                        style={{}}
                        onPress={() => navigateScreen(item)}
                        activeOpacity={0.5}
                      >
                        <View
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 20,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <item.icon height={20} width={30} />
                            <Text
                              style={[
                                style.profileView,
                                {
                                  marginHorizontal: 5,
                                  fontFamily: font(FontFamily.fontBold),
                                },
                              ]}
                            >
                              {item.name}
                            </Text>
                          </View>
                          <View>
                            <Images.profileRightArrow />
                          </View>
                        </View>
                      </TouchableOpacity>

                      <View style={style.dividerView}></View>
                    </View>
                  )}
                </>
              );
            }}
            contentContainerStyle={{
              paddingTop: 20,
            }}
            showsVerticalScrollIndicator={false}
          />
          <ButtonView
            text="Log Out"
            onPress={() => setShowLogoutModal(true)}
            style={{}}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {isDeleteModalVisible && (
            <DeleteModal
              image={<Images.Delete width={50} height={40} />}
              headerText={"Delete Account"}
              text={"Are you sure you want to delete account ?"}
              isShowDeleteModal={isDeleteModalVisible}
              setShowDeleteModal={setIsDeleteModalVisible}
              onPress={() => (setIsDeleteModalVisible(false), deleteAccountApiCall())}
            />
          )}
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {isShowLogoutModal && (
            <DeleteModal
              image={<Images.Logout width={50} height={40} color={"red"} />}
              headerText={"Log Out"}
              text={"Are you sure you want to sign out ?"}
              isShowDeleteModal={isShowLogoutModal}
              setShowDeleteModal={setShowLogoutModal}
              onPress={() => (setShowLogoutModal(false), logOutApiCall())}
            />
          )}
        </View>
        <TouchableOpacity
          style={{
            height: scale(50),
            width: scale(50),
            position: "absolute",
            bottom: 15,
            right: 15,
            // backgroundColor: "red",
          }}
          onPress={() => {
            let url = "whatsapp://send?text=" + "&phone=971" + mobileNumber;
            Linking.openURL(url)
              .then((data) => {
                console.log("WhatsApp Opened successfully " + data);
              })
              .catch(() => {
                Alert.alert("Make sure WhatsApp installed on your device");
              });
          }}
        >
          <ImageView
            imageSource={Images.WhatsAppIcon}
            height={scale(50)}
            width={scale(50)}
            isSVG={false}
          />
        </TouchableOpacity>
        {isProgress && <ProgressView />}
      </SafeAreaView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
