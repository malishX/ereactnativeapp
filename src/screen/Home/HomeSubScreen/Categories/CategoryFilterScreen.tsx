import { FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import useStyles from "../../Style";
import useStyle from "./style"
import { Images } from '../../../../Images';
import { BaseColor, font, FontFamily, getFontSize } from '../../../../config';
import { useDispatch } from 'react-redux';
import getHooks from '../../../../hooks';
import Icon from 'react-native-vector-icons/Fontisto';
import { RadioButton } from 'react-native-paper';
import { Button, ButtonView } from '../../../../components';

const CategoryFilterScreen = ({ navigation, route }: { navigation: any, route: any }) => {
  const style = useStyles();
  const styles = useStyle();

  const dispatch = useDispatch();
  const hooks = getHooks();
  console.log("filter ROute", route);

  const availability = hooks.subCategory

  console.log("availibility", availability);

  const [tabData, setTabData] = useState<any>(["Availibility", "Sub-Categories"]);
  const [activeTab, setActiveTab] = useState<number>(1)
  const [selectRadioBtn, setRadioBtn] = useState<string>(route.params?.subCategoryName)
  const [subCategoryData, setSubCategoryData] = useState<any>(["Available", "Out of Stock"])
  const [FilterValue, setFilterValue] = useState<any>(
    ["A to Z",
      "Price - High to Low",
      "Price - Low to High",
      "Relevance"
    ]
  )
  const [subCategoryValue, setSubCategoryValue] = useState<any>("")
  const [selectSubCategoryValue, setSelectSubCategoryValue] = useState<any>("")
  console.log("tabData", tabData);
  console.log("selectRadioBtn", selectRadioBtn);
  console.log("subCategoryData", subCategoryData);
  console.log("filterValue", FilterValue);
  console.log("subCategoryValue", subCategoryValue);
  console.log("activeTab", activeTab);

  return (
    <View style={[style.mainView, { backgroundColor: "#000" }]}>
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
          <Text style={{ fontFamily: font(FontFamily.fontBold), color: "white", fontSize: getFontSize(20) }}>Sort & filter</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name='close-a' size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>

          <View style={{}}>
            <View style={{ marginVertical: 20 }}>
              <FlatList
                horizontal
                data={FilterValue}
                renderItem={({ item }) => {
                  return (
                    <View style={{ paddingLeft: 10 }}>
                      <TouchableOpacity
                        style={[styles.subCategory, {
                          backgroundColor: subCategoryValue === item ? BaseColor.yellowColor : BaseColor.whiteColor
                        }]}
                        onPress={() => setSubCategoryValue(item)}
                      >
                        <Text style={{ fontFamily: font(FontFamily.fontBold), color: "black" }}>{item}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={{ margin: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <FlatList
                  data={tabData}
                  renderItem={({ item, index }) => {
                    console.log("index", index);

                    return (
                      <TouchableOpacity
                        style={[styles.tabView, {
                          backgroundColor: activeTab === index ? BaseColor.grayBorderColor : "#fff", borderColor: activeTab === index ? BaseColor.dividerColor : "#fff", borderRightWidth: 0,
                          borderLeftWidth: 0,
                          borderWidth: 1
                        }]}
                        onPress={() => setActiveTab(index)}
                      >
                        <Text style={{
                          fontFamily: font(FontFamily.fontBold),
                          fontSize: getFontSize(16),
                          color: "black",
                          alignSelf: 'center',
                          textAlign: "center",
                          padding: 10,
                        }}>{item}</Text>
                      </TouchableOpacity>
                    )
                  }}
                />
                <View style={styles.tabDetailView}>
                  {activeTab === 1 ?
                    <FlatList
                      data={availability}
                      renderItem={({ item }) => {
                        return (
                          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                            <RadioButton
                              value="first"
                              status={selectRadioBtn === item.id ? 'checked' : 'unchecked'}
                              onPress={() => setRadioBtn(item.id)}
                            // status={checked === 'first' ? 'checked' : 'unchecked'}
                            // onPress={() => setChecked('first')}
                            />
                            <Text style={{ fontFamily: font(FontFamily.fontRegular), color: 'black' }}>
                              {item.name}
                            </Text>
                          </View>
                        )
                      }}
                    /> :
                    <FlatList
                      data={subCategoryData}
                      renderItem={({ item, index }) => {
                        return (
                          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                            <RadioButton
                              value="first"
                              status={selectSubCategoryValue === item ? 'checked' : 'unchecked'}
                              onPress={() => setSelectSubCategoryValue(item)}
                            // status={checked === 'first' ? 'checked' : 'unchecked'}
                            // onPress={() => setChecked('first')}
                            />
                            <Text style={{ fontFamily: font(FontFamily.fontRegular), color: 'black' }}>
                              {item}
                            </Text>
                          </View>
                        )
                      }}
                    />
                  }
                </View>
              </View>
            </View>

          </View>
          <View style={{
            width: '90%',
            height: 50,
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            margin: 20
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                text='Apply Filter'
                onClick={() => {
                  navigation.navigate('categorydetail', { filter: subCategoryValue, sub_CatName: selectRadioBtn });
                }}
                style={{ width: 150, height: 40, borderRadius: 50, backgroundColor: BaseColor.yellowColor }}
              />
              <Button
                text='Clear All'
                onClick={() => { setRadioBtn("") }}
                style={{ width: 150, height: 40, borderRadius: 50, borderColor: BaseColor.yellowColor, borderWidth: 2, backgroundColor: BaseColor.whiteColor }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default CategoryFilterScreen
