// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Button,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   TouchableWithoutFeedback,
//   Image,
// } from "react-native";
// // import { TextInput } from 'react-native-paper';
// import React, { useEffect, useState } from "react";
// import useStyles from "../../Style";
// import Catagory from "../../assets/svgImage/Categories-1.svg";
// import { Images } from "../../../../Images";
// import { BaseColor, font, FontFamily, getFontSize } from "../../../../config";
// import getHooks from "../../../../hooks";
// // import { UTILS_QTY } from "../Utils";
// import getSelectedItemFromCart from "../../../Utils";
// import ApiHelper from "../../../../services/apiHelper";
// import { cartNew2Response } from "../../../../services/Responses/Home/CartNew2Response";
// import { BaseResponse } from "../../../../services";
// import { DeleteCartItemResponse } from "../../../../services/Responses/Home/DeleteCartItemResponse";
// import { ActionTypes } from "../../../../action";
// import { GetCartList2Response } from "../../../../services/Responses/Home/GetCategoryList2";
// import { toastController } from "../../../../utils";
// import Preferences from "../../../../services/preferences";
// import { useDispatch } from "react-redux";
// import { useNavigation } from "@react-navigation/native";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import Icon from "react-native-vector-icons/AntDesign";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { hashKey } from "../../../../services/Constants";
// import ProgressView from "../../../../components/Organisms/progressView";
// import { showToast } from "../../../../utils/toastController";

// interface productDataProps {
//   data: any[];
//   id: string;
//   updateState(): void;
//   onEndReached(): void;
// }
// export type RootStackParamList = {
//   productdetail: { sku: string } | undefined;
// };

// const ProductBox = ({
//   data,
//   id,
//   updateState,
//   onEndReached,
// }: productDataProps) => {
//   // const onEndReached = () => {
//   //   console.log("load more item");
//   // }

//   // const { data, id, onEndReached } = props;
//   const style = useStyles();
//   const hooks = getHooks();
//   const { toast } = toastController();
//   const dispatch = useDispatch();
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

//   // console.log("PropsData", navigation);
//   const userData = hooks.user;
//   const quote_id = hooks.activeCart;

//   const [count, setCount] = useState<string>("");
//   const [isProgress, setProgress] = useState(false);
//   const [cartData, setCartData] = useState([
//     { sku: "", price: 0, special_price: 0, name: "", small_image: "" },
//   ]);
//   const [column, setColumn] = useState<any>(id === "2" && 2);
//   console.log("count123", count);

//   useEffect(() => {
//     quote_id === null || quote_id === 0
//       ? console.log("quote id is null")
//       : setCartData(data);
//   }, [quote_id]);

//   const onCartList = (data: any) => {
//     return {
//       type: ActionTypes.CART_LIST,
//       data,
//     };
//   };

//   const getCartList2 = async () => {
//     console.log("--------called");

//     setProgress(true);

//     const apiCallObj = {
//       hashkey: hashKey,
//       quote_id: quote_id,
//     };

//     ApiHelper.getCartList2(apiCallObj).then((res: GetCartList2Response) => {
//       console.log("Cart Api Call", res.data.items);

//       if (res.success === 1) {
//         dispatch(onCartList(res.data.items));
//         Preferences.setCartListQtys(res.data.items.length);
//         setProgress(false);
//       } else if (res.success === 0) {
//         toast("Msg", res.specification, "info");
//       } else {
//         toast("network_error", "network_msg", "info");
//       }
//     });
//   };

//   const addCartItemApiCall = async (item: any) => {
//     console.log("---props.data", data);

//     setProgress(true);
//     const apiCallObj = {
//       hashkey: hashKey,
//       customer_id: userData.id,
//       sku: item.sku,
//       qty: "1",
//     };

//     ApiHelper.cartNew2(apiCallObj).then((res: BaseResponse) => {
//       console.log("cart new2 res", res);
//       if (res) {
//         getCartList2();
//         console.log("-----res", res);
//         // setCartData(res.data)
//         setProgress(false);
//       }
//     });
//   };

//   const deleteCartItemApiCall = async (item: any) => {
//     setProgress(true);

//     const apiCallObj = {
//       hashkey: hashKey,
//       quote_id: quote_id,
//       item_id: item,
//     };

