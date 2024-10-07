import { Alert, FlatList, Image, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {launchCamera} from 'react-native-image-picker'

import { BaseColor, font, FontFamily } from '../../../../config'
import useStyles from '../../Style'
import { deviceHeight, deviceWidth, getFontSize } from '../../../../config/responsive'
import getHooks from '../../../../hooks';
import { CameraOptions, CameraOptionsData, CameraOptionsResponse } from '../../../../services/Responses/Home/CameraOptionsResponse';
import ApiHelper from '../../../../services/apiHelper';
import { toastController } from '../../../../utils';
import ProgressView from '../../../../components/Organisms/progressView';
import { Images } from '../../../../Images';
import { BaseResponse } from '../../../../services';
import axios from 'axios';
import { cameraOptionsURL, cameraUploadURL } from '../../../../services/Constants';
import { request, PERMISSIONS } from 'react-native-permissions';

const AdditionalServiceScreen = ({ navigation }: { navigation: any }) => {
    const style = useStyles()
    const hooks = getHooks()
    const { toast } = toastController()

    const userData = hooks.user
    const [isProgress, setProgress] = useState<Boolean>(false)
    // const [cameraOptions, setCameraOptions] = useState<CameraOptionsData>()
    const [cameraOptions,setCameraOptions] = useState<CameraOptions[]>([])
    const [categoryOptions,setCategoryOptions] = useState<CameraOptions[]>([])
    const [isTearms, setShowTearms] = useState<Boolean>(false)
    const [cameraImage,setCamaraImage] = useState<string>("")

    console.log("cameraImage",cameraImage);
    

    let options:any = {
            saveToPhotos: true,
            mediaType: 'photo'
        }

    console.log("options", options);

    const requestCameraPermission = async (key: string,permissions: any) => {
        try {
            const getPermission = await request(permissions)
            console.log("result~~~~~~>", getPermission)
            if (getPermission === 'granted') {
                console.log('You can use the camera');
                const result = await launchCamera(options);
                console.log("result", result);
                cameraUploadApiCall(key,result)
                // setLicenceImage(result?.assets[0]?.uri)
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
        // try {
        //     const granted = await PermissionsAndroid.request(
        //         PermissionsAndroid.PERMISSIONS.CAMERA,
        //         {
        //             title: 'Cool Photo App Camera Permission',
        //             message:
        //                 'Cool Photo App needs access to your camera ' +
        //                 'so you can take awesome pictures.',
        //             buttonNeutral: 'Ask Me Later',
        //             buttonNegative: 'Cancel',
        //             buttonPositive: 'OK',
        //         },
        //     );
        //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //         console.log('You can use the camera');
        //         const result = await launchCamera(options);
        //         cameraUploadApiCall(key,result)
        //         // setCamaraImage(result.assets[0].uri)
        //     } else {
        //         console.log('Camera permission denied');
        //     }
        // } catch (err) {
        //     console.warn(err);
        // }
    };

    const cameraOptionsApiCall = async () => {
        setProgress(true);
        console.log("call customer update");

        const apiCallObj = {
            customerId: userData.id
        };

        ApiHelper.cameraOptions(apiCallObj).then((res: CameraOptionsResponse) => {
            console.log("camera Options", res);

            if (res.success === 1) {
                // dispatch(onRewardPointsCases(res.data));
                // getCartList2()
                setProgress(false)
                setCameraOptions(res.data.options)
                setCategoryOptions(res.data.options_categories)
                // toast("Success", res.specification, "success");
                // toast("Msg", res.specification, "info");
            } else if (res.success === 0) {
                toast("Msg", res.specification, "info");
                setProgress(false);
            } else {
                toast("network_error", "network_msg", "info");
                setProgress(false);
            }
        });
    };

const cameraUploadApiCall = async(key: string,file: any) => {
    setProgress(true)
    console.log("file.assets[0]",file.assets[0]);
    
    const formData = new FormData();
    formData.append('customerId', userData.id);
    formData.append('key', key);
    formData.append('image', {
        uri: file.assets[0].uri,
        type: file.assets[0].type,
        name: file.assets[0].fileName,
    });
    const headers = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        //   Authorization: `Bearer ${projectSecret}`,
        },
      };

    await axios
      .post(cameraUploadURL, formData, headers)
      .then(async response => {
        console.log(response.data);
        setProgress(false)
        cameraOptionsApiCall()
      })
      .catch(error => {
        console.log('error : ', error);
      });
  };
      
    useEffect(() => {
        cameraOptionsApiCall()
    }, [])
    
    return (
        <View
            style={[style.mainView, { backgroundColor: "#fff", position: 'relative' }]}
        >
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
                                    <Text style={{
                                        fontFamily: font(FontFamily.fontBold), color: "white", fontSize: getFontSize(18)
                                    }}>
                                        Click to Earn</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: "#fff", margin: 20,flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {cameraOptions.length > 0 && <Text style={styles.fontStyle}>Brands</Text>}
                    {cameraOptions.length > 0 && <FlatList
                        data={cameraOptions}
                        numColumns={3}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <View style={{ position: "relative" }}>
                                        {/* {cartList.length > 0 && ( */}
                                        <View style={styles.optionsView} pointerEvents={"none"}>
                                            <Image
                                                source={{ uri: item.image }}
                                                style={{ height: 80, width: 80 }}
                                            />
                                        </View>
                                        {item.status === 0 &&
                                            <View
                                                style={[styles.optionsView, { backgroundColor: "white", opacity: 0.5, position: "absolute", }]}
                                            >
                                                {/* <Images.RewardPoint width={40} height={40} /> */}
                                            </View>}
                                        {item.status === 0 &&
                                            <View
                                                style={{
                                                    backgroundColor: BaseColor.yellowColor,
                                                    position: "absolute",
                                                    width: 35,
                                                    height: 35,
                                                    top: 4,
                                                    left: 5,
                                                    borderRadius: 50,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Images.RewardPoint width={40} height={40} />
                                            </View>}
                                        {item.status !== 0 && <TouchableOpacity
                                            style={{
                                                backgroundColor: BaseColor.yellowColor,
                                                position: "absolute",
                                                width: 35,
                                                height: 35,
                                                top: 87,
                                                left: 79,
                                                borderRadius: 50,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            onPress={() => requestCameraPermission(item.key,Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)}
                                        >
                                            <Ionicons name='camera-outline' size={20} />
                                        </TouchableOpacity>}
                                        <View style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontFamily: font(FontFamily.fontBold) }}>{item.label}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />}
                    {categoryOptions.length > 0 && <View style={{ marginVertical: 20 }}>
                        <Text style={styles.fontStyle}>Categories</Text>
                    </View>}
                    <View style={{marginBottom: 30}}>
                    {categoryOptions.length > 0 && <FlatList
                        data={categoryOptions}
                        numColumns={3}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <View style={styles.optionsView}>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{ height: 60, width: 60 }}
                                        />
                                    </View>
                                    {item.status === 0 &&
                                        <View
                                            style={[styles.optionsView, { backgroundColor: "white", opacity: 0.5, position: "absolute", }]}
                                        >
                                            {/* <Images.RewardPoint width={40} height={40} /> */}
                                        </View>}
                                    {item.status === 0 &&
                                        <View
                                            style={{
                                                backgroundColor: BaseColor.yellowColor,
                                                position: "absolute",
                                                width: 35,
                                                height: 35,
                                                top: 4,
                                                left: 5,
                                                borderRadius: 50,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Images.RewardPoint width={40} height={40} />
                                        </View>}
                                    {item.status !== 0 && <TouchableOpacity
                                        style={{
                                            backgroundColor: BaseColor.yellowColor,
                                            position: "absolute",
                                            width: 35,
                                            height: 35,
                                            top: 87,
                                            left: 79,
                                            borderRadius: 50,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        onPress={() => requestCameraPermission(item.key,Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)}
                                    >
                                        <Ionicons name='camera-outline' size={20} />
                                    </TouchableOpacity>}

                                    <View style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: font(FontFamily.fontBold) }}>{item.label}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />}
                    </View>

</ScrollView>
                </View>
                {isProgress && <ProgressView />}
                <View style={[styles.termsView, {
                    top: isTearms ? deviceHeight - 200 : deviceHeight - 60,
                    height: isTearms ? hp("40") : hp("20")
                }]}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{ fontFamily: font(FontFamily.fontBold), color: 'white', fontSize: 18, marginBottom: isTearms ? 20 : 0 }} > Terms and Conditions</Text>
                        {isTearms ? <TouchableOpacity onPress={() => setShowTearms(false)}>
                            <AntDesign name='up' size={25} color={"white"} />
                        </TouchableOpacity> :
                            <TouchableOpacity onPress={() => setShowTearms(true)}>
                                <AntDesign name='down' size={25} color={"white"} />
                            </TouchableOpacity>}
                    </View>
                    {isTearms && <View style={{ marginLeft: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ height: 5, width: 5, backgroundColor: '#fff', borderRadius: 20, marginRight: 5 }} />
                            <View><Text style={styles.textStyle}>Earn 1 AED per Picture</Text></View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ height: 5, width: 5, backgroundColor: '#fff', borderRadius: 20, marginRight: 5 }} />
                            <Text style={styles.textStyle}>Only Approved Picture by Conektr will be considered for payment</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ height: 5, width: 5, backgroundColor: '#fff', borderRadius: 20, marginRight: 5 }} />
                            <Text style={styles.textStyle}>Respective Category Should be Visible clearly</Text>
                        </View>
                    </View>}
                </View>
            </SafeAreaView >
        </View >
    )
}

