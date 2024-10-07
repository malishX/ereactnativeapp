import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";
import { deviceWidth, getFontSize, scale } from "../../../config/responsive";
import { BaseColor, font, FontFamily } from "../../../config";
import {
  BasketsList,
  Product,
  SubscriptionParams,
} from "../../../services/Responses/Accounts/Basket/BasketListResponse";
import { useTheme } from "../../../config/theme";
import { Images } from "../../../Images";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomButton from "../../Atoms/CustomButtonView";
import ImageView from "../../Atoms/imageView";
import { getTotalPriceString, isFloat } from "../../../utils/stringController";
import Entypo from "react-native-vector-icons/Entypo";
import { Result } from "../../../services/Responses/Home/ProductsDataResponse";
import useStyles from "../../../screen/Home/Style";
import getSelectedItemFromCart from "../../../screen/Utils";
import getHooks from "../../../hooks";
import { hashKey } from "../../../services/Constants";
import ApiHelper from "../../../services/apiHelper";
import { DeleteCartItemResponse } from "../../../services/Responses/Home/DeleteCartItemResponse";
import { BaseResponse } from "../../../services";
import Preferences from "../../../services/preferences";
import { GetCartList2Response } from "../../../services/Responses/Home/GetCategoryList2";
import { ActionTypes } from "../../../action";
import { useDispatch } from "react-redux";
import { toastController } from "../../../utils";
import ProgressView from "../../Organisms/progressView";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";

interface FavoriteListProps {
  favoriteItem: Result;
  subscriptionList?: any;
  onSave(): void;
}

interface SubscriptionType {
  label: string;
  value: number;
}

export type RootStackParamList = {
  productdetail: { sku: string } | undefined;
  categorydetail: { id: string, name: string } | undefined;
};