//     ApiHelper.deleteCartItem(apiCallObj).then((res: DeleteCartItemResponse) => {
//       console.log("delete Cart Item res", res);
//       if (res.success === 1) {
//         getCartList2();
//         setProgress(false);
//       } else if (res.success === 0) {
//         showToast(res.specification);
//       } else {
//         toast("network_error", "network_msg", "info");
//       }
//     });
//   };

//   const updateCartItemApiCall = async (
//     item: any,
//     selectedQty: number,
//     id: string
//   ) => {
//     setProgress(true);
//     console.log("item", item);

//     var qty = id === "1" ? selectedQty - 1 : selectedQty + 1;
//     console.log("itemQTY", qty);
//     const apiCallObj = {
//       hashkey: hashKey,
//       quote_id: quote_id,
//       item_id: item,
//       customer_id: userData.id,
//       qty: qty,
//     };

//     ApiHelper.updateCartItem(apiCallObj).then((res: GetCartList2Response) => {
//       console.log("Update Cart Item res", res);
//       if (res.success === 1) {
//         getCartList2();
//         // dispatch(onMarketProduct(res));
//         // getProductsData()
//         // getstoreProductApiCall()
//         // getMarketProductApiCall()
//         setProgress(false);
//       }
//     });
//   };

//   const favoriteProductApiCall = async (item: any) => {
//     setProgress(true);
//     console.log("favoriteItem", item);

//     const apiCallObj = {
//       hashkey: hashKey,
//       productId: item.id,
//       customerId: userData.id,
//       favourite: item.favourite === 1 ? 0 : 1,
//     };

//     ApiHelper.favoriteProduct(apiCallObj).then((res: BaseResponse) => {
//       console.log("update favorite product-===========>", res);
//       if (res.success === "1") {
//         setProgress(false);
//         updateState();
//         // dispatch(onActiveCart(res.result));
//         // (res.result === null || res.result === 0 ? console.log("result is null or 0") : getCartList2(res.result)
//         // )
//       } else if (res.success === 0) {
//         setProgress(false);
//         toast("Msg", res.specification, "info");
//       } else {
//         setProgress(false);
//         toast("network_error", "network_msg", "info");
//       }
//     });
//   };

//   return (
//     <View style={{}}>
//       {/* {console.log("cartData", cartData, data) */}
//       <FlatList
//         horizontal={id === "1" ? true : false}
//         numColumns={column}
//         data={data}
//         renderItem={({ item }) => {
//           var selectedQty = 0;
//           var itemId = 0;
//           var cartItem = getSelectedItemFromCart(item.sku, hooks.cartList);
//           if (cartItem === null) {
//             selectedQty = 0;
//             // homeCateGory.setCartItemId(null);
//           } else {
//             selectedQty = cartItem.qty;
//             itemId = cartItem.item_id;
//             // homeCateGory.setCartItemId(cartResult.getItemId());
//           }
//           // setCount(selectedQty);

//           console.log("selectedQty", selectedQty);

//           var discount = item.price - item.special_price;
//           const per = (discount / item.price) * 100;
//           const persentage = Math.trunc(per);
//           console.log("discount", persentage);