export default AdditionalServiceScreen

const styles = StyleSheet.create({
    fontStyle: {
        fontFamily: font(FontFamily.fontBold),
        fontSize: getFontSize(16),
        color: 'black'
    },
    optionsView: {
        width: hp("12"),
        height: hp("12"),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 10,
        shadowColor: "#000",
        elevation: 3,
        backgroundColor: "white",
        margin: 10,
    },
    termsView: {
        flex: 1,
        backgroundColor: BaseColor.purpleColor,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: hp("8"),
        position: 'absolute',
        left: 0,
        top: deviceHeight - 50,
        width: deviceWidth,
        // alignItems: 'center',
        padding: 20
    },
    textStyle: {
        fontFamily: font(FontFamily.fontBold),
        // marginTop: 5,
        color: 'white',
        // fontSize: getFontSize(16),
    }

})

// import { PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import { Button } from '../../../../components'
// import {launchCamera} from 'react-native-image-picker'

// const AdditionalServiceScreen = () => {

//     const [cameraPhoto,setCameraPhoto] = useState();
//     console.log("cameraPhoto",cameraPhoto);
    
// let options = {
//     saveToPhotos: true,
//     mediaType: 'photo'
// }

// const openCamera = async() => {
//     const granted= await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         const result = await launchCamera(options);
//         setCameraPhoto(result.assets[0].uri);
//     }
// }

//   return (
//     <View style={{justifyContent: 'center',alignItems: 'center'}}>
//      <Button 
//        text='Camera'
//        onClick={() => openCamera()}
//      />
//     </View>
//   )
// }

// export default AdditionalServiceScreen

// const styles = StyleSheet.create({})