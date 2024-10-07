import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
  StatusBar,
  NativeModules,
  Platform,
  PermissionsAndroid,
  Linking,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-native-modal/dist/modal";
import Voice from '@react-native-community/voice';

import useStyles from "./Style";
import useStyle from "../Auth/style";
import ProductBox from "./HomeSubScreen/HomeScreen/ProductBox";

import Appicon from "../../assets/svgImage/App icon.svg";
import Search from "../../assets/svgImage/ic-search.svg";
import Camera from "../../assets/svgImage/ic-camera.svg";
import { ActionTypes } from "../../action";
import getHooks from "../../hooks";
import {
  baseURLImage,
  hashKey,
  ProductDetailURL,
  sendPopupCoupenCodeURL,
} from "../../services/Constants";
import ProgressView from "../../components/Organisms/progressView";
import api from "../../services/Common/Api";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BaseColor, font, FontFamily } from "../../config";
import { toastController } from "../../utils/toastController";
import { deviceHeight, deviceWidth, scale } from "../../config/responsive";
import SliderView from "../../components/Organisms/SliderView";
import ApiHelper from "../../services/apiHelper";
import { HomePageDataResponse } from "../../services/Responses/Home/HomePageDataResponse";
import {
  CategroyData,
  HomePageCategoryDataResponse,
} from "../../services/Responses/Home/HomePageCategoryResponse";
import {
  ProductsDataResponse,
  Result,
} from "../../services/Responses/Home/ProductsDataResponse";
import { StoreProductsDataResponse } from "../../services/Responses/Home/StoreProductsDataResponse";
import { MarketProductDetailsResponse } from "../../services/Responses/Home/MarketProductDetailsResponse";
import { StaticValueResponse } from "../../services/Responses/Home/StaticValueResponse";
import { ActiveCartResponse } from "../../services/Responses/Home/ActiveCartResponse";
import { useIsFocused } from "@react-navigation/native";
import DeleteModal from "../../components/Atoms/DeleteModal";
import { ButtonView, ImageView } from "../../components";
import { BaseResponse } from "../../services";
import Preferences from "../../services/preferences";
import axios from "axios";
import LiveAudioStream from 'react-native-live-audio-stream';
import { Images } from "../../Images";
import {request, PERMISSIONS} from 'react-native-permissions';
// import { Buffer } from 'buffer';

