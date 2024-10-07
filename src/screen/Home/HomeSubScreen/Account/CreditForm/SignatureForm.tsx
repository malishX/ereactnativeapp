import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SignatureCapture from 'react-native-signature-capture';
// import SignatureScreen from "react-native-signature-canvas";
import { BaseColor, font, FontFamily } from '../../../../../config'
import useStyles from "../../../Style";
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import { Button } from '../../../../../components';
import getHooks from '../../../../../hooks';
import axios, { Axios } from 'axios';
import { creditcreateURL } from '../../../../../services/Constants';
import { Image } from 'react-native-svg';
import ProgressView from '../../../../../components/Organisms/progressView';

const SignatureForm = ({ navigation, route }: { navigation: any, route: any }) => {
  const style = useStyles()
  const hooks = getHooks()

  const Signatureref = useRef<SignatureCapture>()
  const userData = hooks.user
  const apiBodydata = route.params.data && route.params.data

  console.log("apiBodydata", apiBodydata);


  console.log("signature route", route.params);
  const [isProgress, setProgress] = useState<boolean>(false)

  const saveSign = () => {
    Signatureref?.current?.saveImage();
  }

  const resetSign = async () => {
    console.log("ref", Signatureref.current);
    await Signatureref?.current?.resetImage()
  }

  const onSaveEvent = (result: any) => {
    console.log("result", result);
    creditCreateApiCall(result.pathName)
  }

  const _onDragEvent = () => {
    console.log("dragged");
  }

  const creditCreateApiCall = async (file: any) => {
    setProgress(true)
    console.log("file.assets[0]", file);
    const formData = {
      customer_id: userData.id,
      page1: "1",
      outlet_name: apiBodydata.outletName,
      person_name: apiBodydata.personName,
      person_title: apiBodydata.personTitle,
      person_details: apiBodydata.personDetail,
      emirate: apiBodydata.emirate,
      trade_license_number: apiBodydata.tradelicence,
      page_1_terms_check: "1",
      page_2_terms_1: "1",
      page_2_terms_2: "1",
      page_2_terms_3: "1",
      vat_trn_image: {
        uri: apiBodydata.vatNumber.uri,
        type: apiBodydata.vatNumber.type,
        name: apiBodydata.vatNumber.fileName,
      },
    trade_license_image: {
        uri: apiBodydata.licenceImage.uri,
        type: apiBodydata.licenceImage.type,
        name: apiBodydata.licenceImage.fileName,
      },
        signature: {
        uri: 'file://' + file,
        //   type: "image/png",
        //   name: "signature.png",
      }
    }
    // const formData = new FormData();
    // formData.append('customer_id', userData.id);
    // formData.append('page1', "1");
    // formData.append("outlet_name", apiBodydata.outletName);
    // formData.append("person_name", apiBodydata.personName);
    // formData.append("person_title", apiBodydata.personTitle);
    // formData.append("person_details", apiBodydata.personDetail);
    // formData.append("emirate", apiBodydata.emirate);
    // formData.append("trade_license_number", apiBodydata.tradelicence);
    // formData.append("page_1_terms_check", "1");
    // formData.append("page_2_terms_1", "1");
    // formData.append("page_2_terms_2", "1");
    // formData.append("page_2_terms_3", "1");
    // formData.append('vat_trn_image', {
    //   uri: apiBodydata.vatNumber.uri,
    //   type: apiBodydata.vatNumber.type,
    //   name: apiBodydata.vatNumber.fileName,
    // });
    // formData.append('trade_license_image', {
    //   uri: apiBodydata.licenceImage.uri,
    //   type: apiBodydata.licenceImage.type,
    //   name: apiBodydata.licenceImage.fileName,
    // });
    // formData.append('signature', {
    //   uri: 'file://' + file,
    //   type: "image/png",
    //   name: "signature.png",
    // });
    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Accept: 'application/x-www-form-urlencoded'
      },
    };

    await axios.post(creditcreateURL, formData, headers)
      .then(async response => {
        console.log("response.data", response.data);
        Alert.alert("Success", "Application successfully submitted!", [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('account'),
            style: 'destructive',
          },
        ])
        setProgress(false)
        // cameraOptionsApiCall()
      })
      .catch(error => {
        console.log('error : ', error);
      });
  };

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
        <Text style={style.headerTextView}>Credit Form</Text>
      </View>
      <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false}>
        <View style={{ borderWidth: 2, borderColor: BaseColor.purpleColor, borderRadius: 20, padding: 5 }}>
          <SignatureCapture
            style={styles.signatureView}
            ref={Signatureref}
            onSaveEvent={onSaveEvent}
            onDragEvent={_onDragEvent}
            saveImageFileInExtStorage={true}
            showNativeButtons={false}
            showTitleLabel={true}
            backgroundColor="white"
            strokeColor="black"
            minStrokeWidth={10}
            maxStrokeWidth={10}
            viewMode={"portrait"}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
          <Button
            text='Clear'
            textStyle={{ color: 'white' }}
            onClick={() => { resetSign() }}
            style={{ backgroundColor: BaseColor.purpleColor, width: 150, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}
          />
          <Text style={{ fontFamily: font(FontFamily.fontBold), color: 'white' }}>Clear</Text>
          {/* </TouchableHighlight> */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Button
              text='Back'
              style={{ borderColor: BaseColor.yellowColor, borderRadius: 40, width: widthPercentageToDP(40), marginBottom: 20, borderWidth: 2, backgroundColor: 'white' }}
              onClick={() => { navigation.goBack() }}
            />
            <View style={{ width: 10 }}></View>
            <Button
              text='Submit'
              style={{ borderRadius: 40, width: widthPercentageToDP(40), marginBottom: 20, backgroundColor: BaseColor.yellowColor }}
              onClick={() => { saveSign() }}
            />
          </View>

        </View>
        {isProgress && <ProgressView />}
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignatureForm

const styles = StyleSheet.create({
  signatureView: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
    height: hp(60),
    // width: 10,
  }
})
