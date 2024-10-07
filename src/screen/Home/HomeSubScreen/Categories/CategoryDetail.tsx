import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";

import useStyles from "../../Style";
import { BaseColor, font, FontFamily, getFontSize } from "../../../../config";
import { Images } from "../../../../Images";
import getHooks from "../../../../hooks";
import ApiHelper from "../../../../services/apiHelper";
import { getSubCategoriesResponse } from "../../../../services/Responses/Home/getSubCategoriesResponse";
import { toastController } from "../../../../utils";
import ProgressView from "../../../../components/Organisms/progressView";
import { TransitionIOSSpec } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs";
import { getproductsCategoryResponse } from "../../../../services/Responses/Home/getproductsCategory";
import useTheme from "../../../../theme";
import ProductBox from "../HomeScreen/ProductBox";
import { ActionTypes } from "../../../../action";
import { GetCartList2Response } from "../../../../services/Responses/Home/GetCategoryList2";
import Preferences from "../../../../services/preferences";
import { hashKey } from "../../../../services/Constants";
import { BaseResponse } from "../../../../services";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import ExpandableFavoriteList from "../../../../components/Modals/ExpandableFavoriteList";
import { Result } from "../../../../services/Responses/Home/ProductsDataResponse";
import { showToast } from "../../../../utils/toastController";
import { useIsFocused } from "@react-navigation/native";

