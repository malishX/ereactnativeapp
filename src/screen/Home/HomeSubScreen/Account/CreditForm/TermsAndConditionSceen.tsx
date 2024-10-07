import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { WebView } from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign'

import { BaseColor, font, FontFamily } from '../../../../../config'
import useStyles from "../../../Style";
import { TabRouter } from '@react-navigation/native';

const TermsAndConditionSceen = ({ navigation, route }: { navigation: any, route: any }) => {
    const style = useStyles()

    const [terms, setTerms] = useState(route.params.page1)

    return (
        <SafeAreaView
            style={[
                style.mainView,
                {
                    marginTop: StatusBar.currentHeight,
                    backgroundColor: "#fff",
                },
            ]}
        >
            <View style={[style.headerView, { justifyContent: "flex-start" }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" color={"white"} size={25} />
                </TouchableOpacity>
                <Text style={style.headerTextView}>Terms And Conditons</Text>
            </View>
            {/* <View style={{marginHorizontal: 20}}> */}
            {/* <WebView
                originWhitelist={['*']}
                source={{ html: terms }}
                style={{ marginHorizontal: 20, backgroundColor: '#fff', fontFamily: font(FontFamily.fontRegular) }}
                scalesPageToFit={false}
                scrollEnabled={true}
            /> */}
            <WebView
                originWhitelist={['*']}
                source={{
                    baseUrl: '',
                    html: articleHtml({
                        body: terms,
                    }),
                }}
            />
            {/* </View> */}
        </SafeAreaView>
    )
}

export const generateAssetFontCss = ({
    fontFileName,
    extension = 'ttf',
}: {
    fontFileName: string;
    extension?: string;
}) => {
    const fileUri = Platform.select({
        ios: `${fontFileName}.${extension}`,
        android: `file:///android_asset/fonts/${fontFileName}.${extension}`,
    });

    return `@font-face {
        font-family: '${fontFileName}';
        src: local('${fontFileName}'), url('${fileUri}') ;
    }`;
};

export const articleHtml = ({ body }: { body: string }) => `
  <html>
  <head>
      <style>
          ${generateAssetFontCss({
          fontFileName: 'Metropolis-Regular',
          extension: 'otf',
})}
          body {
              font-family: Metropolis-Regular;
              color: gray;
            //   font-size: 14px;
          }
      </style>
      <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
      />
  </head>
  <body style="padding:10px">
      ${body}
  </body>
  </html>
  `;

export default TermsAndConditionSceen

const styles = StyleSheet.create({})