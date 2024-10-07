import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import useStyles from "../../Style";
import Icon from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fearher from "react-native-vector-icons/Feather";

import Search from "../../../../assets/svgImage/ic-search.svg";
import NoResult from "../../../../assets/svgImage/ic-no result found.svg";
import Back from "../../../../assets/svgImage/left-arrow.svg";
import { Images } from "../../../../Images";
import { BaseColor, font, FontFamily } from "../../../../config";
import { deviceHeight, deviceWidth } from "../../../../config/responsive";
import getHooks from "../../../../hooks";
import ApiHelper from "../../../../services/apiHelper";
import { BaseResponse } from "../../../../services";
import { toastController } from "../../../../utils";
import { TrendingSearchingResponse, TrendingSearchResult } from "../../../../services/Responses/Home/TrendingSearch";
import { hashKey, searchLatestURL } from "../../../../services/Constants";
import { useCardAnimation } from "@react-navigation/stack";
import { GetProductDetailResponse } from "../../../../services/Responses/Home/GetProductDetail";
import { ProductsDataResponse, Result } from "../../../../services/Responses/Home/ProductsDataResponse";
import ProductBox from "../HomeScreen/ProductBox";
import ProgressView from "../../../../components/Organisms/progressView";
import { ActionTypes } from "../../../../action";
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { TabRouter } from "@react-navigation/native";