const ExpandableFavoriteList = ({
  favoriteItem,
  subscriptionList,
  onSave,
}: FavoriteListProps) => {
  const { colors } = useTheme();
  const style = useStyles();
  const hooks = getHooks();
  const dispatch = useDispatch();
  const { toast } = toastController();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const quote_id = hooks.activeCart;
  const userData = hooks.user;
  console.log("favoriteItem", favoriteItem);

  const favoriteName = favoriteItem.name;
  const favoriteImage = favoriteItem.small_image;
  // const basketName = basketItem.name;
  // const productList = basketItem.products;
  const subscriptionDropDownList: any =
    subscriptionList &&
    subscriptionList.billing_frequence.map((item: any, index: any) => {
      return {
        label: item,
        value: index,
      };
    });
  const [value, setValue] = useState<number>(
    subscriptionDropDownList && subscriptionDropDownList[0].value
  );
  const [open, setopen] = useState<boolean>(false);
  const [count, setCount] = useState<string>("");
  const [isProgress, setProgress] = useState<boolean>(false);

  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setopen(!open);
    navigation.push("productdetail", { sku: favoriteItem.sku });

  };

  var selectedQty = 0;
  var itemId = 0;
  var cartItem = getSelectedItemFromCart(favoriteItem.sku, hooks.cartList);
  if (cartItem === null) {
    selectedQty = 0;
    // homeCateGory.setCartItemId(null);
  } else {
    selectedQty = cartItem.qty;
    itemId = cartItem.item_id;
    // homeCateGory.setCartItemId(cartResult.getItemId());
  }
  var discount = favoriteItem.price - favoriteItem.special_price;
  const per = (discount / favoriteItem.price) * 100;
  const persentage = Math.trunc(per);
  console.log("discount", persentage);
  // setCount(selectedQty);

  console.log("selectedQty", selectedQty);

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
      qty: "1",
    };

    ApiHelper.cartNew2(apiCallObj).then((res: BaseResponse) => {
      console.log("cart new2 res", res);
      if (res) {
        getCartList2();
        console.log("-----res", res);
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
        toast("Msg", res.specification, "info");
      } else {
        toast("network_error", "network_msg", "info");
      }
    });
  };

  const updateCartItemApiCall = async (
    item: any,
    selectedQty: number,
    id: string
  ) => {
    setProgress(true);
    console.log("item", item);

    var qty = id === "1" ? selectedQty - 1 : selectedQty + 1;
    console.log("itemQTY", qty);
    const apiCallObj = {
      hashkey: hashKey,
      quote_id: quote_id,
      item_id: item,
      customer_id: userData.id,
      qty: qty,
    };

    ApiHelper.updateCartItem(apiCallObj).then((res: GetCartList2Response) => {
      console.log("Update Cart Item res", res);
      if (res.success === 1) {
        getCartList2();
        // dispatch(onMarketProduct(res));
        // getProductsData()
        // getstoreProductApiCall()
        // getMarketProductApiCall()
        setProgress(false);
      }
    });
  };

  const favoriteProductApiCall = async (item: any) => {
    setProgress(true);
    console.log("favoriteItem api call", item);

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
        onSave();
        // updateState();
        // dispatch(onActiveCart(res.result));
        // (res.result === null || res.result === 0 ? console.log("result is null or 0") : getCartList2(res.result)
        // )
      } else if (res.success === 0) {
        setProgress(false);
        toast("Msg", res.specification, "info");
      } else {
        setProgress(false);
        toast("network_error", "network_msg", "info");
      }
    });
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => onPress()}>
        <View style={[style.addressView, { marginVertical: 1 }]}>
          {/* <View> */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: 100 }}>
              <View style={{ flexDirection: "row", width: 100 }}>
                {favoriteItem.special_price > 0 ? (
                  <View style={style.offView}>
                    <Text
                      style={style.offviewText}
                    >{`${persentage}% off`}</Text>
                  </View>
                ) : (
                  <View></View>
                )}

                <View style={{ marginHorizontal: 35 }}>
                  {favoriteItem.favourite === 1 ? (
                    <TouchableOpacity
                      onPress={() => favoriteProductApiCall(favoriteItem)}
                    >
                      <FontAwesome
                        name="heart"
                        size={18}
                        color={BaseColor.purpleColor}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => favoriteProductApiCall(favoriteItem)}
                    >
                      <FontAwesome
                        name="heart-o"
                        size={18}
                        color={BaseColor.purpleColor}
                      />
                    </TouchableOpacity>
                  )}

                </View>
              </View>
              <View style={{ width: '100%', height: scale(80), alignItems: "center", justifyContent: 'center', marginTop: 5 }}>
                <Image
                  defaultSource={Images.PlaceHolderImage}
                  source={{ uri: favoriteImage }}
                  style={{ width: '100%', height: scale(70), resizeMode: 'contain' }}
                />
              </View>
            </View>
            <View>
              <View style={{ width: scale(170), flex: 1, marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    // fontWeight: "bold",
                    fontFamily: font(FontFamily.fontBold),
                  }}
                >
                  {favoriteName}
                </Text>
                <Text
                  style={{
                    color: "red",
                    fontFamily: font(FontFamily.fontRegular),
                    fontSize: getFontSize(12)
                  }}
                >
                  Only {favoriteItem.qty} left
                </Text>
              </View>
              <View style={{ justifyContent: "flex-end", flex: 0.5, marginLeft: 10 }}>
                <Text style={{ fontFamily: font(FontFamily.fontBold) }}>
                  AED {favoriteItem.special_price.toFixed(2)}
                </Text>
                <Text
                  style={{
                    fontFamily: font(FontFamily.fontRegular),
                    textDecorationLine: "line-through",
                  }}
                >
                  AED {favoriteItem.price.toFixed(2)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {selectedQty === 0 ? (
                <View style={{ height: 60 }}></View>
              ) : (
                <View style={[style.actionIcon]}>
                  {selectedQty > 1 ? (
                    <TouchableOpacity
                      onPress={() =>
                        updateCartItemApiCall(itemId, selectedQty, "1")
                      }
                    >
                      <Images.Minus height={25} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => deleteCartItemApiCall(itemId)}
                    >
                      <Images.Delete height={25} />
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {selectedQty > 0 && (
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
                  value={JSON.stringify(selectedQty)}
                  onChangeText={(e) =>
                    e === "0" ? setCount("1") : setCount(e)
                  }
                  cursorColor={BaseColor.purpleColor}
                />
              )}
              <TouchableOpacity
                activeOpacity={0.1}
                onPress={() => addCartItemApiCall(favoriteItem)}
                style={{ alignItems: "flex-end" }}
              >
                <Images.Add height={25} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {isProgress && <ProgressView />}
    </View >
  );
};

export default ExpandableFavoriteList;

const styles = StyleSheet.create({
  item: {
    marginVertical: 10,
    // borderWidth: 1,
    // paddingHorizontal: 20,
    overflow: "hidden",
    marginHorizontal: 5,
    // paddingVertical: 10,
    // marginBottom: 5,
  },
  textStyle: {
    color: "black",
    fontFamily: font(FontFamily.fontBold),
  },
  purlelTextsStyle: {
    color: BaseColor.purpleColor,
    fontFamily: font(FontFamily.fontBold),
  },
  orderView: {
    width: "100%",
    flex: 1,
    marginVertical: scale(10),
    justifyContent: "space-between",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowColor: "#000",
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
});
