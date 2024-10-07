import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import useStyles from "../../Style";
import { Images } from "../../../../Images";
import { BaseColor, font, FontFamily, getFontSize } from "../../../../config";
import getHooks from "../../../../hooks";
import {
  EXTRA_ORDER_TYPE_CARD,
  EXTRA_ORDER_TYPE_CASH,
  EXTRA_ORDER_TYPE_CREDIT_POINTS,
  EXTRA_ORDER_TYPE_SPOTII,
  USER_TYPE_CREDIT,
} from "../../../../services/ConstVariable";
import ApiHelper from "../../../../services/apiHelper";
import { RewardPointsCasesResponse } from "../../../../services/Responses/Home/RewardPointsCasesResponse";
import { toastController } from "../../../../utils";
import { ActionTypes } from "../../../../action";
import { useDispatch } from "react-redux";
import { GetCartList2Response } from "../../../../services/Responses/Home/GetCategoryList2";
import Preferences from "../../../../services/preferences";
import { hashKey } from "../../../../services/Constants";

const CreditPoint = ({ total }: any) => {
  const style = useStyles();
  const hooks = getHooks();
  const { toast } = toastController();
  const dispatch = useDispatch();

  console.log("total Cart", total);

  const [isProgress, setProgress] = useState<boolean>(false);
  const [isCredit, setCredit] = useState<Boolean>(false);
  const [isDebit, setDebit] = useState<Boolean>(false);
  const [isSpotii, setSpotii] = useState<Boolean>(false);
  const [isCOD, setCOD] = useState<Boolean>(false);
  const [paymentType, setPaymentType] = useState<number>();
  const [isPaymentMethod, setPaymentMethod] = useState<Boolean>(false);

  const userData = hooks.user;
  const quote_id = hooks.activeCart;

  const onRewardPointsCases = (data: any) => {
    console.log("data===========>", data);
    return {
      type: ActionTypes.REWARDPOINTSCASES,
      data,
    };
  };

  const getHomePageData = async () => {
    setProgress(true);

    const apiCallObj = {
      hashkey: hashKey,
      point_style: "spending",
    };

    ApiHelper.rewardPointsCases(apiCallObj).then(
      (res: RewardPointsCasesResponse) => {
        console.log("rewardPointsCases", res);

        if (res.success === 1) {
          dispatch(onRewardPointsCases(res.data));
          // getCartList2()
        } else if (res.success === 0) {
          toast("Msg", res.specification, "info");
        } else {
          toast("network_error", "network_msg", "info");
        }
      }
    );
  };

  const onPaymentMethod = (data: any) => {
    return {
      type: ActionTypes.PAYMENT_METHOD,
      data,
    };
  };

  useEffect(() => {
    // getHomePageData()
    if (userData.customer_type === USER_TYPE_CREDIT) {
      setPaymentMethod(true);
      setCredit(true);
      setPaymentType(EXTRA_ORDER_TYPE_CREDIT_POINTS);
      dispatch(onPaymentMethod(EXTRA_ORDER_TYPE_CREDIT_POINTS));
    } else {
      setPaymentType(EXTRA_ORDER_TYPE_CASH);
      dispatch(onPaymentMethod(EXTRA_ORDER_TYPE_CASH));
      setCOD(true);
    }
  }, []);

  const checkPaymentMethod = (paymentType: any) => {
    console.log("paymentType", paymentType);

    if (paymentType === EXTRA_ORDER_TYPE_CREDIT_POINTS) {
      dispatch(onPaymentMethod(EXTRA_ORDER_TYPE_CREDIT_POINTS));
      setCredit(true);
      setCOD(false);
      setDebit(false);
      setSpotii(false);
    } else if (paymentType === EXTRA_ORDER_TYPE_CARD) {
      dispatch(onPaymentMethod(EXTRA_ORDER_TYPE_CARD));
      setCredit(false);
      setCOD(false);
      setDebit(true);
      setSpotii(false);
    } else if (paymentType === EXTRA_ORDER_TYPE_CASH) {
      dispatch(onPaymentMethod(EXTRA_ORDER_TYPE_CASH));
      setCredit(false);
      setCOD(true);
      setDebit(false);
      setSpotii(false);
    } else if (paymentType === EXTRA_ORDER_TYPE_SPOTII) {
      dispatch(onPaymentMethod(EXTRA_ORDER_TYPE_SPOTII));
      setCredit(false);
      setCOD(false);
      setDebit(false);
      setSpotii(true);
    }
  };

  const PaymentTypeSet = (value: number) => {
    console.log("value---->>>.", value);

    setPaymentType(value);
    checkPaymentMethod(value);
  };

  return (
    <View>
      {isPaymentMethod ? (
        <View
          style={[
            style.cartItemList,
            {
              alignItems: "center",
              height: 60,
              padding: 10,
              marginVertical: 5,
              borderColor: isCredit && BaseColor.yellowColor,
              borderWidth: isCredit && 1,
            },
          ]}
        >
          <View style={{ flexDirection: "row", marginHorizontal: 12 }}>
            <Images.CreditCard />
            <View style={{ width: 150 }}>
              <Text
                style={[
                  style.textStyle,
                  {
                    fontSize: 15,
                    color: BaseColor.textGrayColor,
                    marginHorizontal: 12,
                  },
                ]}
              >
                Credit
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 12,
              marginLeft: 10,
            }}
          >
            <TouchableOpacity
              style={{ marginLeft: 10 }}
            // onPress={() => {
            //   setCreditCard(!isCreditCard);
            // }}
            >
              {isCredit ? <Images.Check /> : <Images.UnChack />}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <View
            style={[
              style.cartItemList,
              {
                alignItems: "center",
                height: 80,
                padding: 10,
                marginVertical: 5,
                borderColor: isDebit ? BaseColor.yellowColor : "transparent",
                borderWidth: 2,
                // borderColor: isDebit ? BaseColor.yellowColor : transparent,
                // borderWidth: isCredit && 2
              },
            ]}
          >
            <View style={{ flexDirection: "row", marginHorizontal: 12 }}>
              <Images.CreditCard />
              <View style={{ width: 150 }}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      fontSize: 15,
                      color: BaseColor.textGrayColor,
                      marginHorizontal: 12,
                    },
                  ]}
                >
                  Credit or Debit Cards
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 12,
                marginLeft: 10,
              }}
            >
              <View style={{ marginLeft: 10 }}>
                <Images.MasterCard />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Images.Visa />
              </View>
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => PaymentTypeSet(EXTRA_ORDER_TYPE_CARD)}
              >
                {isDebit ? <Images.Check /> : <Images.UnChack />}
              </TouchableOpacity>
            </View>
          </View>
          {/* <View
            style={[
              style.cartItemList,
              {
                alignItems: "center",
                height: 80,
                padding: 10,
                marginVertical: 5,
                borderColor: isSpotii ? BaseColor.yellowColor : "transparent",
                borderWidth: 2,
              },
            ]}
          >
            <View style={{ flexDirection: "row", marginHorizontal: 12, }}>
              <Images.COD />
              <View style={{ width: 230 }}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      fontSize: 15,
                      color: BaseColor.textGrayColor,
                      marginHorizontal: 12,
                    },
                  ]}
                >
                  Pay by Telr
                </Text>
                <Text
                  style={{
                    marginLeft: 12,
                    fontFamily: font(FontFamily.fontBold),
                    color: BaseColor.purpleColor,
                    fontSize: 12.5
                  }}
                >
                  Total should be minimum 200 AED
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 12,
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => PaymentTypeSet(EXTRA_ORDER_TYPE_SPOTII)}
              onPress={() => total > 200 && PaymentTypeSet(EXTRA_ORDER_TYPE_SPOTII)}
              activeOpacity={total > 200 ? 1 : 0.5}
              >
                {isSpotii ? <Images.Check /> : <Images.UnChack />}
              </TouchableOpacity>
            </View>
          </View> */}

          <View
            style={[
              style.cartItemList,
              {
                alignItems: "center",
                height: 80,
                padding: 10,
                marginVertical: 5,
                borderColor: isCOD ? BaseColor.yellowColor : "transparent",
                borderWidth: 2,
              },
            ]}
          >
            <View style={{ flexDirection: "row", marginHorizontal: 12 }}>
              <Images.COD />
              <View style={{}}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      fontSize: 15,
                      color: BaseColor.textGrayColor,
                      marginHorizontal: 12,
                    },
                  ]}
                >
                  Cash on Delivery
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 12,
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => PaymentTypeSet(EXTRA_ORDER_TYPE_CASH)}
              >
                {isCOD ? <Images.Check /> : <Images.UnChack />}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CreditPoint;

const styles = StyleSheet.create({
  textStyle: {
    color: "black",
    fontFamily: font(FontFamily.fontBold),
    fontSize: getFontSize(15),
  },
});