//           return (
//             <View style={{ paddingLeft: 10 }}>
//               <TouchableWithoutFeedback
//                 onPress={() => {
//                   navigation.navigate("productdetail", { sku: item.sku });
//                 }}
//               >
//                 <View
//                   style={[
//                     style.offerView,
//                     { width: id === "1" ? hp("17") : hp("21"), padding: 10 },
//                   ]}
//                 >
//                   <View style={{}}>
//                     <View style={style.contain}>
//                       {item.special_price > 0 ? (
//                         <View style={style.offView}>
//                           <Text
//                             style={style.offviewText}
//                           >{`${persentage}% off`}</Text>
//                         </View>
//                       ) : (
//                         <View></View>
//                       )}
//                       {item.favourite === 1 ? (
//                         <TouchableOpacity
//                           onPress={() => favoriteProductApiCall(item)}
//                         >
//                           <FontAwesome
//                             name="heart"
//                             size={20}
//                             color={BaseColor.purpleColor}
//                           />
//                         </TouchableOpacity>
//                       ) : (
//                         <TouchableOpacity
//                           onPress={() => favoriteProductApiCall(item)}
//                         >
//                           <FontAwesome
//                             name="heart-o"
//                             size={20}
//                             color={BaseColor.purpleColor}
//                           />
//                         </TouchableOpacity>
//                       )}
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       justifyContent: "center",
//                       alignItems: "center",
//                       height: 80,
//                     }}
//                   >
//                     <Image
//                       source={{ uri: item.small_image }}
//                       style={{ height: "80%", width: 50 }}
//                     />
//                     {/* <Catagory height={100} width={100} /> */}
//                   </View>
//                   <View style={{ width: 80 }}>
//                     <Text
//                       style={{
//                         // fontSize: 17,
//                         fontFamily: font(FontFamily.fontBold),
//                       }}
//                       numberOfLines={2}
//                       ellipsizeMode="head"
//                     >
//                       {item.name}
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       alignItems: "flex-end",
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <View style={{ flex: 1 }}>
//                       <View style={{ flex: 1 }}></View>
//                       <View style={{ justifyContent: "flex-end", flex: 1 }}>
//                         {item.special_price > 0 && (
//                           <Text
//                             style={{ fontFamily: font(FontFamily.fontBold) }}
//                           >
//                             {`AED ${item.special_price.toFixed(2)}`}
//                           </Text>
//                         )}

//                         <Text
//                           style={{
//                             fontFamily:
//                               item.special_price > 0
//                                 ? font(FontFamily.fontRegular)
//                                 : font(FontFamily.fontBold),
//                             fontSize:
//                               item.special_price > 0
//                                 ? getFontSize(11)
//                                 : getFontSize(13),
//                             textDecorationLine:
//                               item.special_price > 0 ? "line-through" : "none",
//                           }}
//                         >
//                           {`AED ${item.price.toFixed(2)}`}
//                         </Text>
//                       </View>
//                     </View>
//                     <View
//                       style={{
//                         alignItems: "center",
//                         justifyContent: "flex-end",
//                       }}
//                     >
//                       {selectedQty === 0 ? (
//                         <View style={{ height: 60 }}></View>
//                       ) : (
//                         <View style={[style.actionIcon]}>
//                           {selectedQty > 1 ? (
//                             <TouchableOpacity
//                               onPress={() =>
//                                 updateCartItemApiCall(itemId, selectedQty, "1")
//                               }
//                             >
//                               <Images.Minus height={25} />
//                             </TouchableOpacity>
//                           ) : (
//                             <TouchableOpacity
//                               onPress={() => deleteCartItemApiCall(itemId)}
//                             >
//                               <Images.Delete height={25} />
//                             </TouchableOpacity>
//                           )}
//                         </View>
//                       )}

//                       {selectedQty > 0 && (
//                         <TextInput
//                           style={{
//                             marginVertical: 5,
//                             borderWidth: 2,
//                             width: 38,
//                             height: 30,
//                             borderColor: BaseColor.yellowColor,
//                             borderRadius: 5,
//                             fontFamily: font(FontFamily.fontBold),
//                             textAlign: "center",
//                             paddingVertical: 0,
//                             // fontWeight: "bold",
//                           }}
//                           keyboardType="numeric"
//                           // multiline
//                           value={JSON.stringify(selectedQty)}
//                           onChangeText={(e) =>
//                             e === "0" ? setCount("1") : setCount(e)
//                           }
//                           cursorColor={BaseColor.purpleColor}
//                         />
//                       )}
//                       <TouchableOpacity
//                         activeOpacity={0.1}
//                         onPress={() => addCartItemApiCall(item)}
//                         style={{ alignItems: "flex-end" }}
//                       >
//                         <Images.Add height={25} />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//               </TouchableWithoutFeedback>
//             </View>
//           );
//         }}
//         onEndReached={onEndReached}
//         showsHorizontalScrollIndicator={false}
//       />
//       {isProgress && <ProgressView />}
//     </View>
//     // </View>
//   );
// };

// export default ProductBox;


