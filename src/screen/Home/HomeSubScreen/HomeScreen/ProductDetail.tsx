import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import useStyles from "../../Style";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BaseColor, font, FontFamily, getFontSize } from "../../../../config";
import { Button, ButtonView } from "../../../../components";
import { Images } from "../../../../Images";
import getHooks from "../../../../hooks";
import { TabRouter } from "@react-navigation/native";
import ApiHelper from "../../../../services/apiHelper";
import { GetProductDetailResponse } from "../../../../services/Responses/Home/GetProductDetail";
import ProgressView from "../../../../components/Organisms/progressView";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ActionTypes } from "../../../../action";
import { GetCartList2Response } from "../../../../services/Responses/Home/GetCategoryList2";
import { toastController } from "../../../../utils";
import { useDispatch } from "react-redux";
import Preferences from "../../../../services/preferences";
import { BaseResponse } from "../../../../services";
import { DeleteCartItemResponse } from "../../../../services/Responses/Home/DeleteCartItemResponse";
import getSelectedItemFromCart from "../../../Utils";
import { ScrollView } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";
import Swiper from "react-native-swiper";
import { USER_TYPE_CREDIT } from "../../../../services/ConstVariable";
import { hashKey } from "../../../../services/Constants";
import { showToast } from "../../../../utils/toastController";
import ProductBox from "./ProductBox";
import { scale } from "../../../../config/responsive";

