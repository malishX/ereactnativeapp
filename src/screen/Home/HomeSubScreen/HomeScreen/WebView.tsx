import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { BaseColor } from '../../../../config'
import { Images } from '../../../../Images'
import useStyles from '../../Style'


const WebView2 = ({ navigation, route }: { navigation: any, route: any }) => {
  const style = useStyles()

  console.log("web view route", route);

  const customHTML = `
    <body style="display:flex; flex-direction: column;justify-content: center; 
      align-items:center; background-color: black; color:white; height: 100%;">
        <h1 style="font-size:100px; padding: 50px; text-align: center;" 
        id="h1_element">
          This is simple html
        </h1>
        <h2 style="display: block; font-size:80px; padding: 50px; 
        text-align: center;" id="h2_element">
          This text will be changed later!
        </h2>
     </body>`;


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
              <AntDesign name="arrowleft" color={"white"} size={25} />
            </TouchableOpacity>

          </View>
        </View>
        <WebView source={{ uri: route.params.link }} />
        {/* <WebView source={{ html: customHTML }} /> */}
        {/* <WebView source={{ uri: 'https://google.com/' }} /> */}
      </SafeAreaView>
    </View>

  )
}

export default WebView2

const styles = StyleSheet.create({})