import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import useStyles from "../../Style";
import useTheme from "../../../../theme";
import { Images } from "../../../../Images";
import { BaseColor, font, FontFamily } from "../../../../config";
import { deviceWidth, getFontSize, scale } from "../../../../config/responsive";
import getHooks from "../../../../hooks";
import ApiHelper from "../../../../services/apiHelper";
import { DeleteCartItemResponse } from "../../../../services/Responses/Home/DeleteCartItemResponse";
import { BaseResponse } from "../../../../services";
import { GetCartList2Response } from "../../../../services/Responses/Home/GetCategoryList2";
import { toastController } from "../../../../utils";
import { ButtonView } from "../../../../components";
import Modal from "react-native-modal/dist/modal";
import { hashKey } from "../../../../services/Constants";
import { showToast } from "../../../../utils/toastController";

const CartItemExpand = ({ item, getCartList2, totalItem }: { item: any, getCartList2: any, totalItem: any }) => {
  const style = useStyles();
  const theme = useTheme();
  const hooks = getHooks();
  const { toast } = toastController();

  const quote_id = hooks.activeCart;
  const userData = hooks.user;
  const cartList = hooks.cartList;
  const [isProgress, setProgress] = useState(false);
  const [isShowDeleteModal, setShowDeleteModal] = useState(false);
  const [removeItem, setRemoveItem] = useState<any>({ name: "", item_id: "" });
  const [count, setCount] = useState<string>("1");
  console.log("item +++++++++++++>>>", count);

  const deleteCartItemApiCall = async () => {
    setProgress(true);

    const apiCallObj = {
      hashkey: hashKey,
      quote_id: quote_id,
      item_id: removeItem.item_id,
    };

    ApiHelper.deleteCartItem(apiCallObj).then((res: DeleteCartItemResponse) => {
      console.log("delete Cart Item res", res);
      if (res.success === 1) {
        getCartList2();
        setShowDeleteModal(false);
        setRemoveItem({ name: "", item_id: "" });
        // getProductsData()
        // getstoreProductApiCall()
        // getMarketProductApiCall()
        // dispatch(onMarketProduct(res));
        setProgress(false);
      } else if (res.success === 0) {
        showToast(res.specification);
      } else {
        toast("network_error", "network_msg", "info");
      }
    });
  };

  const updateCartItemApiCall = async (qtyCount: any) => {
    setProgress(true);
    // console.log("itemitemitem", count);

    // var qty = id === "1" ? item.qty - 1 : item.qty + 1;
    console.log("countcountcountcount", qtyCount);
    const apiCallObj = {
      hashkey: hashKey,
      quote_id: quote_id,
      item_id: item.item_id,
      customer_id: userData.id,
      qty: qtyCount,
    };
    console.log("apiCallObjapiCallObj", apiCallObj);

    ApiHelper.updateCartItem(apiCallObj).then((res: GetCartList2Response) => {
      console.log("Update Cart Item res", res.specification);
      if (res.success === 1) {
        getCartList2();
        // dispatch(onMarketProduct(res));
        // getProductsData()
        // getstoreProductApiCall()
        // getMarketProductApiCall()
        setProgress(false);
      } else if (res.success === 0) {
        showToast(res.specification);
      } else {
        toast("network_error", "network_msg", "info");
      }
    });
  };

  const handleModel = (item: any) => {
    setRemoveItem(item);
    setTimeout(() => {
      setShowDeleteModal(true);
    });

    console.log("item", item);
  };

  useEffect(() => {
    setCount(JSON.stringify(item.qty));
  }, [item.qty]);

  return (
    <View>
      <Modal
        style={{ margin: 15 }}
        isVisible={isShowDeleteModal}
        useNativeDriver={true}
        hideModalContentWhileAnimating
        onBackdropPress={() => setShowDeleteModal(false)}
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
            style={{ justifyContent: "center", padding: 15, width: "100%" }}
          >
            <Text
              style={{
                fontSize: 22,
                // alignSelf: "center",
                color: "black",
                marginVertical: 15,
                fontFamily: font(FontFamily.fontRegular),
              }}
            >
              Confirmation
            </Text>
            <Text
              style={{
                // textAlign: "center",
                color: "black",
                fontFamily: font(FontFamily.fontRegular),
              }}
            >
              Are you sure you want to remove {removeItem.name} ?
            </Text>

            <View
              style={{
                flexDirection: "row",
                // paddingBottom: hp("3%"),
                // paddingHorizontal: wp("10%"),
                marginTop: 15,
                width: deviceWidth * 0.9,
                // backgroundColor: "red",
                justifyContent: "space-evenly",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <View></View>
              <ButtonView
                text="Cancel"
                onPress={() => setShowDeleteModal(false)}
                style={{
                  height: 40,
                  width: 100,
                  borderRadius: 8,
                  backgroundColor: "white",
                }}
                textStyle={{ color: BaseColor.purpleColor, fontFamily: font(FontFamily.fontRegular), fontSize: getFontSize(18) }}
              />

              <ButtonView
                text="Remove"
                // textStyle={{ color: BaseColor.purpleColor }}
                onPress={() => deleteCartItemApiCall()}
                style={{
                  height: 40,
                  width: 100,
                  borderRadius: 8,
                  backgroundColor: "white",
                }}
                textStyle={{ color: BaseColor.purpleColor, fontFamily: font(FontFamily.fontRegular), fontSize: getFontSize(18) }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* <Text
        style={[
          theme.textView,
          {
            color: "black",
            marginBottom: 10,
          },
        ]}
      >
        {totalItem > 1
          ? `${totalItem} items in cart`
          : `${totalItem} item in cart`}
      </Text> */}
      {/* <FlatList */}
      {/* // data={cartList} */}
      {/* renderItem={({ item }) => { */}
      {/* setCount(item.qty) */}
      {/* return ( */}
      <View>
        <View style={[style.cartItemList, { marginTop: 1 }]}>
          <TouchableOpacity
            style={styles.deleteButtonView}
            activeOpacity={0.5}
            onPress={() => handleModel(item)}
          >
            <Images.Delete />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "space-between",
              margin: 15,
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 10,
              }}
            >
              <Image
                source={{ uri: item.small_image }}
                style={{ width: 80, height: 80 }}
              />
            </View>
            <View style={{ width: scale(100), justifyContent: "space-between" }}>
              <Text
                style={{
                  fontFamily: font(FontFamily.fontBold),
                }}
                numberOfLines={2}
                ellipsizeMode="head"
              >
                {item.name}
              </Text>
              <Text style={{ fontFamily: font(FontFamily.fontBold) }}>
                AED {item.price.toFixed(2)}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              margin: 8
            }}
          >
            {item.qty > 1 ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => updateCartItemApiCall(parseInt(count) - 1)}
              >
                <Images.Minus width={28} />
              </TouchableOpacity>
            ) : (
              <View style={{ height: 15 }}></View>
            )}
            {/* <TextInput
                  style={{
                    marginVertical: 3,
                    borderWidth: 2,
                    width: scale(38),
                    height: scale(30),
                    borderColor: BaseColor.yellowColor,
                    borderRadius: 5,
                    fontFamily: font(FontFamily.fontBold),
                    textAlign: "center",
                    paddingVertical: 0,
                    // fontWeight: "bold",
                  }}
                  keyboardType="numeric"
                  // multiline
                  value={JSON.stringify(item.qty)}
                  // onChangeText={(e) =>
                  //   e === "0" ? setCount("1") : setCount(e)
                  // }
                  cursorColor={BaseColor.purpleColor}
                /> */}
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
              // value=
              value={count}
              onChangeText={(e) =>
                setCount(e)
              }
              cursorColor={BaseColor.purpleColor}
              onEndEditing={() => updateCartItemApiCall(count)}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => updateCartItemApiCall(parseInt(count) + 1)}
            >
              <Images.Add width={28} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* // </View> */}
      {/* // );
        // }}
      // /> */}
    </View>
  );
};

export default CartItemExpand;

const styles = StyleSheet.create({
  deleteButtonView: {
    backgroundColor: BaseColor.yellowColor,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: scale(35),
  },
});
