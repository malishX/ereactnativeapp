import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import ExpandableBasketListView from "../../../../components/Modals/ExpandableBasketList";
import ProgressView from "../../../../components/Organisms/progressView";
import { BaseColor, font, FontFamily } from "../../../../config";
import { getFontSize, scale } from "../../../../config/responsive";
import getHooks from "../../../../hooks";
import ApiHelper from "../../../../services/apiHelper";
import { hashKey } from "../../../../services/Constants";
import {
  BasketsList,
  SubscriptionParams,
} from "../../../../services/Responses/Accounts/Basket/BasketListResponse";
import useStyles from "../../Style";
import { Dropdown } from "react-native-element-dropdown";
import { Calendar } from 'react-native-calendars';
import moment from "moment";
import { Button } from "../../../../components";
// import useTheme from "../../../../theme";
import { useTheme } from "../../../../config/theme";

const Basket = ({ navigation }: any) => {
  const style = useStyles();
  const { colors } = useTheme();

  const [isShow, setShow] = useState(false);
  const [basketData, setBasketData] = useState<BasketsList[]>([]);
  const [isProgress, setIsProgress] = useState<boolean>(false);
  const [subscriptionParams, setSubscriptionParams] =
    useState<SubscriptionParams>();
  const [cartDetail, setCartDetail] = useState<any>([]);
  const [basketId, setBasketId] = useState<string>("");
  const [isShowCalenderModal, setShowCalenderModal] = useState<boolean>(false);
  const [subscriptionList, setSubscriptionList] = useState<any>();
  const [value, setValue] = useState<any>(subscriptionList && subscriptionList[0].label)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedDateList, setSelectedDateList] = useState<any[]>([])
  const [markedDates, setMarkedDates] = useState<any>()
  console.log("isShowCalenderModal", isShowCalenderModal);
  console.log("selected day", selectedDateList);

  console.log("value", subscriptionList);
  console.log("value2", value);
  console.log("markedDates", markedDates);
  const hooks = getHooks();
  const userData = hooks.user;
  const quote_id = hooks.activeCart;

  console.log("cartDetail====>", subscriptionParams);


  useEffect(() => {
    getBasketList();

    return () => { };
  }, []);


  const customStyles = {
    'stylesheet.calendar.header': {
      header: {
        height: 0
      }
    }
  };

  let mark: any = {};

  useEffect(() => {
    console.log("call selectedDateList");

    selectedDateList.forEach((day: any) => {
      mark[day] = {
        selected: true, selectedColor: BaseColor.yellowColor
      };
      setMarkedDates(mark)
    });
  }, [selectedDateList])

  useEffect(() => {
    mark[selectedDate] = { selected: true, selectedColor: BaseColor.yellowColor }
    setMarkedDates(mark)
  }, [selectedDate])

  const getBasketList = () => {
    setIsProgress(true);
    ApiHelper.getBasketList({
      hashkey: hashKey,
      customer_id: userData.id,
    })
      .then((res) => {
        console.log("basket REs-->", res);
        if (quote_id) {
          getCartDetails();
        }
        setBasketData(res.baskets_list);
        setSubscriptionParams(res.subscription_params);
        setSubscriptionList(res.subscription_params &&
          res.subscription_params.billing_frequence.map((item: any, index: any) => {
            return {
              label: item,
              value: index,
            };
          }))
        setValue(res.subscription_params.billing_frequence[0])
        setIsProgress(false);
      })
      .catch((err) => {
        console.log("Err", err);
        setIsProgress(false);
      });
  };

  const placeOrderSubscriptionBasketApiCall = () => {
    // setIsProgress(true);
    ApiHelper.placeOrderSubscriptionBasket({
      hashkey: hashKey,
      device_type: Platform.OS === "android" ? "android" : "ios",
      customerId: userData.id,
      quoteId: quote_id,
      payment_method: 'cashondelivery',
      shipping_method: "freeshipping_freeshipping",
      subscription_status: value,
      subscription_calender_date: value === "Weekly" ? selectedDateList.join(',') : selectedDate,
      basket: basketId,
      transaction_id: null,
    })
      .then((res) => {
        console.log("basket REs-->", res);
        if (quote_id) {
          getCartDetails();
        }
        // setBasketData(res.baskets_list);
        // setSubscriptionParams(res.subscription_params);
        // setSubscriptionList(res.subscription_params &&
        //   res.subscription_params.billing_frequence.map((item: any, index: any) => {
        //     return {
        //       label: item,
        //       value: index,
        //     };
        //   }))
        setIsProgress(false);
      })
      .catch((err) => {
        console.log("Err", err);
        setIsProgress(false);
      });
  };

  const getCartDetails = () => {
    console.log("Apio params", {
      hashkey: hashKey,
      customer_id: userData.id,
      quote_id: quote_id,
    });

    ApiHelper.cartListSubscription({
      hashkey: hashKey,
      customer_id: userData.id,
      quote_id: quote_id,
    })
      .then((res) => {
        console.log("Cart Details -->", res);
        setIsProgress(false);
      })
      .catch((err) => {
        console.log("Err", err);
        setIsProgress(false);
      });
  };

  const renderBasketList = ({ item }: any) => {
    const basketItem: BasketsList = item;
    console.log("item~~~~~~~~~>", basketItem);
    return (
      <ExpandableBasketListView
        basketItem={basketItem}
        subscriptionList={subscriptionParams}
        onSave={(id: string) => { setBasketId(id) }}
        onModalOpen={() => setShowCalenderModal(true)}
      />
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
        <View style={[style.headerView, { justifyContent: "flex-start" }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" color={"white"} size={25} />
          </TouchableOpacity>
          <Text style={style.headerTextView}>Set the Basket</Text>
        </View>
        <View style={{ flex: 1 }}>
          {basketData && (
            <FlatList
              data={basketData}
              renderItem={renderBasketList}
              contentContainerStyle={{ margin: scale(20) }}
            />
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isShowCalenderModal}
            onRequestClose={() => {
              setShowCalenderModal(false)
            }}>
            <View
              style={{
                height: '57%',
                marginTop: 'auto',
                backgroundColor: colors.basketFooterColor,
                // paddingHorizontal: 40,
                justifyContent: 'center',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 60, paddingVertical: 25, }}>
                <Text style={{ fontFamily: font(FontFamily.fontBold) }}>Subscribe : </Text>
                {subscriptionList && subscriptionList.length > 0 && (
                  <Dropdown
                    style={[
                      {
                        flex: 1,
                        borderRadius: 8,
                        paddingHorizontal: 8,
                      },
                    ]}
                    fontFamily={font(FontFamily.fontBold)}
                    // activeColor={BaseColor.purpleColor}
                    selectedTextStyle={{ fontFamily: font(FontFamily.fontBold), color: BaseColor.purpleColor }}
                    itemTextStyle={{ fontFamily: font(FontFamily.fontBold) }}
                    placeholderStyle={{ fontFamily: font(FontFamily.fontBold), color: BaseColor.purpleColor }}
                    data={subscriptionList}
                    labelField="label"
                    valueField="value"
                    placeholder={subscriptionList[0].label}
                    value={value}
                    onChange={(item) => {
                      setMarkedDates("")
                      setValue(item.label);
                    }}
                  />
                )}
              </View>
              <View style={{ flex: 1, backgroundColor: BaseColor.purpleColor }}>
                <View style={{ backgroundColor: BaseColor.purpleColor }}>
                  <Text style={{
                    color: BaseColor.whiteColor,
                    alignSelf: 'center',
                    fontFamily: font(FontFamily.fontBold),
                    marginVertical: scale(20),
                  }}>Choose Preffered Day for Delivery</Text>
                  <Calendar
                    hideArrows={true}
                    headerData={{
                      calendarDate: moment().format('DD MMM, YYYY')
                    }}
                    // markingType={'custom'}
                    markedDates={
                      markedDates
                    }
                    // markedDates={{ [selectedDate]: { selected: true, selectedColor: BaseColor.yellowColor } }}
                    style={{ backgroundColor: BaseColor.purpleColor }}
                    // theme={styles.theme}
                    theme={{

                      dayTextColor: BaseColor.whiteColor,
                      textDayFontFamily: font(FontFamily.fontBold),
                      textMonthFontFamily: font(FontFamily.fontBold),
                      textDayHeaderFontFamily: font(FontFamily.fontBold),
                      textDayFontSize: 13,
                      textMonthFontSize: 12,
                      textDayHeaderFontSize: 12,
                      todayTextColor: BaseColor.whiteColor,
                      calendarBackground: BaseColor.purpleColor,
                      textDisabledColor: 'gray',
                      selectedDayBackgroundColor: BaseColor.yellowColor,
                      'stylesheet.calendar.header': {
                        header: {
                          height: 0
                        }
                      }
                    }}
                    monthFormat={""}
                    disableMonthChange={true}
                    minDate={moment(new Date()).format("YYYY-MM-DD")}
                    onDayPress={day => {
                      // setSelectedDate(day.dateString);
                      {
                        value === 'Weekly' ?
                          setSelectedDateList([...selectedDateList, day.dateString]) :
                          setSelectedDate(day.dateString);
                      }
                      // console.log('selected day', day);
                    }}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={moment(new Date()).endOf('month').format("YYYY-MM-DD")}
                  // current={new Date()}
                  // customHeader={{ height: 0, opacity: 0 }}
                  // hideExtraDays={false}
                  />
                </View>
                <View style={{ backgroundColor: BaseColor.purpleColor, alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => placeOrderSubscriptionBasketApiCall()}
                    style={{ height: scale(40), width: scale(100), backgroundColor: BaseColor.yellowColor, alignSelf: 'center', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text style={{ alignSelf: 'center', fontFamily: font(FontFamily.fontBold), fontSize: getFontSize(15) }}>Save</Text>
                  </TouchableOpacity>
                  {/* <Button
                    text="Save"
                    style={{ height: scale(40), width: scale(100), backgroundColor: BaseColor.yellowColor, alignSelf: 'center', borderRadius: 20 }}
                    onClick={() => { placeOrderSubscriptionBasketApiCall() }}
                  /> */}
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {isProgress && <ProgressView />}
      </SafeAreaView>
    </View>
  );
};

export default Basket;

const styles = StyleSheet.create({});