const ProductDetail = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const style = useStyles();
  const hooks = getHooks();
  const { toast } = toastController();
  const dispatch = useDispatch();
  const quote_id = hooks.activeCart;
  const cartList = hooks.cartList;
  const recentlyViewed = hooks.recentlyViewed;

  const userData = hooks.user;
  const retailer_id = hooks.retailer_id;

  // const { navigation, item } = props;
  console.log("item", route);
  console.log("recentlyViewed", recentlyViewed);

  const [isProgress, setProgress] = useState<Boolean>(false);
  const [productDetailData, setProductDetailData] = useState<any>(null);
  const [count, setCount] = useState<string>("1");
  const [sliderImg, setSliderImg] = useState<any>([]);
  const [budge, setBudge] = useState<number>(0);
  const [btnBackground, setBtnBackground] = useState<boolean>(false);
  console.log("sliderImg", sliderImg);
  console.log("productDetailData", productDetailData);
  var cartItem: any
  console.log("cartItem", count);

  var itemId: any
  const budgecount = () => {
    var total = 0;
    for (var i = 0; i < cartList.length; i++) {
      total = total + cartList[i].qty;
    }
    setBudge(total);
    return console.log("total", total);
  };

  const dotView = () => {
    return <View style={styles.dot} />;
  };

  const activeDot = () => {
    return <View style={styles.activeDot} />;
  };

  const onRecentlyViewed = (data: any) => {
    console.log("data", data);

    return {
      type: ActionTypes.RECENTELYVIEWED,
      data,
    };
  };

  const buttonTheme = (result: any) => {
    console.log("result", result);

    if (result.customer_type === USER_TYPE_CREDIT) {
      if (result.credit_info.status) {
        setBtnBackground(true);
      } else {
        setBtnBackground(false);
      }
    } else {
      setBtnBackground(true);
    }
  };

  const onCartList = (data: any) => {
    return {
      type: ActionTypes.CART_LIST,
      data,
    };
  };

  const getCartList2 = async () => {
    console.log("--------called");

    setProgress(true);

    const apiCallObj = {
      hashkey: hashKey,
      quote_id: quote_id,
    };

    ApiHelper.getCartList2(apiCallObj).then((res: GetCartList2Response) => {
      console.log("Cart Api Call", res.data.items);

      if (res.success === 1) {
        dispatch(onCartList(res.data.items));
        Preferences.setCartListQtys(res.data.items.length);
        setProgress(false);
      } else if (res.success === 0) {
        toast("Msg", res.specification, "info");
      } else {
        toast("network_error", "network_msg", "info");
      }
    });
  };

  const addCartItemApiCall = async (item: any) => {
    // console.log("---props.data", data);

    setProgress(true);
    const apiCallObj = {
      hashkey: hashKey,
      customer_id: userData.id,
      sku: item.sku,
      qty: count,
    };

    ApiHelper.cartNew2(apiCallObj).then((res: BaseResponse) => {
      console.log("cart new2 res", res);
      if (res) {
        getCartList2();
        console.log("-----res", res);
        showToast(res.specification)
        // setCartData(res.data)
        setProgress(false);
      }
    });
  };

  const deleteCartItemApiCall = async (item: any) => {
    setProgress(true);

    const apiCallObj = {
      hashkey: hashKey,
      quote_id: quote_id,
      item_id: item,
    };

    ApiHelper.deleteCartItem(apiCallObj).then((res: DeleteCartItemResponse) => {
      console.log("delete Cart Item res", res);
      if (res.success === 1) {
        getCartList2();
        setProgress(false);
      } else if (res.success === 0) {
        showToast(res.specification);
      } else {
        showToast("network_msg");
      }
    });
  };

  const updateCartItemApiCall = async (
    id: any,
    qty: any,
    // id: string
  ) => {
    setProgress(true);
    console.log("item", count);

    // var qty = id === "1" ? JSON.parse(count) - 1 : JSON.parse(count) + 1;
    // console.log("itemQTY", qty);
    const apiCallObj = {
      hashkey: hashKey,
      quote_id: quote_id,
      item_id: id,
      customer_id: userData.id,
      qty: qty,
    };

    ApiHelper.updateCartItem(apiCallObj).then((res: GetCartList2Response) => {
      console.log("Update Cart Item res", res);
      if (res.success === 1) {
        getCartList2();
        showToast(res.specification);
        // dispatch(onMarketProduct(res));
        // getProductsData()
        // getstoreProductApiCall()
        // getMarketProductApiCall()
        setProgress(false);
      }
    });
  };

  const getProductDetailApiCall = async () => {
    setProgress(true);
    const apiCallObj = {
      hashkey: hashKey,
      barcode: route.params.sku,
      sku: route.params.sku,
      // retailerid: retailer_id,
      customer_id: userData.id,
    };

    ApiHelper.getProductDetail(apiCallObj).then(
      (res: GetProductDetailResponse) => {
        console.log("get product detail Item res", res);
        if (res.success === 1) {
          setProductDetailData(res.result);
          setProgress(false);
          buttonTheme(res.result);
        }
      }
    );
  };

  const checkSku = () => {
    if (recentlyViewed.length === 0) {
      dispatch(onRecentlyViewed(route.params.sku));
    } else if (recentlyViewed.includes(route.params.sku)) {
      console.log(
        "  recentlyViewed.includes(route.params.item.sku)",
        recentlyViewed.includes(route.params.sku)
      );
      return;
    } else {
      console.log("false", false);
      if (recentlyViewed.length === 10) {
        recentlyViewed.shift();
      }
      dispatch(onRecentlyViewed(route.params.sku));
    }
  };

  const favoriteProductApiCall = async (item: any) => {
    setProgress(true);
    console.log("favoriteItem", item);

    const apiCallObj = {
      hashkey: hashKey,
      productId: item.id,
      customerId: userData.id,
      favourite: item.favourite === 1 ? 0 : 1,
    };

    ApiHelper.favoriteProduct(apiCallObj).then((res: BaseResponse) => {
      console.log("update favorite product-===========>", res);
      if (res.success === "1") {
        setProgress(false);
        getProductDetailApiCall();
        // updateState();
        // dispatch(onActiveCart(res.result));
        // (res.result === null || res.result === 0 ? console.log("result is null or 0") : getCartList2(res.result)
        // )
      } else if (res.success === 0) {
        setProgress(false);
        showToast(res.specification);
      } else {
        setProgress(false);
        toast("network_error", "network_msg", "info");
      }
    });
  };

  useEffect(() => {
    checkSku();
    getProductDetailApiCall();
    budgecount();
  }, []);

  // const showqtyCount = () => {
  //   if (cartItem === null) {
  //     setCount("1");
  //     // selectedQty = 1;
  //   } else {
  //     setCount(JSON.stringify(cartItem?.qty));
  //     // selectedQty = cartItem.qty;
  //     itemId = cartItem.item_id;
  //   }

  // }
  // useEffect(() => {
  //   showqtyCount()
  // }, [cartItem])

  return (
    <>
      <View
        style={[style.mainView, { backgroundColor: BaseColor.purpleColor }]}
      >
        <SafeAreaView
          style={[
            style.mainView,
            {
              marginTop: StatusBar.currentHeight,
              backgroundColor: BaseColor.backGroundColor,
            },
          ]}
        >
          <View style={style.headerView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" color={"white"} size={25} />
            </TouchableOpacity>
            <View style={{ marginHorizontal: 6, width: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></View>
            </View>
            <TouchableOpacity
              style={{ position: "relative" }}
              onPress={() => navigation.navigate("cart")}
            >
              {budge > 0 && (
                <View
                  style={{
                    backgroundColor: "white",
                    position: "absolute",
                    width: 15,
                    height: 15,
                    top: -9,
                    left: 18,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      fontFamily: font(FontFamily.fontBold),
                    }}
                  >
                    {budge}
                  </Text>
                </View>
              )}
              <Images.CartIcon width={30} height={20} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {productDetailData === null ? (
              <View></View>
            ) : (
              <View style={{ flex: 1 }}>
                <FlatList
                  data={productDetailData}
                  renderItem={({ item }) => {
                    console.log("ProductDetailItem", item);

                    var selectedQty = 1;
                    var itemId = 0;
                    cartItem = getSelectedItemFromCart(
                      item.sku,
                      hooks.cartList
                    );
                    if (cartItem === null) {
                      setCount(count);
                      // selectedQty = 1;
                    } else {
                      setCount(JSON.stringify(cartItem.qty));
                      // selectedQty = cartItem.qty;
                      itemId = cartItem.item_id;
                    }

                    console.log("selectedQty", selectedQty);

                    var discount = item.price - item.special_price;
                    const per = (discount / item.price) * 100;
                    const persentage = Math.trunc(per);
                    console.log("discount", persentage);
                    return (
                      <View>
                        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                          <View style={[style.productView]}>
                            <View style={{ alignItems: 'flex-end' }}>
                              {item.favourite === 1 ? (
                                <TouchableOpacity
                                  onPress={() => favoriteProductApiCall(item)}
                                >
                                  <FontAwesome
                                    name="heart"
                                    size={20}
                                    color={BaseColor.purpleColor}
                                  />
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  onPress={() => favoriteProductApiCall(item)}
                                >
                                  <FontAwesome
                                    name="heart-o"
                                    size={20}
                                    color={BaseColor.purpleColor}
                                  />
                                </TouchableOpacity>
                              )}
                            </View>
                            <View
                              style={{
                                // flexDirection: "row",
                                // justifyContent: "space-between",
                              }}
                            >
                              {/* <View style={{}}></View> */}
                              <View style={{ width: '100%', height: scale(195) }}>
                                {/* {gallery_images()} */}
                                <Swiper
                                  horizontal={true}
                                  autoplay
                                  showsButtons={false}
                                  dot={dotView()}
                                  activeDot={activeDot()}
                                >
                                  {item.gallery_images.map &&
                                    item.gallery_images.map((item: any) => {
                                      return (
                                        <View>
                                          <Text> {item.url} </Text>
                                          <Image
                                            defaultSource={Images.PlaceHolderImage}
                                            style={{ width: '100%', height: scale(200), resizeMode: 'contain' }}
                                            source={{
                                              uri: item.media_images,
                                            }}
                                          />
                                        </View>
                                      );
                                    })}
                                </Swiper>
                              </View>
                              {/* {item.favourite === 1 ? (
                                <TouchableOpacity
                                  onPress={() => favoriteProductApiCall(item)}
                                >
                                  <FontAwesome
                                    name="heart"
                                    size={20}
                                    color={BaseColor.purpleColor}
                                  />
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  onPress={() => favoriteProductApiCall(item)}
                                >
                                  <FontAwesome
                                    name="heart-o"
                                    size={20}
                                    color={BaseColor.purpleColor}
                                  />
                                </TouchableOpacity>
                              )} */}
                            </View>
                            <View style={{ marginVertical: 20 }}>
                              <View
                                style={{
                                  backgroundColor: BaseColor.purpleColor,
                                  width: 60,
                                  padding: 5,
                                  borderRadius: 5,
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: getFontSize(10),
                                    color: "white",
                                  }}
                                >
                                  {persentage}% off
                                </Text>
                              </View>
                              <Text
                                style={{
                                  fontFamily: font(FontFamily.fontBold),
                                  fontSize: getFontSize(17),
                                  color: "black",
                                }}
                              >
                                {item.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <View style={{ justifyContent: "space-between" }}>
                                {/* {item.stock === 1 ? ( */}
                                <View
                                  style={{
                                    backgroundColor: BaseColor.purpleColor,
                                    width: 80,
                                    paddingVertical: 5,
                                    paddingHorizontal: 5,
                                    borderRadius: 5,
                                    alignItems: "center",
                                    marginVertical: 20,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: getFontSize(10),
                                      color: "white",
                                    }}
                                  >
                                    {item.stock === 1 ? "In Stock" : "Out Of Stock"}
                                  </Text>
                                </View>
                                {/* )  */}
                                {/* : (
                                <View style={{ height: 50 }}></View>
                              )} */}
                                <View style={{ justifyContent: "flex-end" }}>
                                  <Text
                                    style={{
                                      fontFamily: font(FontFamily.fontRegular),
                                      fontSize: getFontSize(16),
                                    }}
                                  >
                                    AED{" "}
                                    <Text
                                      style={{
                                        fontFamily: font(FontFamily.fontBold),
                                        fontSize: getFontSize(16),
                                      }}
                                    >
                                      {item.special_price.toFixed(2)}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: getFontSize(10),
                                        textDecorationLine: "line-through",
                                      }}
                                    >
                                      AED {item.price.toFixed(2)}
                                    </Text>
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  alignItems: "center",
                                  justifyContent: "flex-end",
                                }}
                              >
                                {selectedQty === 0 ? (
                                  <View style={{ height: 60 }}></View>
                                ) : (
                                  <View style={[style.actionIcon]}>
                                    {/* {selectedQty > 1 ? ( */}
                                    <TouchableOpacity
                                      onPress={() =>
                                        setCount(JSON.stringify(parseInt(count) - 1))
                                        // updateCartItemApiCall(itemId, parseInt(count) - 1,)
                                      }
                                    >
                                      <Images.Minus height={25} />
                                    </TouchableOpacity>
                                    {/* ) : (
                                    <TouchableOpacity
                                      onPress={() =>
                                        deleteCartItemApiCall(itemId)
                                      }
                                    >
                                      <Images.Delete height={25} />
                                    </TouchableOpacity>
                                  )} */}
                                  </View>
                                )}

                                <TextInput
                                  style={{
                                    marginVertical: 5,
                                    borderWidth: 2,
                                    width: 38,
                                    height: 30,
                                    borderColor: BaseColor.yellowColor,
                                    borderRadius: 5,
                                    fontFamily: font(FontFamily.fontBold),
                                    textAlign: "center",
                                    paddingVertical: 0,
                                    // fontWeight: "bold",
                                  }}
                                  keyboardType="numeric"
                                  // multiline
                                  value={count}
                                  onChangeText={(e) => setCount(e)}
                                  cursorColor={BaseColor.purpleColor}
                                />
                                <TouchableOpacity
                                  activeOpacity={0.1}
                                  onPress={() => setCount(JSON.stringify(parseInt(count) + 1))}
                                >
                                  <Images.Add height={25} />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                          <View>
                            <View
                              style={{
                                marginVertical: 15,
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              {item.description.length > 0 && <View>
                                <Text
                                  style={{
                                    fontSize: getFontSize(18),
                                    fontFamily: font(FontFamily.fontBold),
                                  }}
                                >
                                  Product Details
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: font(FontFamily.fontRegular),
                                  }}
                                >
                                  {item.description}
                                </Text>
                              </View>}
                              {item.loyality_points === "0" || item.loyality_points === null || item.loyality_points?.length < 0 || item.hasOwnProperty('loyality_points') === false ? <View></View> :
                                <View style={styles.main}>
                                  <View style={styles.pointView}>
                                    <Text
                                      style={{
                                        color: BaseColor.yellowColor,
                                        fontFamily: font(FontFamily.fontBold),
                                      }}
                                    >
                                      {item.loyality_points}
                                    </Text>
                                  </View>
                                </View>}
                            </View>
                            <ButtonView
                              text={`Add to Cart             AED ${(
                                item.special_price * parseInt(count)
                              ).toFixed(2)}`}
                              onPress={() => { addCartItemApiCall(item) }}
                              style={{
                                backgroundColor: btnBackground
                                  ? BaseColor.yellowColor
                                  : BaseColor.grayColor,
                              }}
                            />
                          </View>
                          <Text style={{ marginVertical: 10, fontFamily: font(FontFamily.fontBold), color: 'black' }}>Customers also bought</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>

                          <ProductBox
                            data={item.cross_sell}
                            id="1"
                            updateState={() => { }}
                            onEndReached={() => { }}
                          // getCartList2={() => getCartList2(quote_id)}
                          />
                        </View>
                      </View>
                    );
                  }}
                />

              </View>
            )}

          </ScrollView>
          {isProgress && <ProgressView />}
        </SafeAreaView>
      </View>
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  main: {
    height: 45,
    width: 45,
    backgroundColor: BaseColor.yellowColor,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  pointView: {
    height: 30,
    width: 30,
    backgroundColor: BaseColor.darkYellowColor,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  activeDot: {
    backgroundColor: BaseColor.purpleColor,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    // marginTop: 3,
    // marginBottom: heightPercentageToDP("1%"),
  },
  dot: {
    backgroundColor: "#9EABB7",
    opacity: 0.4,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    // marginRight: 3,
    // marginTop: 3,
    // marginBottom: heightPercentageToDP("1%"),
  },
});
