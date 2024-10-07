import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import useStyles from "../../Style";
import { Images } from "../../../../Images";
import Catagory from "../../../../assets/svgImage/18.svg";
import { BaseColor, font, FontFamily } from "../../../../config";
import { hashKey } from "../../../../services/Constants";
import { useDispatch } from "react-redux";
import getHooks from "../../../../hooks";
import ApiHelper from "../../../../services/apiHelper";
import { getFontSize, scale } from "../../../../config/responsive";
import ExpandableFavoriteList from "../../../../components/Modals/ExpandableFavoriteList";
import { ProductsDataResponse, Result } from "../../../../services/Responses/Home/ProductsDataResponse";
import ProductBox from "../HomeScreen/ProductBox";
import { toastController } from "../../../../utils";
import ProgressView from "../../../../components/Organisms/progressView";

const Favorite = ({ navigation }: any) => {
  const style = useStyles();
  const dispatch = useDispatch();
  const hooks = getHooks();
  const { toast } = toastController()

  const userData = hooks.user
  const [favouriteList, setFavouriteList] = useState<Result[]>([]);
  const [countFavorite, setCountFavorite] = useState<number>(0);
  const [isListlayout, setListLayout] = useState<boolean>(true);
  const [pageCount, setPageCount] = useState<number>(1);
  const [isProgress, setProgress] = useState<boolean>(false);

  console.log("favouriteList", favouriteList);
  const getFavoriteProductList = async () => {
    return new Promise<ProductsDataResponse>((resolve, reject) => {
      setProgress(true);
      const apiCallObj = {
        customerId: userData.id,
        page: pageCount
      };

      ApiHelper.favouriteproductList(apiCallObj)
        .then((res: ProductsDataResponse) => {
          console.log("get favourite REs-->", res);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const renderBasketList = ({ item }: any) => {
    const favouriteItem: Result = item;
    console.log("item", item);

    return (
      <View style={{ marginHorizontal: 10 }}>
        <ExpandableFavoriteList
          favoriteItem={favouriteItem}
          // subscriptionList={subscriptionParams}
          onSave={() => getFavoriteProductList().then((res) => {
            if (res.success === 1) {
              setFavouriteList(res.result)
              // const newProductList = [...favouriteList, ...res.result]; //productData.push(...res.result);
              console.log("REs->", res);
              // setFavouriteList(newProductList);
              setProgress(false);
              console.log("dsfdsfg");
              setCountFavorite(res.count);
            } else if (res.success === 0) {
              // toast("Msg", res.specification, "info");
              setProgress(false);
            } else {
              // toast("network_error", "network_msg", "info");
              setProgress(false);
            }
          })
          }
        />
      </View>
    );
  };

  const reachedData = () => {
    console.log("load more item", pageCount);
    setPageCount(pageCount + 1);
  };

  useEffect(() => {
    getFavoriteProductList().then((res) => {
      if (res.success === 1) {
        const newProductList = [...favouriteList, ...res.result]; //productData.push(...res.result);
        console.log("REs->", res);
        setFavouriteList(newProductList);
        setProgress(false);
        console.log("dsfdsfg");
        setCountFavorite(res.count);
      } else if (res.success === 0) {
        // toast("Msg", res.specification, "info");
        setProgress(false);
      } else {
        // toast("network_error", "network_msg", "info");
        setProgress(false);
      }
    });
  }, [pageCount]);

  return (
    <View style={style.mainView}>
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
          <Text style={style.headerTextView}>My Favorite</Text>
        </View>
        <View style={{ flex: 10, marginVertical: 10 }}>
          {favouriteList.length === 0 ?
            <View style={{ alignItems: 'center', justifyContent: "center", flex: 1 }}>
              <View style={{ marginVertical: 20 }}>
                <Images.EmptyCart />
              </View>
              <Text
                style={{
                  fontSize: getFontSize(20),
                  fontFamily: font(FontFamily.fontBold),
                }}>Your Favorite List is empty</Text>
              <View style={{ marginVertical: 20 }}>
                <Text
                  style={{
                    fontFamily: font(FontFamily.fontRegular),
                    fontSize: getFontSize(15),
                  }}
                >
                  You have no items in the favorite.
                </Text>
              </View>
            </View>
            :
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
                <Text style={{ color: "black", fontWeight: "bold" }}>{countFavorite} Products</Text>
                {isListlayout ?
                  <TouchableOpacity onPress={() => setListLayout(false)}>
                    <AntDesign name="bars" size={22} color='black' />
                  </TouchableOpacity> :
                  <TouchableOpacity onPress={() => setListLayout(true)}>
                    <AntDesign name="appstore-o" size={22} color='black' />
                  </TouchableOpacity>}
              </View>
              <View style={{ flex: 1 }}>

                {isListlayout ?
                  <View style={{ paddingTop: 20 }}>
                    <ProductBox
                      data={favouriteList}
                      id="2"
                      updateState={() => getFavoriteProductList()}
                      onEndReached={() => { }}
                    /></View>
                  :
                  <FlatList
                    data={favouriteList}
                    renderItem={renderBasketList}
                    onEndReached={() => reachedData()}
                  />
                }
              </View>
            </View>}
        </View>
      </SafeAreaView >
      {isProgress && <ProgressView />}
    </View >
  );
};

export default Favorite;

const styles = StyleSheet.create({});