const Home = ({ navigation }: any) => {
  const style = useStyles();
  const styles = useStyle();
  const hooks = getHooks();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { toast } = toastController();

  // const CategoryList = hooks.categoryList;
  const quote_id = hooks.activeCart;
  const retailer_id = hooks.retailer_id;
  const HomeSlider = hooks.homePageBanner;
  const HotDealImg = hooks.homePageBanner.home_hot_deals_banner;
  const HomeFooter1 = hooks.homePageBanner.home_footer_banner_1;
  const HomeFooter2 = hooks.homePageBanner.home_footer_banner_2;
  const productDay = hooks.homePageBanner.home_product_of_the_day;
  const activeOffer = hooks.homePageBanner.home_rectangle_banner;
  const getProduct = hooks.getProduct;
  const storeProduct = hooks.storeProduct;
  const marketProduct = hooks.marketProduct;
  const recentlyView = hooks.recentlyViewed;

  const mobileNumber = "565911918";

  console.log("HomeSlider", HomeSlider);
  console.log("storeProduct-=============>", getProduct);
  console.log("storemarketProduct-============>", marketProduct);
  console.log("activeOffer-============>", activeOffer);

  console.log("quote_id", quote_id);

  const [isProgress, setProgress] = useState(false);
  const [CategoryList, setCategoryList] = useState<CategroyData[]>([]);
  const [HotDeals, setDeals] = useState(HotDealImg);
  const [recentlyViewed, setRecentlyViewed] = useState<Result[]>([]);
  const [isShowDialogue, setShowDialogue] = useState<boolean>(false);
  const [audioStream, setAudioStream] = useState<any>({ audioFile: "", recording: false, loaded: false });
  const [search,setSearch] = useState<string>("Search Products")
  const [loader,setLoader] = useState<boolean>(false)

  const userData = hooks.user;
  console.log("userData", userData);
  console.log("CategoryList=======>", hooks);
  console.log("isShowDialogue==>", isShowDialogue);

  // const requestMicrophone =  (permissions: any) => {
  //      request(permissions).then((result) => {
  //      console.log("permition result",result);
  //      })
  // }
  // useEffect(() => {
       
  //     }, []);
    
      const onSpeechStartHandler = (e:any) => {
        console.log("start handler==>>>", e);
      };
      const onSpeechEndHandler = (e:any) => {
        setLoader(false);
        console.log("stop handler", e);
      };
    
      const onSpeechResultsHandler = (e:any) => {
        let text = e.value[0];
        setSearch(text);
        console.log("speech result handler", text);
        navigation.navigate("searchdetail", { text: text });
      };
    
      const audioRecord = async () => {
        setLoader(true);
        console.log("start recording");
        
        try {
          await Voice.start("en-US");
        } catch (error) {
          console.log("error raised===>", error);
        }
      };
    
      const stopRecording = async () => {
        console.log("stop recording");
        
        try {
          await Voice.stop();
        } catch (error) {
          console.log("error raised", error);
        }
      };
    
      console.log("speech recognition");

  const audioRecord2 = async () => {
    console.log("check available");
    
    try {
    const check =  await Voice.isAvailable();
    console.log("check=====>", check);
    
    } catch (error) {
      console.log("error====>", error);
    }
  }

// console.log("speech recognition");
  // const audioRecord = () => {
  //   console.log("AUDIO data");
  //   const options = {
  //     sampleRate: 32000,  // default is 44100 but 32000 is adequate for accurate voice recognition
  //     channels: 1,        // 1 or 2, default 1
  //     bitsPerSample: 16,  // 8 or 16, default 16
  //     audioSource: 6,     // android only (see below)
  //     bufferSize: 4096    // default is 2048
  //   };

  //   LiveAudioStream.init(options);
  //   LiveAudioStream.on('data', data => {
  //     console.log("AUDIO data", data);
  //     var chunk = Buffer.from(data, 'base64');
  //     // console.log("chunk", chunk);

  //   });
  //   start()
  //   stop();
  //   // LiveAudioStream.start();
  //   // LiveAudioStream.stop();
  // }

  const start = () => {
    console.log("start Record");
    setAudioStream({ audioFile: "", recording: true, loaded: false });
    LiveAudioStream.start();
  }

  const stop = () => {
    console.log("stop Record");
    LiveAudioStream.stop();

  }
  useEffect(() => {
    console.log("call useEffect after change isfocused");
    getProductsData();
    getHomePageCategoryData();
    getstoreProductApiCall();
    recentlyViewedApiCall();
    getMarketProductApiCall();
    setSearch("Search Products");
  }, [isFocused]);

  const handleBannerClick = (item: any) => {
    console.log("banner item", item);
    // navigation.navigate('webview', { link: "https://google.com/" })
    if (item.type !== null) {
      if (item.type === "product") {
        navigation.navigate("productdetail", { sku: item.link });
      } else if (item.type === "category") {
        navigation.navigate("categorydetail", { id: item.link, name: "" });
      } else if (item.type === "external") {
        navigation.navigate("webview", { link: item.link });
      }
    }
  };

  const recentlyViewedApiCall = async () => {
    setProgress(true);
    const apiCallObj = {
      sku: recentlyView.toString(),
    };

    ApiHelper.recentlyViewed(apiCallObj).then((res: ProductsDataResponse) => {
      console.log("recently View Item res", res);
      if (res.success === 1) {
        setRecentlyViewed(res.result);
        setProgress(false);
      } else {
        setProgress(false);
      }
    });
  };

  const getHomePageCategoryData = async () => {
    setProgress(true);

    const apiCallObj = {
      hashkey: hashKey,
      retailer_id: retailer_id,
      customerId: userData.id,
    };

    ApiHelper.getHomePageCategoryData(apiCallObj).then(
      (res: HomePageCategoryDataResponse) => {
        if (res.success === 1) {
          setCategoryList(res.data);
          setProgress(false);
        } else if (res.success === 0) {
          toast("Msg", res.message, "info");
        } else {
          toast("network_error", "network_msg", "info");
        }
      }
    );
  };

  const onGetProduct = (data: any) => {
    console.log("data..................", data);
    return {
      type: ActionTypes.GET_PRODUCT,
      data,
    };
  };

  const getProductsData = async () => {
    setProgress(true);
    // const formData = new FormData();
    // formData.append("cat_id", "254");
    // formData.append("customerId", userData.id);
    // formData.append("retailer_id", retailer_id);
    // formData.append("page", "1");
    // const res = await api.post(`${ProductDetailURL}`, formData);

    const apiCallObj = {
      cat_id: "254",
      customerId: userData.id,
      retailer_id: retailer_id,
      page: "1",
    };

    ApiHelper.getProductsData(apiCallObj).then((res: ProductsDataResponse) => {
      console.log("Product res-->", res);
      if (res.success === 1) {
        dispatch(onGetProduct(res));
        setProgress(false);
      }
    });
  };

  const onStoreProduct = (data: any) => {
    console.log("data..................", data);
    return {
      type: ActionTypes.GET_STOREPRODUCT,
      data,
    };
  };

  const getstoreProductApiCall = async () => {
    setProgress(true);
    const formData = new FormData();
    formData.append("cat_id", "255");
    formData.append("customerId", userData.id);
    formData.append("retailer_id", retailer_id);
    formData.append("page", "1");
    const res = await api.post(`${ProductDetailURL}`, formData);

    const apiCallObj = {
      cat_id: "255",
      customerId: userData.id,
      retailer_id: retailer_id,
      page: "1",
    };

    ApiHelper.getStoreProductsData(apiCallObj).then(
      (res: StoreProductsDataResponse) => {
        console.log("Store Product res", res);
        if (res.success === 1) {
          dispatch(onStoreProduct(res));
          setProgress(false);
        }
      }
    );
  };

  const onMarketProduct = (data: any) => {
    console.log("data..................", data);
    return {
      type: ActionTypes.GET_MARKETPRODUCT,
      data,
    };
  };

  const getMarketProductApiCall = async () => {
    setProgress(true);
    // const formData = new FormData();
    // formData.append("cat_id", "256");
    // formData.append("customerId", userData.id);
    // formData.append("retailer_id", retailer_id);
    // formData.append("page", "1");
    // const res = await api.post(`${ProductDetailURL}`, formData);

    const apiCallObj = {
      cat_id: "256",
      customerId: userData.id,
      retailer_id: retailer_id,
      page: "1",
    };

    ApiHelper.getMarketProductsData(apiCallObj).then(
      (res: MarketProductDetailsResponse) => {
        console.log("Market Product res", res);
        if (res.success === 1) {
          dispatch(onMarketProduct(res));
          setProgress(false);
        }
      }
    );
  };

  const onHomePage = (data: any) => {
    console.log("data===========>", data);
    return {
      type: ActionTypes.HOMEPAGE_BANNER,
      data,
    };
  };

  const onAStaticValue = (data: any) => {
    return {
      type: ActionTypes.STATICVALUE,
      data,
    };
  };

  const staticValue = async () => {
    setProgress(true);

    const apiCallObj = {
      hashkey: hashKey,
    };

    ApiHelper.staticValue(apiCallObj).then((res: StaticValueResponse) => {
      console.log("Static Value Call-===========>", res);
      if (res.success === 1) {
        dispatch(onAStaticValue(res.data));
      } else if (res.success === 0) {
        toast("Msg", res.specification, "info");
      } else {
        toast("network_error", "network_msg", "info");
      }
    });
  };

  const sendpopupPromoCodeApiCall = async () => {
    const payload = {
      customer_email: userData.email,
    };
    const res = await axios.post(`${sendPopupCoupenCodeURL}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("send coupon Code Call-===========>", res);
    const tanDaysAdd = 10 * 24 * 60 * 60 * 1000;
    const convertMillisecond = new Date().getTime() + tanDaysAdd;
    Preferences.setActiveOfferTime(convertMillisecond);

    console.log("convertMillisecond", convertMillisecond);

    // toast("Msg", res.data.specification, "success");
    // setShowDialogue(false);
  };

  const closePopUp = () => {
    setShowDialogue(false);
    sendpopupPromoCodeApiCall();
  };

  const onActiveCart = (data: any) => {
    return {
      type: ActionTypes.ACTIVECART,
      data,
    };
  };

  const getActiveCart = async () => {
    setProgress(true);

    const apiCallObj = {
      customer_id: userData.id,
    };

    ApiHelper.getActiveCart(apiCallObj).then((res: ActiveCartResponse) => {
      console.log("Active cart Call-===========>", res);
      if (res.success === 1) {
        dispatch(onActiveCart(res.result));
        // (res.result === null || res.result === 0 ? console.log("result is null or 0") : getCartList2(res.result)
        // )
      } else if (res.success === 0) {
        toast("Msg", res.specification, "info");
      } else {
        toast("network_error", "network_msg", "info");
      }
    });
  };

  // const onCartList = (data: any) => {
  //   return {
  //     type: ActionTypes.CART_LIST,
  //     data,
  //   };
  // };

  // const getCartList2 = async (result: number) => {

  //   console.log("--------called");

  //   setProgress(true);

  //   const apiCallObj = {
  //     hashkey: "FpWLLg9RC958dsNICkXvyxbZZ189WA",
  //     quote_id: result
  //   };

  //   ApiHelper.getCartList2(apiCallObj).then((res: GetCartList2Response) => {
  //     console.log("Cart Api Call", res.data.items);

  //     if (res.success === 1) {
  //       dispatch(onCartList(res.data.items));
  //       Preferences.setCartListQtys(res.data.items)
  //       setProgress(false);

  //     } else if (res.success === 0) {
  //       toast("Msg", res.specification, "info");
  //     } else {
  //       toast("network_error", "network_msg", "info");
  //     }
  //   });

  // };
  const getActiveOffer = () => {
    return new Promise((resolve) => {
      Preferences.getActiveOfferTime().then((status: any) => {
        resolve(status);
      });
    });
  };

  const getHomePageData = async () => {
    var getTimefromPreference: number;
    getActiveOffer().then((time: any) => {
      getTimefromPreference = time;
      console.log("time", time);
      // console.log("getTimefromPreference", getTimefromPreference);
    });

    setProgress(true);

    const apiCallObj = {
      customerId: userData.id,
      retailer_id: retailer_id,
      version: "v2",
    };

    ApiHelper.getHomePageData(apiCallObj).then((res: HomePageDataResponse) => {
      if (res.success === 1) {
        dispatch(onHomePage(res.result));
        console.log(
          "getPreferences",
          getActiveOffer().then((status: any) => {
            console.log("status", status);
          })
        );
        console.log("res.result.home_rectangle_banner?", res);

        // if (res.result.home_rectangle_banner === undefined || res.result.home_rectangle_banner === null) {
        //   setShowDialogue(false)
        // } else {
        //   setShowDialogue(true)
        // }
        // if (res.result.home_rectangle_banner === undefined || res.result.home_rectangle_banner === null) {
        //   setShowDialogue(false)
        // } else if (new Date().getTime() > getTimefromPreference) {
        //   const threeHoursAdd = 3 * 60 * 60 * 1000;
        //   const convertMillisecond = new Date().getTime() + threeHoursAdd;
        //   Preferences.setActiveOfferTime(convertMillisecond);

        //   setShowDialogue(true)
        // } else {
        //   setShowDialogue(false)
        // }
        if (new Date().getTime() > getTimefromPreference) {
          console.log("getTimefromPreference", getTimefromPreference);
          // uncomment this line
          const threeHoursAdd = 3 * 60 * 60 * 1000;
          const convertMillisecond = new Date().getTime() + threeHoursAdd;
          Preferences.setActiveOfferTime(convertMillisecond);
          setShowDialogue(true);
        } else {
          setShowDialogue(false);
        }
      } else if (res.success === 0) {
        toast("Msg", res.message, "info");
      } else {
        toast("network_error", "network_msg", "info");
      }
    });
  };

  useEffect(() => {
    // requestMicrophone()
    setProgress(true);
    console.log("use effect");
    staticValue();
    getActiveCart();

    getHomePageData();
    getHomePageCategoryData();
    getProductsData();
    getstoreProductApiCall();
    getMarketProductApiCall();
    recentlyViewedApiCall();

    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
    // console.log("useFont()", useFont());
  }, []);

  // console.log("navigation22", navigation);
  return (
    <>
      {HomeSlider.length === 0 ? (
        <View></View>
      ) : (
        <View
          style={[style.mainView, { backgroundColor: BaseColor.purpleColor }]}
        >
          <SafeAreaView
            style={[
              style.mainView,
              {
              flex: 1,
              marginTop: StatusBar.currentHeight && StatusBar.currentHeight,
            }]}
          >
            <StatusBar backgroundColor={BaseColor.purpleColor} translucent/>

            <View
              style={{
                height: deviceHeight * 0.1,
                width: deviceWidth,
                backgroundColor: BaseColor.backGroundColor,
              }}
            >
              <View style={style.headerView}>
                <Appicon />
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("searchdetail")}
                >
                  <View style={[style.searchView, { marginRight: 6 }]}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Search />
                        <TextInput
                          style={style.inputText}
                          onPressIn={() => navigation.navigate("searchdetail",{text: ""})}
                          // value={mobile}
                          // onChangeText={setMobile}
                          placeholder={loader ? "Listening..." : search}
                          allowFontScaling={false}
                        ></TextInput>
                      </View>
                      <TouchableOpacity onPress={() => audioRecord()}>
                        <MaterialCommunityIcons name="microphone" size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                {/* <TouchableOpacity onPress={() => stopRecording()}>
                        <Text>Stop</Text>
                      </TouchableOpacity> */}
                {/* <View
                  style={{
                    backgroundColor: "white",
                    width: 40,
                    height: 40,
                    borderRadius: 44 / 2,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Camera />
                </View> */}
              </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
              <ScrollView>
                <View style={{ width: "100%", height: 200 }}>
                  <SliderView
                    data={HomeSlider.sliders}
                    handleBannerClick={(item: any) => handleBannerClick(item)}
                  />
                </View>

                <View style={{}}>
                  <View style={style.sectionHeaderView}>
                    <Text style={style.sectionHeader}>
                      {getProduct.category_name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("categorydetail", {
                          id: "254",
                          name: getProduct.category_name,
                        })
                      }
                    >
                      <Text style={style.sectionHeaderSeeall}>See all</Text>
                    </TouchableOpacity>
                  </View>
                  {getProduct.result === null ? (
                    <View></View>
                  ) : (
                    <ProductBox
                      // getCartList2={() => getCartList2(quote_id)}
                      data={getProduct.result}
                      id="1"
                      updateState={() => getProductsData()}
                      onEndReached={() => { }}
                    />
                  )}

                  <View style={style.sectionHeaderView}>
                    <Text style={style.sectionHeader}>Categories</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("categoryseeall")}
                    >
                      <Text style={style.sectionHeaderSeeall}>See all</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
                  <FlatList
                    horizontal={true}
                    data={CategoryList}
                    renderItem={({ item }) => {
                      return (
                        // console.log("item", item)
                        <>
                          <View style={{ paddingLeft: 10 }}>
                            <TouchableOpacity
                              style={style.CatagoryView}
                              onPress={() =>
                                navigation.navigate("categorydetail", {
                                  id: item.id,
                                  name: item.name,
                                })
                              }
                            >
                              <Image
                                source={{
                                  uri: `${baseURLImage}${item.thumbnail}`,
                                }}
                                style={{ height: 50, width: 50 }}
                              />
                            </TouchableOpacity>
                            <View style={style.CatagoryTextView}>
                              <Text style={style.CategoryText}>
                                {item.name}
                              </Text>
                            </View>
                          </View>
                        </>
                      );
                    }}
                    keyExtractor={(item, index) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                  />
                  {/* </ScrollView> */}
                  <View style={style.sectionHeaderView}>
                    <Text style={style.sectionHeader}>
                      {storeProduct.category_name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("categorydetail", {
                          id: "255",
                          name: storeProduct.category_name,
                        })
                      }
                    >
                      <Text style={style.sectionHeaderSeeall}>See all</Text>
                    </TouchableOpacity>
                  </View>
                  {storeProduct.result === null ? (
                    <View></View>
                  ) : (
                    <ProductBox
                      data={storeProduct.result}
                      id="1"
                      updateState={() => getstoreProductApiCall()}
                      onEndReached={() => { }}
                    // getCartList2={() => getCartList2(quote_id)}
                    />
                  )}
                  <View style={style.sectionHeaderView}>
                    <Text style={style.sectionHeader}>Hot Deals</Text>
                    {/* <Text
                    style={style.sectionHeaderSeeall}
                  >
                    See all
                  </Text> */}
                  </View>
                  <View
                    style={{
                      height: 140,
                      flex: 1,
                      width: "100%",
                      // paddingRight: 10,
                    }}
                  >
                    <FlatList
                      horizontal={true}
                      data={HotDeals}
                      renderItem={({ item }) => {
                        console.log("hot deals item item", item);
                        return (
                          <>
                            <View style={{ paddingLeft: 10, marginLeft: 5 }}>
                              <TouchableOpacity
                                onPress={() => handleBannerClick(item)}
                              >
                                <Image
                                  source={{ uri: item.image }}
                                  style={{ height: "100%", width: 300 }}
                                />
                              </TouchableOpacity>
                            </View>
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                  <View style={style.sectionHeaderView}>
                    <Text style={style.sectionHeader}>Product of The Day</Text>
                    {/* <Text
                    style={style.sectionHeaderSeeall}
                  >
                    See all
                  </Text> */}
                  </View>
                  <View style={{ height: 140, flex: 1, width: "100%" }}>
                    <FlatList
                      horizontal={true}
                      data={productDay}
                      renderItem={({ item }) => {
                        return (
                          // console.log("item", item)
                          <>
                            <View style={{ paddingLeft: 20 }}>
                              <TouchableOpacity
                                onPress={() => handleBannerClick(item)}
                              >
                                <Image
                                  source={{ uri: item.image }}
                                  style={{
                                    height: "100%",
                                    width: 350,
                                    borderRadius: 10,
                                    resizeMode: 'contain'
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                  <View style={style.sectionHeaderView}>
                    <Text style={style.sectionHeader}>Recently Viewed</Text>
                  </View>
                  {recentlyView.length > 0 && (
                    <ProductBox
                      data={recentlyViewed}
                      id="1"
                      updateState={() => { }}
                      onEndReached={() => { }}
                    />
                  )}

                  <View
                    style={{
                      height: 90,
                      flex: 1,
                      width: "100%",
                      paddingRight: 20,
                      marginVertical: 10,
                    }}
                  >
                    <FlatList
                      horizontal={true}
                      data={HomeFooter1}
                      renderItem={({ item }) => {
                        return (
                          // console.log("item", item)
                          <>
                            <View style={{ paddingLeft: 20 }}>
                              <View>
                                <Image
                                  source={{ uri: item.image }}
                                  style={{
                                    height: "100%",
                                    width: 350,
                                    borderRadius: 20,
                                  }}
                                />
                              </View>
                            </View>
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>

                  <View style={style.sectionHeaderView}>
                    <Text style={style.sectionHeader}>
                      {marketProduct.category_name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("categorydetail", {
                          id: "254",
                          name: marketProduct.category_name,
                        })
                      }
                    >
                      <Text style={style.sectionHeaderSeeall}>See all</Text>
                    </TouchableOpacity>
                  </View>
                  {storeProduct.result === null ? (
                    <View></View>
                  ) : (
                    <ProductBox
                      data={marketProduct.result}
                      id="1"
                      updateState={() => getMarketProductApiCall()}
                      onEndReached={() => { }}
                    // getCartList2={() => getCartList2(quote_id)}
                    />
                  )}
                  <View
                    style={{
                      height: 90,
                      flex: 1,
                      width: "100%",
                      paddingRight: 20,
                      marginVertical: 10,
                    }}
                  >
                    <FlatList
                      horizontal={true}
                      data={HomeFooter2}
                      renderItem={({ item }) => {
                        return (
                          // console.log("item", item)
                          <>
                            <View style={{ paddingLeft: 20 }}>
                              <View>
                                <Image
                                  source={{ uri: item.image }}
                                  style={{
                                    height: "100%",
                                    width: 350,
                                    borderRadius: 20,
                                  }}
                                />
                              </View>
                            </View>
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                </View>
              </ScrollView>
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
            </View>
            {activeOffer === undefined ? <View></View> : <Modal
              style={{ margin: 15 }}
              isVisible={isShowDialogue}
              useNativeDriver={true}
              hideModalContentWhileAnimating
              onBackdropPress={() => setShowDialogue(false)}
            >
              <View
                style={[
                  // style,
                  {
                    display: "flex",
                    width: "95%",
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    alignSelf: "center",
                  },
                ]}
              >
                <View
                  style={{
                    justifyContent: "center",
                    padding: 15,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      backgroundColor: "#7146A233",
                      height: 100,
                      // width: deviceWidth,
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 30,
                      // borderRadius: 50,
                    }}
                  >
                    <Image
                      source={{ uri: activeOffer[0].image }}
                      style={{ width: 300, height: "100%" }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 15,
                      width: deviceWidth * 0.9,
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <ButtonView
                      text={activeOffer[0].button}
                      onPress={() => closePopUp()}
                      style={{ height: 40, width: 300, borderRadius: 8 }}
                    />
                  </View>
                </View>
              </View>
            </Modal>}
            {isProgress && <ProgressView />}
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

export default Home;


// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Image,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator
// } from "react-native";
// import Voice from "@react-native-community/voice";

// const Home = () => {
//   const [result, setResult] = useState("");
//   const [isLoading, setLoading] = useState(false);

//   console.log("result",result);
  

//   useEffect(() => {
//     Voice.onSpeechStart = onSpeechStartHandler;
//     Voice.onSpeechError = onSpeechEndHandler;
//     Voice.onSpeechResults = onSpeechResultsHandler;

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const onSpeechStartHandler = (e:any) => {
//     console.log("start handler==>>>", e);
//   };
//   const onSpeechEndHandler = (e:any) => {
//     setLoading(false);
//     console.log("stop handler", e);
//   };

//   const onSpeechResultsHandler = (e:any) => {
//     let text = e.value[0];
//     setResult(text);
//     console.log("speech result handler", text);
//   };

//   const startRecording = async () => {
//     // setLoading(true);
//     console.log("start recording");
    
//     try {
//       await Voice.start("en-US");
//     } catch (error) {
//       console.log("error raised", error);
//     }
//   };

//   const stopRecording = async () => {
//     console.log("stop recording");
    
//     try {
//       await Voice.stop();
//     } catch (error) {
//       console.log("error raised", error);
//     }
//   };

//   console.log("speech recognition");

//   return (
//     <View style={styles.container}>
//       <SafeAreaView>
//         <Text style={styles.headingText}>Speech Recoginition</Text>
//         <View style={styles.textInputStyle}>
//           <TextInput
//             value={result}
//             placeholder="your text"
//             style={{ flex: 1 }}
//             onChangeText={(text) => setResult(text)}
//           />
//           {isLoading ? (
//             <ActivityIndicator size="large" color="red" />
//           ) : (
//             <TouchableOpacity onPress={startRecording}>
//               <Image
//                 source={{
//                   uri:
//                     "https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png"
//                 }}
//                 style={{ width: 25, height: 25 }}
//               />
//             </TouchableOpacity>
//           )}
//         </View>

//         <TouchableOpacity
//           style={{
//             alignSelf: "center",
//             marginTop: 24,
//             backgroundColor: "red",
//             padding: 8,
//             borderRadius: 4
//           }}
//           onPress={stopRecording}
//         >
//           <Text style={{ color: "white", fontWeight: "bold" }}>Stop</Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24
//   },
//   headingText: {
//     alignSelf: "center",
//     marginVertical: 26,
//     fontWeight: "bold",
//     fontSize: 26
//   },
//   textInputStyle: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "white",
//     height: 48,
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 2,
//     elevation: 2,
//     shadowOpacity: 0.4
//   }
// });

// export default Home;