import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductExpandableListView from '../../../../components/Modals/ProductExpandableListView';
import getHooks from '../../../../hooks';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ActionTypes } from '../../../../action';
import { hashKey } from '../../../../services/Constants';
import ApiHelper from '../../../../services/apiHelper';
import { GetCartList2Response } from '../../../../services/Responses/Home/GetCategoryList2';
import Preferences from '../../../../services/preferences';
import { toastController } from '../../../../utils';
import { BaseResponse } from '../../../../services';
import { DeleteCartItemResponse } from '../../../../services/Responses/Home/DeleteCartItemResponse';
import { showToast } from '../../../../utils/toastController';
import ProgressView from '../../../../components/Organisms/progressView';
import { Result } from '../../../../services/Responses/Home/GetProductDetail';

interface productDataProps {
  data: any[];
  id: string;
  updateState(): void;
  onEndReached(): void;
}
export type RootStackParamList = {
  productdetail: { sku: string } | undefined;
};

const ProductBox = ({
  data,
  id,
  updateState,
  onEndReached,
}: productDataProps) => {
  // const style = useStyles();
  const hooks = getHooks();
  const { toast } = toastController();
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // console.log("PropsData", navigation);
  const userData = hooks.user;
  const quote_id = hooks.activeCart;

  // const [count, setCount] = useState<string>("");
  const [isProgress, setProgress] = useState(false);
  const [cartData, setCartData] = useState([
    { sku: "", price: 0, special_price: 0, name: "", small_image: "" },
  ]);
  const [column, setColumn] = useState<any>(id === "2" && 2);
  // console.log("count123", count);

  useEffect(() => {
    quote_id === null || quote_id === 0
      ? console.log("quote id is null")
      : setCartData(data);
  }, [quote_id]);

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
        toast("network_error", "network_msg", "info");
      }
    });
  };

  const addCartItemApiCall = async (item: any, qtyCount: any) => {
    console.log("---props.data", item);
    console.log("qtyCount~~~~~~~~~~>", item, qtyCount);


    setProgress(true);
    const apiCallObj = {
      hashkey: hashKey,
      customer_id: userData.id,
      sku: item.sku,
      qty: qtyCount,
    };

    ApiHelper.cartNew2(apiCallObj).then((res: BaseResponse) => {
      console.log("cart new2 res", res);
      if (res) {
        getCartList2();
        console.log("-----res", res);
        // setCartData(res.data)
        setProgress(false);
        showToast(res.specification);
      }
    });
  };

  const deleteCartItemApiCall = async (item: any) => {
    console.log("DELETEitem", item);

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
        showToast(res.specification);
      } else if (res.success === 0) {
        showToast(res.specification);
      } else {
        toast("network_error", "network_msg", "info");
      }
    });
  };

  const updateCartItemApiCall = async (
    item: any,
    qtyCount: any
  ) => {
    setProgress(true);
    console.log("item~~~~~~~~~~~>", item);

    // var qty = id === "1" ? selectedQty - 1 : selectedQty + 1;
    // console.log("itemQTY", qty);
    const apiCallObj = {
      hashkey: hashKey,
      quote_id: quote_id,
      item_id: item,
      customer_id: userData.id,
      qty: qtyCount,
    };

    ApiHelper.updateCartItem(apiCallObj).then((res: GetCartList2Response) => {
      console.log("Update Cart Item res", apiCallObj);
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
        showToast(res.specification);
        updateState();
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

  return (
    <View>
      <FlatList
        horizontal={id === "1" ? true : false}
        numColumns={column}
        data={data}
        renderItem={({ item }: { item: Result }) => {
          console.log("ProductDetILITEM", item
          );

          return (
            <ProductExpandableListView
              item={item}
              updateState={updateState}
              id={id}
              addCartItemApiCall={(item: any, count: any) => addCartItemApiCall(item, count)}
              updateCartItemApiCall={(item: any, count: any) => updateCartItemApiCall(item, count)}
              deleteCartItemApiCall={(itemId: any) => deleteCartItemApiCall(itemId)}
              favoriteProductApiCall={() => favoriteProductApiCall(item)}
            />
          )
        }}
        onEndReached={onEndReached}
        showsHorizontalScrollIndicator={false}
      />
      {isProgress && <ProgressView />}
    </View>
  )
}

export default ProductBox

const styles = StyleSheet.create({})