const SearchView = ({ navigation, route }: { navigation: any, route: any }) => {
  const style = useStyles();
  const hooks = getHooks()
  const { toast } = toastController()
  const dispatch = useDispatch()

  const cartList = hooks.cartList
  const userData = hooks.user
  const recentlySearchList = hooks.recentlySearch

  console.log("recentlySearchList", recentlySearchList);
  console.log("searchroute", route);



  const [budge, setBudge] = useState(0)
  const [search, setSearch] = useState<string>(route.params?.text)
  const [isProgress, setProgress] = useState<boolean>(false)
  const [trendingSearch, setTrendingSearch] = useState<TrendingSearchResult[]>([])
  const [searchData, setSearchData] = useState<Result[]>([])

  console.log("trendingSearch", trendingSearch);
  console.log("searchData====>", searchData);


  const budgecount = () => {
    var total = 0;
    for (var i = 0; i < cartList.length; i++) {
      total = total + cartList[i].qty;
    }
    setBudge(total)
    return console.log("total", total);

  }

  // useEffect(() => {
  //   if (route.params?.text && route.params.text) {
  //     searchLatestApiCall(route.params.text);
  //   }
  // }, [])

  const trendingSearchingApiCall = async () => {
    setProgress(true);

    const apiCallObj = {
      search_query: search,
    };

    ApiHelper.trendingSearching(apiCallObj).then((res: TrendingSearchingResponse) => {
      console.log("trending search Item res", res);
      if (res.success === "1") {
        setTrendingSearch(res.result)
        setProgress(false);
      } else if (res.success === "0") {
        toast("Msg", res.specification, "info");
      } else {
        toast("network_error", "network_msg", "info");
      }
    });
  };

  const onRecentlySearch = (data: any) => {
    console.log("data..................", data);
    return {
      type: ActionTypes.RECENTLY_SEARCH,
      data,
    };
  };

  const searchLatestApiCall = async (value: string) => {
    setProgress(true);

    const apiCallObj = {
      hashkey: hashKey,
      customerId: userData.id,
      page: "1",
      q: value
    };

    ApiHelper.searchLatest(apiCallObj).then((res: ProductsDataResponse) => {
      console.log("search Letest res", res);
      if (res.success === 1) {
        setSearchData(res.result)
        // check()
        checkRecentlySearch()
        setProgress(false);
      } else if (res.success === 0) {
        toast("Msg", res.specification, "info");
      } else {
        toast("network_error", "network_msg", "info");
      }
    });
  };

  const checkRecentlySearch = () => {
    if (recentlySearchList.length === 0 && search.length > 0) {
      dispatch(onRecentlySearch(search));
    } else if (recentlySearchList.includes(search) || search.length === 0) {
      console.log(
        "  recentlyViewed.includes(route.params.item.sku)",
        recentlySearchList.includes(search)
      );
      return;
    } else {
      console.log("false", false);
      if (recentlySearchList.length === 10) {
        recentlySearchList.shift();
      }
      dispatch(onRecentlySearch(search));
    }
  };

  useEffect(() => {
    budgecount()
    if (route.params?.text && route.params.text.length > 0) {
      searchLatestApiCall(route.params.text);
    } else {
      trendingSearchingApiCall()
    }
  }, [])
 
  const renderRecentlySearchItem = ({ item }: { item: any }) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
          <View style={{ flexDirection: 'row', }}>
            <MaterialIcons name="history" size={25} color='black' />
            <Text style={{ fontFamily: font(FontFamily.fontRegular), marginHorizontal: 10, fontSize: 18 }}>{item}</Text>
          </View>
          <TouchableOpacity onPress={() => searchItem(item)}>
            <Fearher name="arrow-up-left" size={25} color='black' />
          </TouchableOpacity>
        </View>
        <View style={{ borderBottomColor: BaseColor.dividerColor, borderWidth: 0.5 }}></View>
      </View>
    )
  }

  const renderSearchItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity style={styles.trendingView} onPress={() => searchItem(item)}>
        <Text style={{ fontFamily: font(FontFamily.fontBold), color: 'black' }}>{item}</Text>
      </TouchableOpacity>
    )
  }

  const searchItem = (item: string) => {
    setSearch(item)
    searchLatestApiCall(item)
  }

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
        <View
          style={{
            height: deviceHeight * 0.1,
            width: deviceWidth,
            backgroundColor: BaseColor.backGroundColor,
          }}
        >
          <View style={style.headerView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Images.LeftArrow />
            </TouchableOpacity>
            <View style={[style.searchView, { marginHorizontal: 6 }]}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Search />
                  <TextInput
                    style={[style.inputText, { width: 200 }]}
                    onPressIn={() => navigation.navigate("searchdetail")}
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search Products"
                    allowFontScaling={false}
                    onSubmitEditing={() => searchLatestApiCall(search)}
                  ></TextInput>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      search.length > 0
                      && setSearch("")

                    }
                  >
                    <Icon name="close-a" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ position: 'relative' }}>
              {budge > 0 && <View style={{
                backgroundColor: 'white',
                position: 'absolute',
                width: 15,
                height: 15,
                top: -9,
                left: 18,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center'
              }}><Text style={{ fontSize: 8, fontFamily: font(FontFamily.fontBold) }}>{budge}</Text>
              </View>}
              <Images.CartIcon width={30} height={20} />
            </View>
          </View>
        </View>
        <View style={{ paddingVertical: 10 }}>
          {search.length > 0 ?

            searchData.length === 0 ?
              <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                <Image
                  source={Images.NoProduct}
                  style={{ width: 150, height: 150 }}
                />
                <View style={{ marginVertical: 20 }}>
                  <Text style={{
                    fontFamily: font(FontFamily.fontBold),
                    fontSize: 22,
                    color: BaseColor.purpleColor
                  }}>No Product Found!</Text>
                </View>
              </View> :
              <ProductBox
                data={searchData}
                id="2"
                onEndReached={() => { }}
                updateState={() => { }}
              />

            :
            <ScrollView style={{ margin: 20 }}>
              {recentlySearchList.length > 0 &&
                <View>
                  <Text style={styles.titleView}>Recent Searches</Text>
                  <FlatList
                    data={recentlySearchList}
                    renderItem={renderRecentlySearchItem}
                  />
                </View>
              }
              {/* <View > */}
              {trendingSearch.length > 0 &&
                <View>
                  <Text style={styles.titleView}>Trending Searches</Text>
                  <View>
                    <FlatList
                      horizontal={false}
                      numColumns={3}
                      data={trendingSearch}
                      renderItem={renderSearchItem}
                      columnWrapperStyle={{ flexWrap: 'wrap' }}
                    />
                  </View>
                </View>}
              {/* </View> */}
            </ScrollView>}
        </View>
      </SafeAreaView>
      {isProgress && <ProgressView />}
    </View>
  );
};

export default SearchView;

const styles = StyleSheet.create({
  titleView: {
    fontFamily: font(FontFamily.fontBold),
    fontSize: 18,
    marginTop: 20,
  },
  trendingView: {
    borderColor: BaseColor.yellowColor,
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
  }
});
