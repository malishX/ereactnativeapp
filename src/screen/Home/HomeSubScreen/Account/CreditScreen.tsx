import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { BaseColor, font, FontFamily } from '../../../../config';
import { deviceHeight, deviceWidth, getFontSize } from '../../../../config/responsive';
import useStyles from "../../Style";
import { Images } from '../../../../Images';
import getHooks from '../../../../hooks';
import ApiHelper from '../../../../services/apiHelper';
import { BaseResponse } from '../../../../services';
import { ButtonView } from '../../../../components';
import moment from 'moment';

const CreditScreen = ({ navigation }: { navigation: any }) => {
    const style = useStyles();
    const hooks = getHooks();

    const userData = hooks.user

    const [historyData, setHistoryData] = useState([
        {
            amount: '2',
            orderId: "4251253",
            created_at: new Date()
        },
        {
            amount: '2.20',
            orderId: "4251253",
            created_at: new Date()
        },
        {
            amount: '2',
            orderId: "4251253",
            created_at: new Date()
        }
    ]);
    const [totalPoint, setTotalPoint] = useState(0);
    const [isProgress, setProgress] = useState(false);

console.log("historyData",historyData);

    const getCreditHistoryApiCall = async () => {
        setProgress(true);

        const apiCallObj = {
            // hashkey: hashKey,
            customer_id: userData.id,
        };

        ApiHelper.creditHistory(apiCallObj).then((res: BaseResponse) => {
            console.log("credit history api call", res);

            if (res.success === 1) {
                setHistoryData(res.data[0].credit_history);
                // setTotalPoint(res.result);
                setProgress(false);
            } else if (res.success === 0) {
                setProgress(false);
            } else {
                setProgress(false);
            }
        });
    };

    useEffect(() => {
        getCreditHistoryApiCall()
    }, [])
    return (
        <View style={[style.mainView, { backgroundColor: "#fff" }]}>
            <SafeAreaView
                style={{
                    flex: 1,
                    marginTop: StatusBar.currentHeight && StatusBar.currentHeight,
                }}
            >
                <StatusBar backgroundColor={BaseColor.purpleColor} />

                <View
                    style={{
                        height: deviceHeight * 0.1,
                        width: deviceWidth,
                        backgroundColor: BaseColor.backGroundColor,
                    }}
                >
                    <View style={style.headerView}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <AntDesign name="arrowleft" color={"white"} size={25} />
                            </TouchableOpacity>
                            <View style={{ marginHorizontal: 15 }}>
                                <View
                                    style={{
                                        width: hp("30"),
                                        flexDirection: "row",
                                        alignItems: "center",
                                        // justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: font(FontFamily.fontBold),
                                            color: "white",
                                            fontSize: getFontSize(18),
                                        }}
                                    >
                                        Credit
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{ position: "relative" }}
                                onPress={() => navigation.navigate("help")}
                            >
                                <FontAwesome
                                    name="question-circle-o"
                                    color={"white"}
                                    size={22}
                                />
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: "#fff", margin: 20 }}>
                    <View style={styles.rewardPointsView}>
                        <View style={{ position: "absolute" }}>
                            <Images.RewardPointsBg width={250} height={280} />
                        </View>
                        <View
                            style={{
                                position: "absolute",
                                justifyContent: "flex-end",
                                alignItems: "center",
                            }}
                        >
                            <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Images.RewardPoint width={50} height={40} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text
                                        style={{
                                            fontSize: getFontSize(20),
                                            fontFamily: font(FontFamily.fontBold),
                                            color: "white",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        9810
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: getFontSize(18),
                                            fontFamily: font(FontFamily.fontRegular),
                                            color: "white",
                                        }}
                                    >
                                        Outstanding
                                    </Text>
                                </View>
                                <View style={{ marginHorizontal: 20, borderLeftWidth: 2, borderLeftColor: 'white' }}></View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text
                                        style={{
                                            fontSize: getFontSize(20),
                                            fontFamily: font(FontFamily.fontBold),
                                            color: "white",
                                        }}
                                    >
                                        9810
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: getFontSize(18),
                                            fontFamily: font(FontFamily.fontRegular),
                                            color: "white",
                                        }}
                                    >
                                        Available Credits
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        {/* <Text
                            style={{
                                fontSize: getFontSize(18),
                                fontFamily: font(FontFamily.fontBold),
                                color: "black",
                            }}
                        >
                            History
                        </Text> */}
                        {historyData.length === 0 ? <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                // flex: 1,
                                margin: 20,
                            }}
                        >
                            <View style={{ marginVertical: 20 }}>
                                <Images.EmptyCart />
                            </View>
                            <Text
                                style={{
                                    fontSize: getFontSize(20),
                                    fontFamily: font(FontFamily.fontBold),
                                }}
                            >
                                Your Credit History is empty!
                            </Text>
                            <View style={{ marginVertical: 20 }}>
                                <Text
                                    style={{
                                        fontFamily: font(FontFamily.fontRegular),
                                        fontSize: getFontSize(15),
                                    }}
                                >
                                    You have no Credits yet
                                </Text>
                            </View>
                            {/* <ButtonView
                                text="Add Product"
                                style={{ height: 40 }}
                                onPress={() => navigation.navigate("home2")}
                            /> */}
                        </View> :
                            <FlatList
                                data={historyData}
                                renderItem={({ item }) => {
                                    const date = moment(item.created_at).format('MMM DD, yyyy HH:mm');
                                    return (
                                        <View style={{ marginTop: 10 }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <View style={{ marginRight: 22, alignItems: "center" }}>
                                                    <Images.RewardPoint width={50} height={40} />
                                                </View>
                                                <View>
                                                    <View
                                                        style={{
                                                            flexDirection: "row",
                                                            justifyContent: "space-between",
                                                        }}
                                                    >
                                                        <View>
                                                            <Text
                                                                style={{
                                                                    fontFamily: font(FontFamily.fontBold),
                                                                    fontSize: getFontSize(15),
                                                                    color: "black",
                                                                }}
                                                            >
                                                                AED {JSON.parse(item.amount).toFixed(2)}
                                                            </Text>
                                                        </View>
                                                        <View>
                                                            <Text>{date}</Text>
                                                        </View>
                                                    </View>
                                                    <Text
                                                        style={{
                                                            fontFamily: font(FontFamily.fontRegular),
                                                            // color: "black",
                                                            width: 280,
                                                            marginTop: 3,
                                                        }}
                                                    >
                                                       Order #{item.orderId}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                        }
                        {/* <FlatList
              data={historyData}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 22, alignItems: "center" }}>
                        <Images.RewardPoint width={50} height={40} />
                      </View>
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontFamily: font(FontFamily.fontBold),
                                fontSize: getFontSize(15),
                                color: "black",
                              }}
                            >
                              {item.amount} Points
                            </Text>
                          </View>
                          <View>
                            <Text>{item.created_at}</Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            fontFamily: font(FontFamily.fontRegular),
                            color: "black",
                            width: 280,
                            marginTop: 3,
                          }}
                        >
                          {item.comment}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
            /> */}
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default CreditScreen

const styles = StyleSheet.create({
    rewardPointsView: {
        width: "100%",
        backgroundColor: BaseColor.purpleColor,
        height: hp(16),
        borderRadius: 10,
        alignItems: "center",
        // justifyContent: 'flex-end',
        // padding: 20,
    },
})