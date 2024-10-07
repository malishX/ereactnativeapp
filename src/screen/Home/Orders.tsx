import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { ImageView } from "../../components";
import DeleteModal from "../../components/Atoms/DeleteModal";
import MyOrderListView from "../../components/Organisms/MyOrdersListView/MyOrdersListView";
import ProgressView from "../../components/Organisms/progressView";
import { BaseColor } from "../../config";
import { scale } from "../../config/responsive";
import getHooks from "../../hooks";
import { Images } from "../../Images";
import ApiHelper from "../../services/apiHelper";
import { hashKey } from "../../services/Constants";
import { orderStatuses } from "../../services/ConstVariable";
import { GetCartList2Response } from "../../services/Responses/Home/GetCategoryList2";
import {
  GetOrederListResponse,
  OrderListResult,
} from "../../services/Responses/Home/GetOrderListResponse";
import { InvoicePdfResponse } from "../../services/Responses/Orders/InvoicePdfResponse";
import { toastController } from "../../utils";
import useStyles from "./Style";

const Orders = ({ navigation }: any) => {
  const style = useStyles();
  const dispatch = useDispatch();
  const { toast } = toastController();
  const hooks = getHooks();

  const [isProgress, setProgress] = useState(false);
  const [orderList, setOrderList] = useState<OrderListResult[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [cancelModalVisible, setCancelModalVisible] = useState<boolean>(false);
  const [cancelOrderId, setCancelOrderId] = useState<string>("");

  const customerId = hooks.user;
  const mobileNumber = "565911918";
  // var paginationCount = 1;
  console.log("customerId", customerId);
  // console.log("CartItems", Preferences.getCartList());

  const myOrdersApiCall = async (count: number) => {
    return new Promise<GetOrederListResponse>((resolve, reject) => {
      setProgress(true);
      // const formData = new FormData();
      const apiCallObj = {
        customer_id: customerId.id,
        page: count,
      };

      ApiHelper.getOrederList(apiCallObj).then((res: GetOrederListResponse) => {
        console.log("get Order List Call-===========>", res);
        resolve(res);
      });
    });
  };

  const onCancelOrder = () => {
    console.log(cancelOrderId);
    const apiCallObj = { order_id: cancelOrderId };
    // const myOrderID = "000062122";
    setProgress(true);
    ApiHelper.cancelOrder(apiCallObj)
      .then((res) => {
        console.log("cancel order Api call res", res);
        if (res.success == 1) {
          console.log("Order list", orderList);
          const updatedList = orderList.map((item: OrderListResult, index) => {
            return item.orderid === cancelOrderId
              ? {
                ...item,
                status: orderStatuses.ORDER_STATUS_CANCELLED,
                last_status: {
                  ...item.last_status,
                  status: orderStatuses.ORDER_STATUS_CANCELLED,
                  text_to_show_to_user: "order Canceled",
                },
              }
              : item;
          });
          console.log("Updated list", updatedList);

          setOrderList(updatedList);
          setProgress(false);
          // setExtraData(new Date());
        }
      })
      .catch((e) => {
        console.log("Cancel order error", e);
        setProgress(false);
      });
  };

  const onTrackOrder = (orderId: string) => {
    console.log("Track order id ", orderId);

    const currentOrder = orderList.find((item) => item.orderid === orderId);

    navigation.navigate("trackOrder", {
      orderList: currentOrder,
    });
  };

  const reOrderApiCall = async (order_id: string) => {
    setProgress(true);

    const apiCallObj = {
      hashkey: hashKey,
      customer_id: customerId.id,
      order_id: order_id,
    };

    ApiHelper.reorder(apiCallObj).then(
      (res: GetCartList2Response) => {
        console.log("Reorder Api Call", res);

        if (res.success === 1) {
          navigation.navigate("cart")
          setProgress(false);
          // res.result.map((item) => {
          //   setShippingMethod(item.carrier_title)
          // })
          // dispatch(onCartList(res.data.items));
          // dispatch(onCartRes(res))
          // setCartDetail(res)
        } else if (res.success === 0) {
          setProgress(false);
          toast("Msg", res.specification, "info");
        } else {
          setProgress(false);
          // toast("network_error", "network_msg", "info");
        }
      }
    );
  };

  useEffect(() => {
    myOrdersApiCall(pageCount).then((res) => {
      if (res.success === 1) {
        setOrderList(res.result);
        setProgress(false);
        console.log("dsfdsfg");
      } else if (res.success === 0) {
        toast("Msg", res.specification, "info");
        setProgress(false);
      } else {
        toast("network_error", "network_msg", "info");
        setProgress(false);
      }
    });
  }, []);
  return (
    <View style={[style.mainView, { backgroundColor: BaseColor.purpleColor }]}>
      <SafeAreaView
        style={[
          style.mainView,
          {
            flex: 1,
            marginTop: StatusBar.currentHeight && StatusBar.currentHeight,
            backgroundColor: BaseColor.backGroundColor,
          },
        ]}
      >
        <StatusBar backgroundColor={BaseColor.purpleColor} translucent animated={true} />
        <View style={style.headerView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Images.LeftArrow />
            </TouchableOpacity>
            <Text style={style.headerTextView}>My Orders</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <MyOrderListView
            orderListData={orderList}
            onEndReached={() => {
              const paginationCount = pageCount + 1;
              setPageCount(paginationCount);
              console.log("page count", pageCount, paginationCount, orderList);
     
              myOrdersApiCall(paginationCount).then((res) => {
                if (res.success === 1) {
                  console.log("NEW RES", res);
                  const newOrderList = orderList.concat(res.result);
                  setOrderList([...newOrderList]);
                  setProgress(false);
                  console.log("dsfdsfg");
                } else if (res.success === 0) {
                  toast("Msg", res.specification, "info");
                  setProgress(false);
                } else {
                  toast("network_error", "network_msg", "info");
                  setProgress(false);
                }
              });
            }}
            onCancelClick={(orderId: string) => {
              setCancelModalVisible(true);
              setCancelOrderId(orderId);
            }}
            onReOrderClick={(orderId: string) => { reOrderApiCall(orderId) }}
            onTrackOrderClick={onTrackOrder}
            onPayByCardClick={() => { }}
          />
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
        {cancelModalVisible && (
          <DeleteModal
            image={<AntDesignIcon name="warning" size={50} />}
            headerText={"Confirmation"}
            text={`Are you sure you want to cancel an Order - ${cancelOrderId}?`}
            isShowDeleteModal={cancelModalVisible}
            setShowDeleteModal={setCancelModalVisible}
            onPress={() => (setCancelModalVisible(false), onCancelOrder())}
          />
        )}
        {isProgress && <ProgressView />}
      </SafeAreaView>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
