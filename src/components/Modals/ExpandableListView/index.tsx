import React, { useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { deviceWidth, scale } from "../../../config/responsive";
import { BaseColor } from "../../../config/theme";
import { font, FontFamily } from "../../../config/typography";
import { orderStatuses } from "../../../services/ConstVariable";
import { OrderListResult } from "../../../services/Responses/Home/GetOrderListResponse";
import { getTotalPriceString } from "../../../utils/stringController";
import CustomButton from "../../Atoms/CustomButtonView";
import ImageView from "../../Atoms/imageView";

interface OrderItemProps {
  data: OrderListResult;
  onCancelClick(orderId: string): void;
  onReOrderClick(orderId: string): void;
  onTrackOrderClick(orderId: string): void;
  onPayByCardClick(): void;
}

export type RootStackParamList = {
  orderdetail: { orderId: string } | undefined;
};

export default function ExpanbleListView({
  data,
  onCancelClick,
  onPayByCardClick,
  onReOrderClick,
  onTrackOrderClick,
}: OrderItemProps) {
  const [open, setopen] = useState<boolean>(false);
  console.log("datadatadatadata", data);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setopen(!open);
  };

  const orderId = data.orderid;
  const orderTotalPrice = getTotalPriceString(data.total);
  const productItems = open ? data.items : [data.items[0]];
  const defaultProductItems = data.items[0];

  const isCancelVisible =
    data.is_cancelable &&
      data.last_status.status != orderStatuses.ORDER_STATUS_CANCELLED
      ? true
      : false;
  const isPayByCardVisible =
    data.last_status.status != orderStatuses.ORDER_STATUS_CANCELLED &&
      !data.amount_paid
      ? true
      : false;
  const isTrackOrderVisible =
    data.last_status.status != orderStatuses.ORDER_STATUS_CANCELLED
      ? true
      : false;
  const orderStatusSpilt = data?.last_status?.text_to_show_to_user?.split(" ")
  console.log("orderSTATUS", orderStatusSpilt);
  for (let i = 0; i < orderStatusSpilt.length; i++) {
    console.log("orderStatusSpilt[i][0]orderStatusSpilt[i][0]",orderStatusSpilt[i]);
    
    if (orderStatusSpilt[i].length > 0) {
      orderStatusSpilt[i] = orderStatusSpilt[i][0].toUpperCase() + orderStatusSpilt[i].substring(1);
    } else {
      orderStatusSpilt[i] = ""
    }
  }


  return (
    <View style={[style.item]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View>
          <Text style={[style.textStyle, { marginBottom: 5 }]}>
            {`Order #${orderId}`}
          </Text>
          <Text style={style.purlelTextsStyle}>{orderStatusSpilt.join(' ')}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('orderdetail', { orderId: orderId })}>
          <Text style={style.textStyle}>{`AED ${orderTotalPrice}`}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "space-between", marginHorizontal: 20 }}>
        <View style={style.orderView}>
          <FlatList
            data={productItems}
            renderItem={({ item }) => {
              return (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 5,
                    }}
                  >
                    <View style={{ width: 100 }}>
                      <ImageView
                        imageSource={{ uri: item.image_url }}
                        style={{ width: 100, height: 80 }}
                        isSVG={false}
                        sizeMode="contain"
                      />
                    </View>
                    <View
                      style={{
                        width: scale(110),
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: font(FontFamily.fontBold),
                          fontSize: 15,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font(FontFamily.fontRegular),
                          marginVertical: 4,
                        }}
                      >
                        {`Qty: ${item.qty}`}
                      </Text>
                    </View>
                    <View style={{ marginRight: scale(5) }}>
                      <Text style={{ fontFamily: font(FontFamily.fontBold) }}>
                        {`AED ${item.total.toFixed(2)}`}
                      </Text>
                    </View>
                  </View>
                  {data.items.length > 1 && (
                    <View
                      style={{
                        borderTopWidth: 0.5,
                        marginVertical: 10,
                        borderTopColor: BaseColor.dividerColor,
                      }}
                    />
                  )}
                </>
              );
            }}
          />

          {data.items.length > 1 && (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={onPress}
              activeOpacity={1}
            >
              <View style={{ flex: 1 }}></View>
              <View>
                <Text
                  style={{
                    fontFamily: font(FontFamily.fontBold),
                    marginHorizontal: 10,
                  }}
                >
                  {open ? "Show Less" : "Show More"}
                </Text>
              </View>
              <View style={{ height: 20, justifyContent: "center" }}>
                <FeatherIcon
                  name="chevron-down"
                  size={20}
                  style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {isCancelVisible && (
          <CustomButton
            isIconVisible={false}
            onPress={() => onCancelClick(orderId)}
            style={{
              backgroundColor: BaseColor.yellowColor,
              paddingHorizontal: 18,
              borderRadius: 25,
              height: 40,
              marginVertical: 7,
              // marginHorizontal: 10,
            }}
            textStyle={{
              color: "black",
              fontSize: 13,
              fontFamily: font(FontFamily.fontBold),
            }}
            title="Cancel"
          />
        )}
        <CustomButton
          isIconVisible={false}
          onPress={() => onReOrderClick(orderId)}
          style={{
            backgroundColor: BaseColor.yellowColor,
            paddingHorizontal: 18,
            borderRadius: 25,
            height: 40,
            marginVertical: 7,
            // marginHorizontal: 10,
          }}
          textStyle={{
            color: "black",
            fontSize: 12,
            fontFamily: font(FontFamily.fontBold),
          }}
          title="Re-order"
        />
        {isPayByCardVisible && (
          <CustomButton
            isIconVisible={false}
            onPress={() => onPayByCardClick()}
            style={{
              backgroundColor: BaseColor.yellowColor,
              paddingHorizontal: 18,
              borderRadius: 25,
              height: 40,
              marginVertical: 7,
              // marginHorizontal: 10,
            }}
            textStyle={{
              color: "black",
              fontSize: 12.5,
              fontFamily: font(FontFamily.fontBold),
              textAlign: "center",
            }}
            title="Pay by card"
          />
        )}
        {isTrackOrderVisible && (
          <CustomButton
            isIconVisible={false}
            onPress={() => onTrackOrderClick(orderId)}
            style={{
              backgroundColor: BaseColor.yellowColor,
              paddingHorizontal: 18,
              borderRadius: 25,
              height: 40,
              marginVertical: 7,
              // marginHorizontal: 10,
            }}
            textStyle={{
              color: "black",
              fontSize: 13,
              fontFamily: font(FontFamily.fontBold),
            }}
            title="Track"
          />
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  item: {
    width: deviceWidth, //"100%",
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