const CategoryDetail = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const style = useStyles();
  const hooks = getHooks();
  const theme = useTheme();
  const { toast } = toastController();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  console.log("route", route);
  const userData = hooks.user;
  const retailer_id = hooks.retailer_id;
  const cartList = hooks.cartList;
  const quote_id = hooks.activeCart;
  console.log("retailer_id", retailer_id);

  const [budge, setBudge] = useState<number>(0);
  const [isProgress, setProgress] = useState<boolean>(false);
  const [isSearch, setSearch] = useState<boolean>(false);
  const [subCategory, setSubCategory] = useState<any>(null);
  const [subCategoryId, setSubCategoryId] = useState<any>(route.params?.sub_CatName ? route.params?.sub_CatName : null);
  const [subCategoryName, setSubCategoryName] = useState<any>(null);
  const [productData, setProductData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(1);
  const [cat_id, setCat_id] = useState<string>(
    route.params?.id ? route.params.id : route.params?.sub_CatName
  );
  const [categoryName, setCategoyName] = useState<string>(
    route.params.name && route.params.name
  );
  const [countProduct, setCountProduct] = useState<number>(0);
  const [isListlayout, setListLayout] = useState<boolean>(true);
  const [sortCount, setSortCount] = useState<number>(0);
  const [isShowCountBtn, setShowCountBtn] = useState<boolean>(false);
  console.log("searchValue", searchValue);
  console.log("subCategory", subCategory);

  const onCartList = (data: any) => {
    return {
      type: ActionTypes.CART_LIST,
      data,
    };
  };

  const getCartList2 = async () => {
    console.log("--------called");
    setProgress(true);

    const apiCallObj = {
      hashkey: hashKey,
      quote_id: quote_id,
    };

    ApiHelper.getCartList2(apiCallObj).then((res: GetCartList2Response) => {
      console.log("Cart Api Call", res.data.items);

      if (res.success === 1) {
        dispatch(onCartList(res.data.items));
        Preferences.setCartListQtys(res.data.items.length);
        setTimeout(() => {
          setProgress(false);
        }, 1500);
      } else if (res.success === 0) {
        toast("Msg", res.specification, "info");
      } else {
        toast("network_error", "network_msg", "info");
      }
    });
  };

  const budgecount = () => {
    var total = 0;
    for (var i = 0; i < cartList.length; i++) {
      total = total + cartList[i].qty;
    }
    setBudge(total);
    return console.log("total", total);
  };

  useEffect(() => {
    {
      route.params.categoryItem && route.params.categoryItem.id;
      getSubCategoryApiCall();
    }
    budgecount();
    getCartList2();
    // getproductsApiCall()
  }, []);

  useEffect(() => {
    setProductData([])
    setPageCount(1)
    // setSubCategoryId(route.params?.sub_CatName)
    if (route.params.name === "similar Products") {
      oosproductsApiCall().then((res) => {
        if (res.success === 1) {
          const newProductList = [...productData, ...res.result]; //productData.push(...res.result);
          console.log("REs->", res);
          setProductData(newProductList);
          setProgress(false);
          console.log("dsfdsfg");
          setCountProduct(res.count);
        } else if (res.success === 0) {
          toast("Msg", res.specification, "info");
          setProgress(false);
        } else {
          toast("network_error", "network_msg", "info");
          setProgress(false);
        }
      });
    } else {
      getproductsApiCall(pageCount).then((res) => {
        if (res.success === 1) {
          console.log("call get Product");
          showSortCount()
          const newProductList = [...productData, ...res.result]; //productData.push(...res.result);
          console.log("REs->", res);
          setProductData(newProductList);
          setProgress(false);
          console.log("dsfdsfg");
          setCountProduct(res.count);
        } else if (res.success === 0) {
          showToast(res.specification);
          setProgress(false);
        } else {
          showToast("Please Check your Network");
          setProgress(false);
        }
      });
    }
  }, [cat_id, isFocused]);

  const renderBasketList = ({ item }: any) => {
    const favouriteItem: Result = item;
    console.log("item", item);

    return (
      <ExpandableFavoriteList
        favoriteItem={favouriteItem}
        // subscriptionList={subscriptionParams}
        onSave={() => route.params.name === "similar Products" ?
          oosproductsApiCall().then((res) => {
            if (res.success === 1) {
              const newProductList = [...productData, ...res.result]; //productData.push(...res.result);
              console.log("REs->", res);
              setProductData(newProductList);
              setProgress(false);
              console.log("dsfdsfg");
              setCountProduct(res.count);
            } else if (res.success === 0) {
              toast("Msg", res.specification, "info");
              setProgress(false);
            } else {
              toast("network_error", "network_msg", "info");
              setProgress(false);
            }
          }) :

          getproductsApiCall(pageCount).then((res) => {
            if (res.success === 1) {
              const newProductList = [...productData, ...res.result]; //productData.push(...res.result);
              console.log("REs->", res);
              setProductData(newProductList);
              setProgress(false);
              console.log("dsfdsfg");
              setCountProduct(res.count);
            } else if (res.success === 0) {
              toast("Msg", res.specification, "info");
              setProgress(false);
            } else {
              toast("network_error", "network_msg", "info");
              setProgress(false);
            }
          })
        }
      />
    );
  };
  // useEffect(() => {
  //     getproductsApiCall(pageCount).then((res) => {
  //         if (res.success === 1) {
  //             setProductData(res.result);
  //             setProgress(false);
  //             console.log("dsfdsfg");
  //             setCountProduct(res.count)
  //         } else if (res.success === 0) {
  //             toast("Msg", res.specification, "info");
  //             setProgress(false);
  //         } else {
  //             toast("network_error", "network_msg", "info");
  //             setProgress(false);
  //         }
  //     })
  // }, [])

  // const paginationApiCall = () => {
  //     {
  //         const paginationCount = pageCount + 1;
  //         setPageCount(paginationCount);
  //         console.log("page count", pageCount, paginationCount, productData);

  //         getproductsApiCall(paginationCount).then((res) => {
  //             if (res.success === 1) {
  //                 console.log("NEW RES", res);
  //                 const newProductList = productData.concat(res.result);
  //                 setProductData([...newProductList]);
  //                 setProgress(false);
  //                 console.log("dsfdsfg");
  //             } else if (res.success === 0) {
  //                 toast("Msg", res.specification, "info");
  //                 setProgress(false);
  //             } else {
  //                 toast("network_error", "network_msg", "info");
  //                 setProgress(false);
  //             }
  //         });
  //     }
  // }

  const onSubCategory = (data: any) => {
    return {
      type: ActionTypes.SUBCATEGORY,
      data,
    };
  };
  const getSubCategoryApiCall = async () => {
    setProgress(true);

    const apiCallObj = {
      cat_id: cat_id,
    };

    ApiHelper.getSubCategories(apiCallObj).then(
      (res: getSubCategoriesResponse) => {
        console.log("get sub category Call-===========>", res);
        if (res.success === 1) {
          setSubCategory(res.data);
          dispatch(onSubCategory(res.data));
          // setProgress(false);
        }
      }
    );
  };

  const handleSubCategory = (subCatName: any) => {
    // console.log("subCategory Name", item);
    // setProductData([])
    // setPageCount(0)
    // // setSearch(true);
    // // setSearchValue(item.name)
    // setCategoyName(item.name)

    // setSubCategoryName(item)
    console.log("SUBCATEGORYNAME CLICK~~~~~~>", subCatName);
    setSubCategoryName(subCatName.name)
    setPageCount(1)
    setSubCategoryId(subCatName.id)
    setCat_id(subCatName.id)
    setProductData([])
    setSortCount(0)
  }
  // const getproductsApiCall = async (count: number) => {
  //     console.log("count=======>", count);

  //     return new Promise<getproductsCategoryResponse>((resolve, reject) => {
  //         setProgress(true);
  //         // const formData = new FormData();
  //         const apiCallObj = {
  //             cat_id: cat_id,
  //             customerId: userData.id,
  //             retailer_id: retailer_id,
  //             search_query: searchValue,
  //             filter: route.params.filter && route.params.filter,
  //             // subcat_id: subcat_id ,
  //             page: count
  //         };

  //         ApiHelper.getproductsCategory(apiCallObj).then((res: getproductsCategoryResponse) => {
  //             console.log("get Product category Call-===========>", res);
  //             resolve(res);
  //         });
  //     });
  // };
  const reachedData = () => {
    console.log("load more item", pageCount);
    setPageCount(pageCount + 1);
  };

  const showSortCount = () => {
    if (subCategoryId !== null) {
      setSortCount(sortCount + 1);
      setShowCountBtn(true);
    }
    if (route.params?.filter?.length > 0) {
      setSortCount(sortCount + 1);
      setShowCountBtn(true);
    }
  }

  const getproductsApiCall = async (paginationCount: any) => {
    return new Promise<getproductsCategoryResponse>((resolve, reject) => {
      // console.log("call to getProducts", cat_id);
      const subcat_id = route.params.subcat_id && route.params.subcat_id;
      var filter
      if (route.params?.filter === "Price - High to Low") {
        filter = "high"
      } else if (route.params?.filter === "Price - Low to High") {
        filter = "low"
      } else if (route.params?.filter === "Relevance") {
        filter = "relevance"
      } else if (route.params?.filter === "A to Z") {
        filter = "az"
      } else {
        filter = "az"
      }

      console.log("subcat_id", subcat_id);
      var apiCallObj: any
      setProgress(true);
      subCategoryId === null ?
        apiCallObj = {
          cat_id: cat_id,
          customerId: userData.id,
          retailer_id: "28",
          page: paginationCount
        } :
        apiCallObj = {
          cat_id: cat_id,
          customerId: userData.id,
          retailer_id: "28",
          search_query: searchValue,
          filter: filter,
          subcat_id: route.params?.sub_CatName ? route.params.sub_CatName : cat_id,
          page: paginationCount
        }

      console.log("get Product category apiCallObj", apiCallObj)

      ApiHelper.getproductsCategory(apiCallObj)
        .then((res: getproductsCategoryResponse) => {
          console.log("get Product category Call-===========>", res);
          // setSubCategoryName(res.category_name)
          setCategoyName(res.category_name);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  // const getproductsApiCall = async () => {
  //   return new Promise<getproductsCategoryResponse>((resolve, reject) => {
  //     console.log("call to getProducts", cat_id);
  //     const subcat_id = route.params.subcat_id && route.params.subcat_id;
  //     console.log("subcat_id", subcat_id);
  //     var apiCallObj: any
  //     setProgress(true);
  //     subCategoryName === null ?
  //       apiCallObj = {
  //         cat_id: cat_id,
  //         customerId: userData.id,
  //         retailer_id: "28",
  //         search_query: searchValue,
  //         // filter: route.params.filter && route.params.filter,
  //         // subcat_id: subCategoryName === null ? null : subCategoryName.id,
  //         page: pageCount,
  //       } : apiCallObj = {
  //         cat_id: cat_id,
  //         customerId: userData.id,
  //         retailer_id: "28",
  //         // search_query: searchValue,
  //         // filter: route.params.filter && route.params.filter,
  //         // subcat_id: SubCatID,
  //         page: pageCount,
  //       }

  //     console.log("get Product category apiCallObj", apiCallObj)

  //     ApiHelper.getproductsCategory(apiCallObj)
  //       .then((res: getproductsCategoryResponse) => {
  //         console.log("get Product category Call-===========>", res);
  //         setCategoyName(res.category_name)
  //         resolve(res);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // };

  const oosproductsApiCall = async () => {
    return new Promise<getproductsCategoryResponse>((resolve, reject) => {
      console.log("call to oosProducts", cat_id);
      const subcat_id = route.params.subcat_id && route.params.subcat_id;
      console.log("subcat_id", subcat_id);

      setProgress(true);

      const apiCallObj = {
        hashKey: hashKey,
        sku: cat_id,
        customerId: userData.id,
        retailer_id: "",
        page: pageCount,
      };

      ApiHelper.oosProducts(apiCallObj)
        .then((res: getproductsCategoryResponse) => {
          console.log("get oos Product category Call-===========>", res);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
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
            {!isSearch && (
              <View style={{ marginHorizontal: 15 }}>
                <View
                  style={{
                    width: hp("20"),
                    flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "center",
                  }}
                >
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={{
                      fontFamily: font(FontFamily.fontBold),
                      color: "white",
                      fontSize: getFontSize(20),
                    }}
                  >
                    {categoryName}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {isSearch && (
              <View style={[style.searchView, { marginHorizontal: 6 }]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // marginHorizontal: 15
                  }}
                >
                  <TextInput
                    style={[style.inputText, { width: "90%" }]}
                    //   onPressIn={() => navigation.navigate("searchdetail")}
                    value={searchValue}
                    onChangeText={setSearchValue}
                    placeholder="Search"
                    allowFontScaling={false}
                    onSubmitEditing={() => getproductsApiCall(pageCount).then((res) => {
                      if (res.success === 1) {
                        const newProductList = [...productData, ...res.result]; //productData.push(...res.result);
                        console.log("REs->", res);
                        setProductData(newProductList);
                        setProgress(false);
                        console.log("dsfdsfg");
                        setCountProduct(res.count);
                      } else if (res.success === 0) {
                        toast("Msg", res.specification, "info");
                        setProgress(false);
                      } else {
                        toast("network_error", "network_msg", "info");
                        setProgress(false);
                      }
                    })}
                  ></TextInput>
                  <TouchableOpacity
                    onPress={() =>
                      searchValue.length > 0
                        ? setSearchValue("")
                        : setSearch(false)
                    }
                  >
                    <Icon name="close-a" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {!isSearch && (
              <TouchableOpacity
                onPress={() => setSearch(true)}
                style={{ marginHorizontal: 15 }}
              >
                <Icon name="search" size={18} color={"white"} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{ position: "relative" }}
              onPress={() => navigation.navigate("cart")}
            >
              {budge > 0 && (
                <View
                  style={{
                    backgroundColor: "white",
                    position: "absolute",
                    width: 15,
                    height: 15,
                    top: -9,
                    left: 18,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      fontFamily: font(FontFamily.fontBold),
                    }}
                  >
                    {budge}
                  </Text>
                </View>
              )}
              <Images.CartIcon width={30} height={20} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <ScrollView> */}

        {/* {productData === null ? (
          <View style={{ marginVertical: 20 }}><Text>No sub category Found</Text></View>
        ) : ( */}
        <View style={{ marginVertical: 20 }}>
          <View style={{}}>
            <FlatList
              horizontal
              data={subCategory}
              renderItem={({ item }) => {
                console.log("subcategoryName", item);

                return (
                  <View style={{ paddingLeft: 10, marginBottom: 20 }}>
                    <TouchableOpacity
                      style={[styles.subCategory, {
                        backgroundColor: item.id === subCategoryId ? BaseColor.yellowColor : "white",
                      }]}
                      onPress={() => handleSubCategory(item)}
                    >
                      <Text
                        style={{
                          fontFamily: font(FontFamily.fontBold),
                          color: "black",
                        }}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {productData === null ? (
            <View>
              <Text>null</Text>
            </View>
          ) : productData.length === 0 ? (
            <View style={{ alignItems: "center", marginVertical: 20 }}>
              <Text
                style={{
                  fontFamily: font(FontFamily.fontBold),
                  color: BaseColor.purpleColor,
                  fontSize: 20,
                }}
              >
                No Products Found!
              </Text>
            </View>
          ) : (
            <View style={{}}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: font(FontFamily.fontBold),
                    color: "black",
                  }}
                >
                  {countProduct} Products
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {route.params.name === "similar Products" ? <View></View> :
                    <TouchableOpacity
                      style={theme.filterView}
                      onPress={() => navigation.navigate("categoryfilter", { subCategoryName: subCategoryId })}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: font(FontFamily.fontBold) }}>
                          Sort | Filter
                        </Text>
                        {isShowCountBtn && <Text style={{
                          color: '#fff',
                          fontSize: getFontSize(10),
                          backgroundColor: '#000',
                          borderRadius: 50,
                          paddingHorizontal: 5,
                          paddingTop: 2,
                          marginLeft: 5,
                        }}>
                          {isShowCountBtn && sortCount}
                        </Text>}
                      </View>
                    </TouchableOpacity>}
                  {isListlayout ?
                    <TouchableOpacity onPress={() => setListLayout(false)}>
                      <AntDesign name="bars" size={22} color='black' />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => setListLayout(true)}>
                      <AntDesign name="appstore-o" size={22} color='black' />
                    </TouchableOpacity>}
                </View>
              </View>
              {/* <View style={{ marginVertical: 20 }}>
                <Text>sdfdfg</Text>
                <FlatList
                  data={productData}
                  renderItem={renderBasketList}
                  onEndReached={() => reachedData()}
                />
              </View> */}
              <View style={{ marginVertical: 20 }}>
                {isListlayout ?
                  <ProductBox
                    data={productData}
                    id="2"
                    onEndReached={() => {
                      const paginationCount = pageCount + 1;
                      setPageCount(paginationCount);
                      getproductsApiCall(paginationCount).then((res) => {
                        if (res.success === 1) {
                          console.log("call get Product");

                          const newProductList = [...productData, ...res.result]; //productData.push(...res.result);
                          console.log("REs->", res);
                          setProductData(newProductList);
                          setProgress(false);
                          console.log("dsfdsfg");
                          setCountProduct(res.count);
                        } else if (res.success === 0) {
                          showToast(res.specification);
                          setProgress(false);
                        } else {
                          showToast("Please Check your Network");
                          setProgress(false);
                        }
                      });
                    }}
                    updateState={() => getproductsApiCall(pageCount).then((res) => {
                      if (res.success === 1) {
                        console.log("call get Product");

                        const newProductList = [...productData, ...res.result]; //productData.push(...res.result);
                        console.log("REs->", res);
                        setProductData(newProductList);
                        setProgress(false);
                        console.log("dsfdsfg");
                        setCountProduct(res.count);
                      } else if (res.success === 0) {
                        toast("Msg", res.specification, "info");
                        setProgress(false);
                      } else {
                        toast("network_error", "network_msg", "info");
                        setProgress(false);
                      }
                    })}
                  /> :
                  <View style={{ marginHorizontal: 10 }}>
                    <FlatList
                      data={productData}
                      renderItem={renderBasketList}
                      onEndReached={() => {
                        const paginationCount = pageCount + 1;
                        setPageCount(paginationCount);
                        getproductsApiCall(paginationCount).then((res) => {
                          if (res.success === 1) {
                            console.log("call get Product");

                            const newProductList = [...productData, ...res.result]; //productData.push(...res.result);
                            console.log("REs->", res);
                            setProductData(newProductList);
                            setProgress(false);
                            console.log("dsfdsfg");
                            setCountProduct(res.count);
                          } else if (res.success === 0) {
                            showToast(res.specification);
                            setProgress(false);
                          } else {
                            showToast("Please Check your Network");
                            setProgress(false);
                          }
                        });
                      }}
                    />
                  </View>}
              </View>
            </View>
          )}
        </View>
        {isProgress && <ProgressView />}
      </SafeAreaView >
    </View >
  );
};

export default CategoryDetail;

const styles = StyleSheet.create({
  subCategory: {
    borderColor: BaseColor.yellowColor,
    borderWidth: 2,
    borderRadius: 20,
    // padding: 8,
    height: 40,
    // marginHorizontal: 2,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});