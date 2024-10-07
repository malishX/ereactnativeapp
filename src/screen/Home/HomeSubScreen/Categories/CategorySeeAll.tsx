import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";

import useStyles from "../../Style";
import Category from "../../../../assets/svgImage/Categories-1.svg";
import getHooks from "../../../../hooks";
import {
  baseURLImage,
  CategoryHomeURL,
  CategoryListURL,
  hashKey,
} from "../../../../services/Constants";
import { ImageView } from "../../../../components";
import { Images } from "../../../../Images";
import ProgressView from "../../../../components/Organisms/progressView";
import { BottomTabNavigator } from "../..";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { BaseColor } from "../../../../config";
import { ActionTypes } from "../../../../action";
import api from "../../../../services/Common/Api";
import { toastController } from "../../../../utils";

const CategorySeeAll = ({ navigation }: any) => {
  const style = useStyles();
  const hooks = getHooks();
  const { toast } = toastController();
  const dispatch = useDispatch();

  console.log("hook", hooks.categoryList);
  const [isProgress, setProgress] = useState(false);
  const [category, setCategory] = useState([]);
  const userData = hooks.user;
  const categoryList = hooks.categoryList;
  const retailer_id = hooks.retailer_id;

  // console.log("isCategory", isCategory);
  // const [isLoaded, setLoaded] = useState(true)
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoaded(false)
  //   }, 10000)
  // })
  const onCategoryList = (data: any) => {
    console.log("data", data);
    return {
      type: ActionTypes.CATEGORY_LIST,
      data,
    };
  };

  const categoryListApiCall = async () => {
    setProgress(true);
    const formData = new FormData();
    formData.append("hashkey", hashKey);
    formData.append("retailer_id", retailer_id);
    formData.append("customerId", userData.id);
    const res = await api.post(`${CategoryListURL}`, formData);
    console.log("category list see all res", res.data.data);
    if (res.data.success === 1) {
      dispatch(onCategoryList(res.data.data));
      setProgress(false);
      var combine: any
      combine = Object.values(res.data.data);
      console.log("combine", combine);
      setCategory(combine)
      // console.log("CategoryList=======>", CategoryList);
      // navigation.navigate("otpverify", { mobile: mobile });
    } else if (res.data.success === 0) {
      toast("Msg", res.data.specification, "info");
    } else {
      toast("network_error", "network_msg", "info");
    }
  };

  useEffect(() => {
    categoryListApiCall();
  }, []);

  const rendererItem = (item: any) => {
    console.log("category Item", item);

    return (
      <FlatList
        numColumns={3}
        // horizontal={true}
        data={item.item}
        renderItem={({ item }) => {
          return (
            <>
              <View style={{}}>
                <TouchableOpacity
                  style={[style.CatagoryView, { marginHorizontal: 15 }]}
                  onPress={() => {
                    navigation.navigate("categorydetail", {
                      name: item.name,
                      id: item.id,
                    });
                  }}
                >
                  <Image
                    source={{ uri: `${baseURLImage}${item.thumbnail}` }}
                    style={{ height: 50, width: 50 }}
                  />
                </TouchableOpacity>
                <View
                  style={[
                    style.CatagoryTextView,
                    {
                      marginHorizontal: 20,
                      width: heightPercentageToDP("10"),
                      minHeight: heightPercentageToDP("5"),
                    },
                  ]}
                >
                  <Text style={style.CategoryText}>{item.name}</Text>
                </View>
              </View>
            </>
          );
        }}
      />
    )
  }

  return (
    // <>
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
        <View style={style.headerView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" color={"white"} size={25} />
            </TouchableOpacity>
            <Text style={style.headerTextView}>Categories</Text>
          </View>
        </View>

        {/* <View style={style.headerView}> */}
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Images.LeftArrow />
          </TouchableOpacity>
          <Text style={style.headerTextView}>Categories</Text>
        </View> */}
        <View style={{ flex: 10, marginHorizontal: 12, marginVertical: 10 }}>
          <ScrollView>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <FlatList
                data={category}
                renderItem={rendererItem}
              />
              {/* <FlatList
                numColumns={3}
                // horizontal={true}
                data={hooks.categoryList[1]}
                renderItem={({ item }) => {
                  return (
                    <>
                      <View style={{}}>
                        <TouchableOpacity
                          style={[style.CatagoryView, { marginHorizontal: 15 }]}
                          onPress={() => {
                            navigation.navigate("categorydetail", {
                              name: item.name,
                              id: item.id,
                            });
                          }}
                        >
                          <Image
                            source={{ uri: `${baseURLImage}${item.thumbnail}` }}
                            style={{ height: 50, width: 50 }}
                          />
                        </TouchableOpacity>
                        <View
                          style={[
                            style.CatagoryTextView,
                            {
                              marginHorizontal: 20,
                              width: heightPercentageToDP("10"),
                              minHeight: heightPercentageToDP("5"),
                            },
                          ]}
                        >
                          <Text style={style.CategoryText}>{item.name}</Text>
                        </View>
                      </View>
                    </>
                  );
                }}
              /> */}
              {/* <FlatList
                numColumns={3}
                // horizontal={true}
                data={hooks.categoryList[2]}
                renderItem={({ item }) => {
                  return (
                    <>
                      <View style={{}}>
                        <TouchableOpacity
                          style={[style.CatagoryView, { marginHorizontal: 15 }]}
                          onPress={() => {
                            navigation.navigate("categorydetail", {
                              categoryItem: item,
                            });
                          }}
                        >
                          <Image
                            source={{ uri: `${baseURLImage}${item.thumbnail}` }}
                            style={{ height: 50, width: 50 }}
                          />
                        </TouchableOpacity>
                        <View
                          style={[
                            style.CatagoryTextView,
                            {
                              marginHorizontal: 20,
                              width: heightPercentageToDP("10"),
                              minHeight: heightPercentageToDP("5"),
                            },
                          ]}
                        >
                          <Text style={style.CategoryText}>{item.name}</Text>
                        </View>
                      </View>
                    </>
                  );
                }}
              /> */}

              {/* {hooks.categoryList[2].map((item) => {

                return (

                  <>
                    <View>
                      <TouchableOpacity style={{ width: 100, height: 100, backgroundColor: 'white', borderRadius: 50, alignItems: 'center', marginHorizontal: 10, marginVertical: 10, justifyContent: 'center' }}>
                        <Image
                          source={{ uri: `${baseURLImage}${item.thumbnail}` }}
                          style={{ height: 70, width: 50 }}
                        />
                      </TouchableOpacity>
                      <View style={style.CatagoryTextView}>
                        <Text>{item.name}</Text>
                      </View>
                    </View>
                  </>
                )
              })} */}
            </View>
          </ScrollView>

          {/* <FlatList
            horizontal={true}
            data={hooks.categoryList[1]}
            renderItem={({ item }) => {
              return (
                // console.log("item", item)
                <><View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={style.CatagoryView}>
                    <Image
                      source={{ uri: `${baseURLImage}${item.thumbnail}` }}
                      style={{ height: 60, width: 60 }}
                    />
                  </View>
                  <View style={style.CatagoryTextView}>
                    <Text>{item.name}</Text>
                  </View>
                </View>
                </>
              )
            }}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
          /> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CategorySeeAll;
