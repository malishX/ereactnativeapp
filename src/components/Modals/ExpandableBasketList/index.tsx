import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Modal,
} from "react-native";
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
import ApiHelper from "../../../services/apiHelper";
import { hashKey } from "../../../services/Constants";
import getHooks from "../../../hooks";
import { showToast } from "../../../utils/toastController";
import { useDispatch } from "react-redux";
import Preferences from "../../../services/preferences";
import { ActionTypes } from "../../../action";
import getSelectedItemFromCart from "../../../screen/Utils";
import { GetCartList2Response, CartItem } from "../../../services/Responses/Home/GetCategoryList2";
import { BaseResponse } from "../../../services";
import ProgressView from "../../Organisms/progressView";
import { DeleteCartItemResponse } from "../../../services/Responses/Home/DeleteCartItemResponse";
import Button from "../../Atoms/Button";

interface BasketListProps {
  basketItem: BasketsList;
  subscriptionList: any;
  onSave(id: string): void;
  onModalOpen(): void;
}

interface SubscriptionType {
  label: string;
  value: number;
}
const ExpandableBasketListView = ({
  basketItem,
  subscriptionList,
  onSave,
  onModalOpen
}: BasketListProps) => {
  const { colors } = useTheme();
  const basketId = basketItem.id;
  const basketName = basketItem.name;
  const hooks = getHooks();
  const dispatch = useDispatch();
  const userData = hooks.user;
  const quote_id = hooks.activeCart;
  console.log("basketItem: " + subscriptionList);
  // console.log("basketItem22: " + cartItem[0].item_id);
  var priceMultiply: any[] = [];
  var cartItem: any
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
  const [productList, setProductList] = useState<Product[]>(
    basketItem.products
  );
  const [isProgress, setProgress] = useState<boolean>(false);
  const [count, setCount] = useState<string>("")
  const [qty, setQty] = useState<any>({ id: "", qty: 1 })
  const [totalAmount, setTotalAmount] = useState<number>(0)
  console.log("totalAmounttotalAmounttotalAmount", qty);


  // const [selectedQty, setselectedQty] = useState<any>({ id: "", qty: 0 })
  const cartList = hooks.cartList;

  // useEffect(() => {
  //   // budgecount();
  //   // console.log("[].reduce((a, b) => a + b, 0)", 
  //   // setTotalAmount(priceMultiply.reduce((a, b) => a + b, 0));
  //   cartList.map((item: any) => {
  //     return (
  //       // console.log("item.qty", item.qty * item.price)
  //       priceMultiply.push(item.qty * item.price)
  //       // setTotalAmount(item.qty * item.price)
  //     )
  //   })
  // }, [cartItem]);

  useEffect(() => {
    // console.log("[].reduce((a, b) => a + b, 0)", priceMultiply.reduce((a, b) => a + b, 0))
    setTotalAmount(priceMultiply.reduce((a, b) => a + b, 0));
  }, [priceMultiply])

  console.log("priceMultiply", priceMultiply);
  const onPress = (basketId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // setTotalAmount(0)
    onSave(basketId)
    setopen(!open);
  };
  // console.log("selectedQty-------->", selectedQty);

  const onUnSelectProduct = (productItem: Product) => {
    setProgress(true);
    const apiParams = {
      hashkey: hashKey,
      product: productItem.sku,
      quote_id: quote_id,
    };

    ApiHelper.unSelectBasketProducts(apiParams)
      .then((res: any) => {
        console.log("Selected basket response", res, basketItem);
        if (res.success === 0) {
          setProgress(false);
          showToast(res.specification);
        } else {
          dispatch(onCartList(res.data.items));
          Preferences.setCartListQtys(res.data.items.length);
          setProgress(false);
        }
      })
      .catch((err) => {
        console.log("remove Errro", err);
      });
  }

  const onSelectProduct = (productItem: Product) => {
    setProgress(true);
    const cat_id = basketItem.id;
    const apiParams = {
      hashkey: hashKey,
      cat_id: cat_id,
      customer_id: userData.id,
      product: productItem.sku,
      qty: 1,
    };

    // ApiHelper.unSelectBasketProducts({
    //   hashkey: hashKey,
    //   product: productItem.sku,
    //   quote_id: quote_id,
    // })
    //   .then((res) => {
    //     console.log("Response->", res);
    //   })
    //   .catch((err) => {
    //     console.log("Errro", err);
    //   });

    ApiHelper.selectBasketProducts(apiParams)
      .then((res) => {
        console.log("Selected basket response", res, basketItem);
        if (res.success === 0) {
          showToast(res.specification);
          setProgress(false);
        } else {
          dispatch(onCartList(res.data.items));
          Preferences.setCartListQtys(res.data.items.length);
          setProgress(false);
        }
      })
      .catch((e) => {
        console.log("Err", e);
      });
  };

  const updateBasketProducts = (productItem: Product, selectedQty: number) => {
    console.log("productItem--->", productItem);

    setProgress(true);
    const apiParams = {
      hashkey: hashKey,
      customer_id: userData.id,
      quote_id: quote_id,
      product: productItem.sku,
      qty: selectedQty,
    };
    ApiHelper.updateBasketProducts(apiParams)
      .then((res: any) => {
        console.log("update basket response", res);
        if (res.success === 0) {
          showToast(res.specification);
        } else {
          dispatch(onCartList(res.data.items));
          Preferences.setCartListQtys(res.data.items.length);
          showToast(res.specification);
          setProgress(false);
        }
      })
      .catch((e) => {
        console.log("Err", e);
      });
  }
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
        // showToast(res.specification);
      } else if (res.success === 0) {
        showToast(res.specification);
      } else {
        showToast("Please Check Your Network");
      }
    });
  };

  // const addCartItemApiCall = async (item: any) => {
  //   // console.log("---props.data", data);

  //   setProgress(true);
  //   const apiCallObj = {
  //     hashkey: hashKey,
  //     customer_id: userData.id,
  //     sku: item.sku,
  //     qty: "1",
  //   };

  //   ApiHelper.cartNew2(apiCallObj).then((res: BaseResponse) => {
  //     console.log("cart new2 res", res);
  //     if (res) {
  //       getCartList2();
  //       console.log("-----res", res);
  //       // setCartData(res.data)
  //       setProgress(false);
  //       showToast(res.specification);
  //     }
  //   });
  // };

  // const updateCartItemApiCall = async (
  //   item: any,
  //   selectedQty: number,
  //   id: string
  // ) => {
  //   setProgress(true);
  //   console.log("item", selectedQty);

  //   var qty = id === "1" ? selectedQty - 1 : selectedQty + 1;
  //   console.log("itemQTY", qty);
  //   const apiCallObj = {
  //     hashkey: hashKey,
  //     quote_id: quote_id,
  //     item_id: item,
  //     customer_id: userData.id,
  //     qty: qty,
  //   };

  //   ApiHelper.updateCartItem(apiCallObj).then((res: GetCartList2Response) => {
  //     console.log("Update Cart Item res", res);
  //     if (res.success === 1) {
  //       getCartList2();
  //       showToast(res.specification);
  //       // dispatch(onMarketProduct(res));
  //       // getProductsData()
  //       // getstoreProductApiCall()
  //       // getMarketProductApiCall()
  //       setProgress(false);
  //     }
  //   });
  // };

  // const deleteCartItemApiCall = async (item: any) => {
  //   console.log("DELETEitem", item);

  //   setProgress(true);

  //   const apiCallObj = {
  //     hashkey: hashKey,
  //     quote_id: quote_id,
  //     item_id: item,
  //   };

  //   ApiHelper.deleteCartItem(apiCallObj).then((res: DeleteCartItemResponse) => {
  //     console.log("delete Cart Item res", res);
  //     if (res.success === 1) {
  //       getCartList2();
  //       setProgress(false);
  //       showToast(res.specification);
  //     } else if (res.success === 0) {
  //       showToast(res.specification);
  //     } else {
  //       showToast("Please Check Your Network");
  //     }
  //   });
  // };

  // const addSelectQty = (id: string) => {
  //   setselectedQty({ id: id, qty: selectedQty + 1 })
  // }
  const renderBasketProducts = ({ item }: any) => {
    const productItem: Product = item;

    const productImage = productItem.small_image;
    const productName = productItem.name;

    const productSpecialPrice =
      productItem.special_price > 0
        ? productItem.special_price
        : productItem.price;

    const productActualPrice = productItem.special_price
      ? productItem.price
      : 0;

    const hasSpecialPrice = productSpecialPrice > 0;

    const productPrice = isFloat(productActualPrice)
      ? productActualPrice
      : productActualPrice.toFixed(2);

    var selectedQty = 0;
    var itemId = 0;
    var selected = false;
    var total = 0;
    var price = 0;
    var totalAmount = 0;
    cartItem = getSelectedItemFromCart(productItem.sku, hooks.cartList);
    console.log("cartItemcartItemcartItem", cartItem);

    if (cartItem === null) {
      console.log("call if");
      selectedQty = 1;
      selected = false;
      // setselectedQty(selectedQty);
      // homeCateGory.setCartItemId(null);
    } else {
      console.log("call else");
      selectedQty = cartItem.qty;
      // setselectedQty(cartItem.qty)
      itemId = cartItem.item_id;
      selected = true
      priceMultiply.push(cartItem.price * cartItem.qty)
      // cartList.length === 1 ? setTotalAmount(cartItem.qty * cartItem.price) :
      // total = cartItem.price + cartItem.price
      // total = total + cartList[i].qty;
      // price = cartItem.qty * cartItem.price
      // totalAmount = price + price

      // cartList.map((item: any) => {
      //   return (
      //     priceMultiply.push(item.qty * item.price)
      //     // setTotalAmount(item.qty * item.price)
      //   )
      // })
      console.log("priceMultiply", priceMultiply);
      // price = cartList.reduce((acc: any, item: any) => {
      //   console.log("call Price calculation"
      //   );

      //   console.log("accccc", item);

      //   // console.log("accitem", acc.qty * acc.price);

      //   var multiply = acc.qty * item.qty;
      //   setTotalAmount(multiply);
      //   console.log("acc", multiply);
      // })
    }
    console.log("selected~~~~~~~>", totalAmount);
    return (
      <>
        <View
          style={{
            // width: "100%",
            height: scale(110),
            marginVertical: 1,
            // backgroundColor: "grey",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: scale(40),
              // backgroundColor: "red",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: scale(22),
                width: scale(22),
                backgroundColor: selected === false
                  ? BaseColor.whiteColor
                  : BaseColor.yellowColor,
                borderWidth: true ? 2 : 0,
                borderColor: BaseColor.yellowColor,
                borderRadius: scale(20),
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => selected ? onUnSelectProduct(productItem) : onSelectProduct(productItem)}
            >
              {selected ? (
                <FontAwesome5
                  name="check"
                  size={scale(15)}
                  color={BaseColor.whiteColor}
                />
              ) :
                <FontAwesomeIcon
                  name="circle-thin"
                  size={scale(15)}
                  color={BaseColor.whiteColor}
                />}
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              // backgroundColor: "grey",
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                height: scale(60),
                width: scale(60),
                backgroundColor: BaseColor.whiteColor,
                margin: scale(5),
                borderRadius: scale(10),
                elevation: 15,
                shadowColor: BaseColor.grayColor,
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 1,
                shadowRadius: 10,
              }}
            >
              <ImageView
                imageSource={{ uri: productImage }}
                isSVG={false}
                height={scale(60)}
                width={scale(60)}
                sizeMode={"contain"}
                style={{ borderRadius: scale(10) }}
              />
            </View>

            <View
              style={{
                height: "100%",
                flex: 1,
                justifyContent: "space-between",
                padding: scale(10),
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: BaseColor.purpleColor,
                  fontSize: scale(13),
                }}
              >
                {productName}
              </Text>
              <View>
                {hasSpecialPrice && (
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: BaseColor.blackColor,
                      fontSize: scale(12),
                    }}
                  >
                    {`AED ${isFloat(productSpecialPrice)
                      ? productSpecialPrice
                      : productSpecialPrice.toFixed(2)
                      }`}
                  </Text>
                )}
                {productActualPrice > 0 && (
                  <Text
                    style={{
                      fontWeight: hasSpecialPrice ? "normal" : "bold",
                      color: BaseColor.blackColor,
                      fontSize: scale(12),
                      textDecorationLine: hasSpecialPrice
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {`AED ${productPrice}`}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              width: scale(50),
              // backgroundColor: "red",
              height: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingVertical: scale(10),
            }}
          >
            {selectedQty === 0 ? <View
              style={{
                height: scale(25)
              }}
            ></View> :
              productItem.id === qty.id ?
                qty.qty > 1 ?
                  <TouchableOpacity
                    onPress={() => setQty({ id: productItem.id, qty: qty.qty - 1 })}
                    style={{
                      height: scale(25),
                      width: scale(25),
                      backgroundColor: BaseColor.yellowColor,
                      borderRadius: scale(20),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Entypo
                      name="minus"
                      size={scale(20)}
                      color={BaseColor.blackColor}
                    />
                  </TouchableOpacity> :
                  <View style={{
                    height: scale(25)
                  }}></View> :
                selectedQty > 1 ? <TouchableOpacity
                  onPress={() => updateBasketProducts(productItem, selectedQty - 1)}
                  style={{
                    height: scale(25),
                    width: scale(25),
                    backgroundColor: BaseColor.yellowColor,
                    borderRadius: scale(20),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo
                    name="minus"
                    size={scale(20)}
                    color={BaseColor.blackColor}
                  />
                </TouchableOpacity>
                  :
                  <TouchableOpacity
                    // onPress={() => deleteCartItemApiCall(itemId)}
                    style={{
                      height: scale(25),
                      width: scale(25),
                      // backgroundColor: BaseColor.yellowColor,
                      borderRadius: scale(20),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <Images.Delete height={25} /> */}
                  </TouchableOpacity>
            }
            {selectedQty === 0 ?
              <View
                style={{
                  height: scale(25)
                }}
              ></View> :
              <Text style={{ fontFamily: font(FontFamily.fontBold), color: '#000' }}>
                {/* {selectedQty} */}
                {productItem.id === qty.id ? JSON.stringify(qty.qty) : JSON.stringify(selectedQty)}
              </Text>
              // <TextInput
              //   style={{
              //     marginVertical: 5,
              //     borderWidth: 2,
              //     width: 38,
              //     height: 30,
              //     borderColor: BaseColor.yellowColor,
              //     borderRadius: 5,
              //     fontFamily: font(FontFamily.fontBold),
              //     textAlign: "center",
              //     paddingVertical: 0,
              //     // fontWeight: "bold",
              //   }}
              //   keyboardType="numeric"
              //   // multiline
              //   // value={JSON.stringify(selectedQty)}
              //   value={productItem.id === qty.id ? JSON.stringify(qty.qty) : JSON.stringify(selectedQty)}
              //   // value={productItem.id === selectedQty.id ? JSON.stringify(selectedQty.qty) : JSON.stringify(1)}
              //   // onChangeText={(e) =>
              //   //   e === "0" ? setCount("1") : setCount(e)
              //   // }
              //   cursorColor={BaseColor.purpleColor}
              // />
            }
            <TouchableOpacity
              onPress={() => selected ? updateBasketProducts(productItem, selectedQty + 1) : setQty({ id: productItem.id, qty: qty.qty + 1 })}
              style={{
                height: scale(25),
                width: scale(25),
                backgroundColor: BaseColor.yellowColor,
                borderRadius: scale(20),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo
                name="plus"
                size={scale(20)}
                color={BaseColor.blackColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: BaseColor.grayColor,
            marginHorizontal: scale(25),
          }}
        />
      </>
    );
  };

  const renderFooterComponents = () => {
    return (
      <View
        style={{
          height: scale(90),
          width: "100%",
          backgroundColor: colors.basketFooterColor,
          // flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          // paddingHorizontal: scale(10),
        }}
      >
        <View>
          <Text style={{ color: BaseColor.blackColor, fontFamily: font(FontFamily.fontBold), alignSelf: 'center' }}>Total Amount: AED {totalAmount.toFixed(2)}</Text>
          <Text style={{ fontFamily: font(FontFamily.fontBold), alignSelf: 'center', fontSize: getFontSize(11), marginHorizontal: 15 }}>Minimum Amount for basket Subscription is AED 250.</Text>
          <View style={{ alignItems: 'center' }}>
            <Button
              text="Select Subscription Type & Date"
              style={{ backgroundColor: BaseColor.yellowColor, borderRadius: 40, height: scale(30), width: scale(300) }}
              textStyle={{ fontSize: getFontSize(14), fontFamily: font(FontFamily.fontBold) }}
              onClick={() => { totalAmount > 250 ? onModalOpen() : showToast("Minimum Amount for basket Subscription is AED 250") }}
            />
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#606060", fontWeight: "700" }}>
            Subscribe:
          </Text>*/}
        {/* {subscriptionDropDownList && subscriptionDropDownList.length > 0 && (
          <Dropdown
            style={[
              {
                flex: 1,
                borderRadius: 8,
                paddingHorizontal: 8,
              },
            ]}
            data={subscriptionDropDownList}
            labelField="label"
            valueField="value"
            placeholder={subscriptionDropDownList[0].label}
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
        )} */}
        {/* <View style={{ height: scale(35), width: scale(110) }}>
            <CustomButton isIconVisible={false} onPress={onSave} title="Save" />
          </View> */}
        {/* </View>  */}
      </View >
    );
  };

  return (
    <View style={style.item}>
      <View>
        <TouchableOpacity
          style={{
            height: scale(55),
            backgroundColor: open
              ? BaseColor.purpleColor
              : colors.basketHeaderColor,
            borderTopStartRadius: scale(10),
            borderTopEndRadius: scale(10),
            borderBottomStartRadius: open ? scale(0) : scale(10),
            borderBottomEndRadius: open ? scale(0) : scale(10),
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: scale(15),
          }}
          activeOpacity={0.9}
          onPress={() => onPress(basketId)}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {open ? <Images.BasketIcon /> : <Images.PurpleBasketIcon />}
            <Text
              style={{
                fontWeight: "500",
                marginStart: scale(10),
                fontSize: scale(17),
                color: open ? BaseColor.whiteColor : BaseColor.purpleColor,
              }}
            >
              {basketName}
            </Text>
          </View>
          <FontAwesomeIcon
            name={open ? "angle-up" : "angle-down"}
            size={scale(25)}
            color={open ? BaseColor.whiteColor : BaseColor.purpleColor}
          />
        </TouchableOpacity>
        {open && (
          <FlatList
            data={productList}
            renderItem={renderBasketProducts}
            contentContainerStyle={{
              borderWidth: 2,
              borderColor: BaseColor.purpleColor,
            }}
            style={{ borderWidth: 2, borderColor: BaseColor.purpleColor }}
            ListFooterComponent={renderFooterComponents}
          />
        )}
      </View>
      {isProgress && <ProgressView />}
    </View>
  );
};

export default ExpandableBasketListView;

const style = StyleSheet.create({
  item: {
    marginVertical: 10,
    // borderWidth: 1,
    // paddingHorizontal: 20,
    overflow: "hidden",
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


// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import getHooks from '../../../hooks';

// const ExpandableBasketListView = () => {
//   const hooks = getHooks();
//   const cartList = hooks.cartList;

//   const [amount, setAmount] = useState<number>(0)

//   const budgecount = () => {
//     console.log("Call BudgeCount");

//     var total = 0;
//     var price = 0;
//     price = cartList.reduce((acc: any, item: any) => {
//       var multiply = acc.qty * acc.price + item.qty * item.price;
//       setAmount(multiply);
//       console.log("acc", multiply);
//     })
//     // for (var i = 0; i < cartList.length; i++) {
//     //   total = total + cartList[i].qty;
//     //   price = cartList[i].qty * cartList[i].price
//     // }
//     // setAmount(price)
//     // // setTotalAmount(total * price);
//     // return console.log("total", price * total);
//   };
//   useEffect(() => {
//     budgecount()
//   })
//   return (
//     <View>
//       <Text>{amount}</Text>
//     </View>
//   )
// }

// export default ExpandableBasketListView

// const styles = StyleSheet.create({})

