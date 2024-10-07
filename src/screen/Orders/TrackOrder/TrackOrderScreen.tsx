import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import { ImageView } from "../../../components";
import CustomButton from "../../../components/Atoms/CustomButtonView";
import ProgressView from "../../../components/Organisms/progressView";
import { BaseColor, font, FontFamily } from "../../../config";
import { deviceHeight, deviceWidth, scale } from "../../../config/responsive";
import { Images } from "../../../Images";
import ApiHelper from "../../../services/apiHelper";
import { orderStatuses } from "../../../services/ConstVariable";
import { OrderListResult } from "../../../services/Responses/Home/GetOrderListResponse";
import {
  OrderDetailsResponse,
  Result,
} from "../../../services/Responses/Orders/OrderDetailsResponse";
import { useStyles } from "./styles";

interface TrackOrderHistory {
  label: string;
  orderStatus: string;
  createdAt: string;
}

const TrackOrderScreen = ({ route, navigation }: any) => {
  const style = useStyles();
  const { orderList } = route.params;
  const orderListData: OrderListResult = orderList;
  const orderId = orderListData && orderListData.orderid;

  const [currentTrackPosition, setCurrentTrackPosition] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetailsResponse>();
  const [loading, setloading] = useState<boolean>();
  const [trackOrderHistory, setTrackOrderHistory] =
    useState<TrackOrderHistory[]>();
  const [sliderLable, setSliderLable] = useState<string[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [isCancelVisible, setCancelVisible] = useState<boolean>(true);

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 5,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: BaseColor.yellowColor,
    stepStrokeWidth: 0,
    stepStrokeFinishedColor: BaseColor.yellowColor,
    stepStrokeUnFinishedColor: BaseColor.grayBorderColor,
    separatorFinishedColor: BaseColor.yellowColor,
    separatorUnFinishedColor: BaseColor.grayBorderColor,
    stepIndicatorFinishedColor: BaseColor.yellowColor,
    stepIndicatorUnFinishedColor: BaseColor.grayBorderColor,
    stepIndicatorCurrentColor: BaseColor.yellowColor,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 18,
    // stepIndicatorLabelCurrentColor: "black",
    // stepIndicatorLabelFinishedColor: "blue",
    // stepIndicatorLabelUnFinishedColor: "black",
    labelColor: BaseColor.blackColor,
    labelSize: 13,
    currentStepLabelColor: BaseColor.blackColor,
  };

  useEffect(() => {
    setloading(true);
    getOrderDetails()
      .then((res) => {
        if (res) {
          addInitialStages(res);
        } else {
          setloading(false);
        }
      })
      .catch((err) => {
        setloading(false);
      });
  }, []);

  const getOrderDetails = () => {
    return new Promise<OrderDetailsResponse>((resolve, reject) => {
      ApiHelper.getOrderDetails({ order_id: orderId })
        .then((res: OrderDetailsResponse) => {
          console.log("ORderDetails res", res);
          setOrderDetails(res);
          resolve(res);
        })
        .catch((err) => {
          console.log("Get order details err", err);
          reject(err);
        });
    });
  };

  const addInitialStages = (orderDetails: OrderDetailsResponse) => {
    var historyList: TrackOrderHistory[];
    var isDelivered = true;

    const orderDetailsResult = orderDetails.result;

    orderDetailsResult.history.map((item, index) => {
      if (item.status === orderStatuses.ORDER_STATUS_NOT_DELIVERED) {
        isDelivered = false;
      } else {
        isDelivered = true;
      }
    });

    if (isDelivered) {
      historyList = [
        {
          label: "Order Placed",
          createdAt: "",
          orderStatus: orderStatuses.ORDER_STATUS_PENDING,
        },
        {
          label: "Ready to Pick",
          createdAt: "",
          orderStatus: orderStatuses.ORDER_STATUS_READY_TO_PICK,
        },
        {
          label: "Shipped",
          createdAt: "",
          orderStatus: orderStatuses.ORDER_STATUS_SHIPPED,
        },
        {
          label: "Delivered",
          createdAt: "",
          orderStatus: orderStatuses.ORDER_STATUS_DELIVERED,
        },
      ];

      setTrackOrderHistory(historyList);
    } else {
      historyList = [
        {
          label: "Order Placed",
          createdAt: "",
          orderStatus: orderStatuses.ORDER_STATUS_PENDING,
        },
        {
          label: "Ready to Pick",
          createdAt: "",
          orderStatus: orderStatuses.ORDER_STATUS_READY_TO_PICK,
        },
        {
          label: "Shipped",
          createdAt: "",
          orderStatus: orderStatuses.ORDER_STATUS_SHIPPED,
        },
        {
          label: "Not Delivered",
          createdAt: "",
          orderStatus: orderStatuses.ORDER_STATUS_NOT_DELIVERED,
        },
      ];

      setTrackOrderHistory(historyList);
    }

    setOrderInformationData({
      orderDetails: orderDetailsResult,
      trackOrder: historyList,
    });
  };

  const setOrderInformationData = ({
    orderDetails,
    trackOrder,
  }: {
    orderDetails: Result;
    trackOrder: TrackOrderHistory[];
  }) => {
    var updatedTrackOrderList: TrackOrderHistory[] = [];

    orderDetails.history.map((orderDetailItem, index) => {
      trackOrder.map((trackOrderItem, index) => {
        if (orderDetailItem.status === trackOrderItem.orderStatus) {
          updatedTrackOrderList.push({
            ...trackOrderItem,
            createdAt: orderDetailItem.created_at,
          });
        } else {
          updatedTrackOrderList.push(trackOrderItem);
        }
      });
    });

    const updateItemIndex = updatedTrackOrderList.findIndex(
      (item) => item.createdAt
    );

    const processingItem: TrackOrderHistory = {
      label: "Processing",
      orderStatus: updatedTrackOrderList[updateItemIndex + 1].orderStatus,
      createdAt: updatedTrackOrderList[updateItemIndex].createdAt,
    };

    updatedTrackOrderList.splice(updateItemIndex + 1, 0, processingItem);
    const lableList = updatedTrackOrderList.map((item) => item.label);

    setCurrentTrackPosition(updateItemIndex + 1);
    setSliderLable(lableList);
    setTrackOrderHistory(updatedTrackOrderList);
    console.log("UPdated Track order list", updatedTrackOrderList);
    setCancelVisible(orderDetails.is_cancelable);

    if (orderDetails.status === orderStatuses.ORDER_STATUS_CANCELLED) {
      setCurrentStatus("Order has been cancelled!");
    } else if (orderDetails.status === orderStatuses.ORDER_STATUS_DELIVERED) {
      setCurrentStatus("Order has been delivered!");
    } else if (
      orderDetails.status === orderStatuses.ORDER_STATUS_NOT_DELIVERED
    ) {
      setCurrentStatus("Order has not been delivered!");
    } else {
      setCurrentStatus("You will receive your order soon!");
    }

    setloading(false);
  };

  const onCallClick = () => {
    const phoneNumber = "+97165556369";
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const onBuzzClick = () => {
    const wpUrl = "https://api.whatsapp.com/send?phone=971565911918";
    Linking.openURL(wpUrl);
  };

  const onCancelOrder = () => {
    console.log(orderId);
    const apiCallObj = { order_id: orderId };
    setloading(true);
    ApiHelper.cancelOrder(apiCallObj)
      .then((res) => {
        console.log("cancel order Api call res", res);
        if (res.success == 1) {
          console.log("Order list", orderList);
          navigation.goBack();
          setloading(false);
          // setExtraData(new Date());
        }
      })
      .catch((e) => {
        console.log("Cancel order error", e);
        setloading(false);
      });
  };

  const renderLable = ({
    currentPosition,
    label,
    position,
    stepStatus,
  }: {
    position: number;
    stepStatus: string;
    label: string;
    currentPosition: number;
  }) => {
    const currentTrack =
      trackOrderHistory &&
      trackOrderHistory.find((item) => item.label === label);
    const orderDate =
      currentTrack?.createdAt &&
      moment(currentTrack.createdAt).format("h:mm A, DD MMM YYYY");
    const isFinished = stepStatus !== "unfinished" ? true : false;

    const imageURL =
      currentTrack?.orderStatus === orderStatuses.ORDER_STATUS_PENDING
        ? Images.order_placed
        : currentTrack?.orderStatus === orderStatuses.ORDER_STATUS_READY_TO_PICK
        ? Images.ready_to_pick
        : currentTrack?.orderStatus === orderStatuses.ORDER_STATUS_SHIPPED
        ? Images.shipped_icon
        : Images.delivered_icon;

    return (
      <View
        style={{
          // width: "100%",
          minWidth: deviceWidth * 0.5,
          borderRadius: scale(20),
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: scale(10),
        }}
      >
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: BaseColor.yellowColor,
          }}
        >
          <Image
            source={imageURL}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
            }}
          />
        </View>
        <View style={{ marginStart: scale(10) }}>
          <Text
            style={{
              color: isFinished
                ? BaseColor.blackColor
                : BaseColor.grayBorderColor,
              fontWeight: "bold",
              fontSize: scale(16),
            }}
          >
            {currentTrack?.label}
          </Text>
          {orderDate && (
            <Text
              style={{
                color: isFinished ? BaseColor.blackColor : BaseColor.grayColor,
                fontSize: scale(12),
              }}
            >
              {orderDate}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={[style.mainView, { backgroundColor: BaseColor.purpleColor }]}>
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Images.LeftArrow />
            </TouchableOpacity>
            <Text style={style.headerTextView}>Track Order</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: scale(15),
              marginTop: scale(15),
            }}
          >
            {orderId && (
              <Text style={style.orderHeaderTextStyle}>{`# ${orderId}`}</Text>
            )}
            {isCancelVisible && (
              <View style={{ minWidth: deviceWidth * 0.4, height: scale(40) }}>
                <CustomButton
                  isIconVisible={false}
                  onPress={onCancelOrder}
                  title="Cancel Order"
                />
              </View>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                marginHorizontal: scale(10),
                flex: 1,
                marginVertical: scale(30),
              }}
            >
              {sliderLable.length > 0 && (
                <StepIndicator
                  customStyles={customStyles}
                  currentPosition={currentTrackPosition}
                  labels={sliderLable}
                  direction={"vertical"}
                  stepCount={sliderLable.length}
                  renderStepIndicator={() => {
                    return (
                      <View
                        style={{
                          height: 20,
                          width: 20,
                          borderRadius: scale(20),
                        }}
                      ></View>
                    );
                  }}
                  renderLabel={renderLable}
                />
              )}
            </View>
            <View
              style={{
                height: deviceHeight * 0.25,
                width: deviceWidth,
                backgroundColor: BaseColor.purpleColor,
                borderTopStartRadius: scale(25),
                borderTopEndRadius: scale(25),
                justifyContent: "space-evenly",
                paddingHorizontal: scale(20),
                // alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginStart: scale(20),
                  fontSize: 16,
                  fontFamily: font(FontFamily.fontBold),
                  color: BaseColor.whiteColor,
                  marginTop: scale(10),
                }}
              >
                {currentStatus}
              </Text>
              <Text
                style={{
                  marginStart: scale(20),
                  fontSize: 14,
                  fontFamily: font(FontFamily.fontRegular),
                  color: BaseColor.whiteColor,
                }}
              >
                Support for an Order?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CustomButton
                  title="Call"
                  isIconVisible={true}
                  iconName="call"
                  onPress={onCallClick}
                />
                <CustomButton
                  title="Buzz"
                  isIconVisible={true}
                  iconName="chatbubble-ellipses-outline"
                  onPress={onBuzzClick}
                />
              </View>
            </View>
          </View>
        </View>
        {loading && <ProgressView />}
      </SafeAreaView>
    </View>
  );
};

export default TrackOrderScreen;
