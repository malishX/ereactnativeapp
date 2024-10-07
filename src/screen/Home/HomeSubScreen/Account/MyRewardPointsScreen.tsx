import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { BaseColor, font, FontFamily } from "../../../../config";
import {
  deviceHeight,
  deviceWidth,
  getFontSize,
  scale,
} from "../../../../config/responsive";
import useStyles from "../../Style";
import { Images } from "../../../../Images";
import ApiHelper from "../../../../services/apiHelper";
import {
  MyRewardData,
  MyRewardResponse,
} from "../../../../services/Responses/Home/MyRewardResponse";
import getHooks from "../../../../hooks";
import { hashKey } from "../../../../services/Constants";
import moment from "moment";

const MyRewardPointsScreen = ({ navigation }: { navigation: any }) => {
  const style = useStyles();
  const hooks = getHooks();

  const userData = hooks.user;

  const [isProgress, setProgress] = useState<boolean>(false);
  const [totalPoint, setTotalPoint] = useState<number>(0);
  const [historyData, setHistoryData] = useState<MyRewardData[]>([]);

  const getRewarBalanceApiCall = async () => {
    setProgress(true);

    const apiCallObj = {
      hashkey: hashKey,
      customerId: userData.id,
    };

    ApiHelper.getRewardBalance(apiCallObj).then((res: MyRewardResponse) => {
      console.log("reward balance api call", res);

      if (res.success === 1) {
        setHistoryData(res.data);
        setTotalPoint(res.result);
        setProgress(false);
      } else if (res.success === 0) {
        setProgress(false);
      } else {
        setProgress(false);
      }
    });
  };

  useEffect(() => {
    getRewarBalanceApiCall();
  }, []);
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
                    My Reward Points
                  </Text>
                </View>
              </View>
            </View>
            <View
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
            </View>
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
              <View style={{ marginVertical: 10 }}>
                <Images.RewardPoint width={50} height={40} />
              </View>
              <Text
                style={{
                  fontSize: getFontSize(20),
                  fontFamily: font(FontFamily.fontBold),
                  color: "white",
                }}
              >
                {totalPoint}
              </Text>
              <Text
                style={{
                  fontSize: getFontSize(20),
                  fontFamily: font(FontFamily.fontRegular),
                  color: "white",
                }}
              >
                Reward Points
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: getFontSize(18),
                fontFamily: font(FontFamily.fontBold),
                color: "black",
              }}
            >
              History
            </Text>
            <FlatList
              data={historyData}
              renderItem={({ item }) => {
                const date = moment(item.created_at).format('MMM DD, YYYY hh:mm A');
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
                            <Text>{date}</Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            fontFamily: font(FontFamily.fontRegular),
                            color: "black",
                            width:scale(260),
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
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MyRewardPointsScreen;

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
});
