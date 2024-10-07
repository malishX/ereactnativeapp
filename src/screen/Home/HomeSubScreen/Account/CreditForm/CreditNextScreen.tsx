import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { BaseColor, font, FontFamily } from '../../../../../config'
import useStyles from "../../../Style";
import getHooks from '../../../../../hooks';
import WebView from 'react-native-webview';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Button } from '../../../../../components'
import { toastController } from '../../../../../utils'

const CreditNextScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const style = useStyles()
    const hooks = getHooks()
    const { toast } = toastController()

    const terms = hooks.terms

    console.log("terms", route);

    const [term1, setTerm1] = useState<boolean>(false)
    const [term2, setTerm2] = useState<boolean>(false)
    const [term3, setTerm3] = useState<boolean>(false)

    const manageValidation = () => {
        if (term1 === false) {
            toast("Required Field", "Please check all terms and conditions", "info");
            return;
        }
        if (term2 === false) {
            toast("Required Field", "Please check all terms and conditions", "info");
            return;
        }
        if (term3 === false) {
            toast("Required Field", "Please check all terms and conditions", "info");
            return;
        }
        navigation.navigate('signatureform',{data: route.params})
    }
    return (
        <SafeAreaView
            style={[
                style.mainView,
                {
                    marginTop: StatusBar.currentHeight,
                    backgroundColor: '#fff',
                },
            ]}
        >
            <View style={[style.headerView, { justifyContent: "flex-start" }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" color={"white"} size={25} />
                </TouchableOpacity>
                <Text style={style.headerTextView}>Credit Form Page 2</Text>
            </View>
            {/* <View> */}
            {/* <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',height: 300}}> */}
            <ScrollView>
                <WebView
                    originWhitelist={['*']}
                    source={{
                        baseUrl: '',
                        html: articleHtml({
                            body: terms.page_2_content_1
                            ,
                        }),
                    }}
                    scrollEnabled={false}
                    automaticallyAdjustContentInsets={false}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                    style={{ height: 100 }}
                />
                {/* </View> */}
                {/* <ScrollView style={{ marginBottom: -150 }}> */}

                <View style={{ flexDirection: 'row', marginHorizontal: 20, width: widthPercentageToDP(75), marginTop: 20 }}>
                    {term1 ? <TouchableOpacity onPress={() => { setTerm1(false) }} style={{ marginRight: 40 }}>
                        <FontAwesome name='check-square' size={25} color={BaseColor.purpleColor} />
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setTerm1(true) }} style={{ marginRight: 40 }}>
                            <FontAwesome name='square-o' size={25} color={BaseColor.purpleColor} />
                        </TouchableOpacity>}
                    <Text style={{ fontFamily: font(FontFamily.fontRegular), fontSize: 14 }}>{terms.page_2_terms_1}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 20, width: widthPercentageToDP(75), height: 280, marginTop: 10 }}>
                    {term2 ? <TouchableOpacity onPress={() => { setTerm2(false) }} style={{ marginRight: 40, paddingTop: 10 }}>
                        <FontAwesome name='check-square' size={25} color={BaseColor.purpleColor} />
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setTerm2(true) }} style={{ marginRight: 40, paddingTop: 10 }}>
                            <FontAwesome name='square-o' size={25} color={BaseColor.purpleColor} />
                        </TouchableOpacity>}
                    <WebView
                        originWhitelist={['*']}
                        source={{
                            baseUrl: '',
                            html: articleHtml({
                                body: terms.page_2_terms_2
                                ,
                            }),
                        }}
                        automaticallyAdjustContentInsets={false}
                        scrollEnabled={false}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 20, width: widthPercentageToDP(75) }}>
                    {term3 ? <TouchableOpacity onPress={() => { setTerm3(false) }} style={{ marginRight: 40 }}>
                        <FontAwesome name='check-square' size={25} color={BaseColor.purpleColor} />
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setTerm3(true) }} style={{ marginRight: 40 }}>
                            <FontAwesome name='square-o' size={25} color={BaseColor.purpleColor} />
                        </TouchableOpacity>}
                    <Text style={{ fontFamily: font(FontFamily.fontRegular), fontSize: 14 }}>{terms.page_2_terms_3}</Text>
                </View>

                <WebView
                    originWhitelist={['*']}
                    source={{
                        baseUrl: '',
                        html: articleHtml({
                            body: terms.page_2_content_2
                            ,
                        }),
                    }}
                    scrollEnabled={false}
                    automaticallyAdjustContentInsets={false}
                    style={{ height: 50 }}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                    <Button
                        text='Back'
                        style={{ borderColor: BaseColor.yellowColor, borderRadius: 40, width: widthPercentageToDP(40), borderWidth: 2, backgroundColor: 'white' }}
                        onClick={() => { navigation.goBack() }}
                    />
                    <View style={{ width: 10 }}></View>
                    <Button
                        text='Next'
                        style={{ borderRadius: 40, width: widthPercentageToDP(40), backgroundColor: BaseColor.yellowColor }}
                        onClick={() => { manageValidation() }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export const generateAssetFontCss = ({
    fontFileName,
    extension = 'otf',
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
              font-size: 14px;
          }
      </style>
      <meta
          name="viewport"
          content="width=device-width, user-scalable=no, height=device-height"
      />
  </head>
  <body style="padding:10px">
      ${body}
  </body>
  </html>
  `;
export default CreditNextScreen

const styles = StyleSheet.create({})
