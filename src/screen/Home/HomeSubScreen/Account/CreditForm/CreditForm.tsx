import { Alert, Image, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Dropdown } from 'react-native-element-dropdown'
import Modal from "react-native-modal/dist/modal";
import { CreditAutofillResponse } from '../../../../../services/Responses/Home/CreditAutofillResponse';

import useStyles from "../../../Style";
import { BaseColor, font, FontFamily, getFontSize } from '../../../../../config';
import { Images } from '../../../../../Images';
import { deviceWidth } from '../../../../../config/responsive';
import { launchCamera } from 'react-native-image-picker'
import { ButtonView } from '../../../../../components';
import ApiHelper from '../../../../../services/apiHelper';
import { BaseResponse } from '../../../../../services';
import { toastController } from '../../../../../utils';
import getHooks from '../../../../../hooks';
import { ActionTypes } from '../../../../../action'
import { useDispatch } from 'react-redux'
import { request, PERMISSIONS } from 'react-native-permissions';
import { showToast } from '../../../../../utils/toastController'

const CreditForm = ({ navigation }: any) => {
    const style = useStyles()
    const { toast } = toastController()
    const hooks = getHooks()
    const dispatch = useDispatch()

    const userData = hooks.user

    const [isProgress, setProgress] = useState<boolean>(false)
    const [outletName, setOutletName] = useState<string>('')
    const [personName, setPersonName] = useState<string>('')
    const [personTitle, setPersonTitle] = useState<any>(null)
    const [personDetail, setPersonDetail] = useState<string>('')
    const [emirate, setEmirate] = useState<any>(null)
    const [tradelicence, setTradelicence] = useState<string>('')
    const [vatNumber, setVatNumber] = useState<any>(null)
    const [licenceImage, setLicenceImage] = useState<any>(null)
    const [isterms, setTerms] = useState<boolean>(false)
    const [personTitleValue, setPersonTitleValue] = useState<string>('')
    const [selectEmirate, setSelectEmirate] = useState<string>('')
    const [terms, setTermsInfo] = useState<any>(null)
    const [isShowModal, setShowModal] = useState(false);

    console.log("licenceImage", vatNumber);
    console.log("licenceImage", licenceImage);
    console.log("Check OS", Platform.OS);

    console.log("personTitles", personTitle);

    let options: any = {
        saveToPhotos: true,
        mediaType: 'photo',
        selectionLimit: 2
    }

    const manageValidation = () => {
        // navigation.navigate("otpverify", { mobile: mobile });
        if (!outletName) {
            showToast("Please enter Outlet Name");
            return;
        }
        if (!personName) {
            showToast("Please enter Person Name");
            return;
        }
        if (!personTitleValue) {
            showToast("Please enter Person Title");
            return;
        }
        if (!personDetail) {
            showToast("Please enter Contact Person Detail");
            return;
        }
        if (!selectEmirate) {
            showToast("Please enter Emirate");
            return;
        }
        if (!tradelicence) {
            showToast("Please enter Trade licence");
            return;
        }
        if (!vatNumber) {
            showToast("Please Upload an image VAT TRN");
            return;
        }
        if (!licenceImage) {
            showToast("Please upload an image of Trade Licence");
            return;
        }
        if (isterms === false) {
            showToast("Please check terms and conditions");
            return;
        }
        navigation.navigate('creditnext', {
            outletName: outletName,
            personName: personName,
            personTitle: personTitleValue,
            personDetail: personDetail,
            emirate: selectEmirate,
            tradelicence: tradelicence,
            vatNumber: vatNumber,
            licenceImage: licenceImage
        })
    };

    // const requestCameraPermission = async () => {

    //     request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
    //         console.log("result", result)
    //         if (result === "granted") {
    //             openCamera()
    //             // const result: any = launchCamera(options);
    //             // console.log("launchCamera result", result);
    //         }
    //     })

    // }
    // const openCamera = async () => {
    //     await launchCamera(options, response => {
    //         if (response.didCancel) {
    //             console.log('Cancelled');
    //         } else if (response.errorMessage) {
    //             console.log('Error', response.errorMessage);
    //         } else {
    //             console.log("response", response);
    //             setVatNumber(response?.assets[0])
    //             // setFilePath(response.uri);
    //             // setBase64('data:image/png;base64,' + response.base64);
    //         }
    //     });

    // }
    const requestCameraPermission = async (permissions: any) => {
        try {
            const getPermission = await request(permissions)
            console.log("result~~~~~~>", getPermission)
            if (getPermission === 'granted') {
                console.log('You can use the camera');
                const result: any = await launchCamera(options);
                console.log("result", result);

                setVatNumber(result?.assets[0])
                // setLicenceImage(result?.assets[0]?.uri)
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
        // }
    };

    const requestCameraPermission2 = async (permissions: any) => {
        try {
            const getPermission = await request(permissions)
            console.log("result~~~~~~>", getPermission)
            if (getPermission === 'granted') {
                console.log('You can use the camera');
                const result: any = await launchCamera(options);
                console.log("result", result);

                setLicenceImage(result?.assets[0])
                // setLicenceImage(result?.assets[0]?.uri)
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const onAutofill = (data: any) => {
        console.log("data===========>", data);
        return {
            type: ActionTypes.TERMSANDCONDOTIONS,
            data,
        };
    };
    const creditAutofillApiCall = async () => {
        setProgress(true);
        // console.log("call customer update");

        const apiCallObj = {
            customer_id: userData.id,
            hashkey: "FpWLLg9RC958dsNICkXvyxbZZ189WA"
        };

        ApiHelper.creditAutofill(apiCallObj).then((res: CreditAutofillResponse) => {
            console.log("credit Autofill", res);

            if (res.success === 1) {
                dispatch(onAutofill(res.data))
                setOutletName(res.data.outlet_name);
                setPersonName(res.data.person_name);
                // personTitle.push({lable: res.data.person_title, value: res.data.person_title});
                // setPersonTitle([{
                //     label: res.data.person_title,
                //     value: res.data.person_title
                // }])
                const array = res.data.person_title.split(",");
                console.log("array", array);
                var person_title: any = [];
                for (var i = 0; i < array.length; i++) {
                    const ele = array[i];
                    console.log("ele7777", ele);
                    person_title.push({ label: ele, value: ele })
                }
                console.log("person_title", person_title);
                setPersonTitle(person_title);
                // setPersonTitle(array)
                // Alert.alert(array[0])
                // if (res.data.person_title.includes(',')) {
                //     setPersonTitle([{
                //         lable: res.data.person_title,
                //         value: res.data.person_title
                //     }])
                // }
                setPersonTitleValue(res.data.person_title);
                setPersonDetail(res.data.person_details);
                setEmirate([{
                    label: res.data.emirate,
                    value: res.data.emirate
                }]);
                setSelectEmirate(res.data.emirate);
                setTradelicence(res.data.trade_license_number)
                setTermsInfo(res.data.page1)
                // dispatch(onRewardPointsCases(res.data));
                // getCartList2()
                setProgress(false)
                // setCameraOptions(res.data.options)
                // setCategoryOptions(res.data.options_categories)
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

    const creditStatusApiCall = async () => {
        setProgress(true);
        // console.log("call customer update");

        const apiCallObj = {
            customer_id: userData.id,
            hashkey: "FpWLLg9RC958dsNICkXvyxbZZ189WA"
        };

        ApiHelper.creditStatus(apiCallObj).then((res: BaseResponse) => {
            console.log("credit status", res);

            if (res.success === 1) {
                if (res.data !== null && res.status === 'complete') {
                    setShowModal(true)
                }
                setProgress(false)
            } else if (res.success === 0) {
                toast("Msg", res.specification, "info");
                setProgress(false);
            } else {
                toast("network_error", "network_msg", "info");
                setProgress(false);
            }
        });
    };

    useEffect(() => {
        creditAutofillApiCall()
        creditStatusApiCall()
    }, [])

    return (
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
                <Text style={style.headerTextView}>Credit Form</Text>
            </View>
            <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.formTextView}>Outlet Name</Text>
                    <TextInput
                        style={styles.inputFieldView}
                        cursorColor={BaseColor.purpleColor}
                        value={outletName}
                        onChangeText={setOutletName}
                    />
                </View>

                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.formTextView}>Contact Person Name</Text>
                    <TextInput
                        style={styles.inputFieldView}
                        cursorColor={BaseColor.purpleColor}
                        value={personName}
                        onChangeText={setPersonName}
                    />
                </View>
                <View style={{ marginVertical: 15 }}>
                    <>
                        <Text style={styles.formTextView}>Contact Person Title</Text>
                        {console.log("label----->", personTitle)}
                        {personTitle === null ? <View></View> : <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={personTitle}
                            placeholder={"Select Person Title"}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={personTitleValue}
                            onChange={item => {
                                setPersonTitleValue(item.value);
                            }}
                            renderItem={(item: any) => {
                                return (
                                    <View style={styles.item}>
                                        <Text style={styles.textItem}>{item.label}</Text>
                                    </View>
                                )
                            }
                            }
                        />}
                    </>
                </View>
                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.formTextView}>Contact Person Details</Text>
                    <TextInput
                        style={styles.inputFieldView}
                        cursorColor={BaseColor.purpleColor}
                        value={personDetail}
                        onChangeText={setPersonDetail}
                    />
                </View>

                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.formTextView}>Select Emirate</Text>
                    {emirate === null ? <View></View> :
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            placeholder={"Select Emirate"}
                            data={emirate}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={selectEmirate}
                            onChange={item => {
                                setSelectEmirate(item.value);
                            }}
                            renderItem={(item: any) => {
                                return (
                                    <View style={styles.item}>
                                        <Text style={styles.textItem}>{item.label}</Text>
                                    </View>
                                )
                            }
                            }
                        />}
                </View>

                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.formTextView}>Trade License No.</Text>
                    <TextInput
                        style={styles.inputFieldView}
                        cursorColor={BaseColor.purpleColor}
                        value={tradelicence}
                        onChangeText={setTradelicence}
                    />
                </View>

                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.formTextView}>Please provide your VAT TRN Number</Text>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.cameraView} onPress={() => requestCameraPermission(Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)}>
                            {vatNumber === null ? <FontAwesome name='camera' size={100} color='black' /> :
                                <Image
                                    source={{ uri: vatNumber.uri }}
                                    style={styles.cameraView}
                                />
                            }
                        </TouchableOpacity></View>
                </View>

                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.formTextView}>Please attach the Trade Licence</Text></View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.cameraView} onPress={() => requestCameraPermission2(Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)}>
                        {licenceImage === null ? <FontAwesome name='camera' size={100} color='black' /> :
                            <Image
                                source={{ uri: licenceImage.uri }}
                                style={styles.cameraView}
                            />
                        }
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {isterms ?
                        <TouchableOpacity onPress={() => setTerms(false)}>
                            <FontAwesome name='check-square' size={25} color={BaseColor.purpleColor} />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => setTerms(true)}>
                            <FontAwesome name='square-o' size={25} color='black' />
                        </TouchableOpacity>
                    }
                    <Text style={{ fontFamily: font(FontFamily.fontBold) }}>I agree to the above mentioned <Text style={{ textDecorationLine: 'underline', fontFamily: font(FontFamily.fontBold), color: 'black' }}
                        onPress={() => navigation.navigate("termsandconditions", { page1: terms })}
                    >terms and conditions</Text></Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <ButtonView
                        text='Next'
                        onPress={() => { manageValidation() }}
                    />
                </View>
            </ScrollView>
            <Modal
                style={{ margin: 15 }}
                isVisible={isShowModal}
                useNativeDriver={true}
                hideModalContentWhileAnimating
                onBackdropPress={() => setShowModal(false)}
            >
                <View
                    style={[
                        // style,
                        {
                            display: "flex",
                            width: "95%",
                            backgroundColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingHorizontal: 10,
                            alignSelf: "center",
                        },
                    ]}
                >
                    <View
                        style={{ justifyContent: "center", padding: 15, width: "100%" }}
                    >
                        <Text
                            style={{
                                fontSize: 25,
                                alignSelf: "center",
                                color: "black",
                                marginVertical: 15,
                                fontFamily: font(FontFamily.fontBold),
                            }}
                        >
                            Confirmation
                        </Text>
                        <Text
                            style={{
                                textAlign: "center",
                                color: "black",
                                fontFamily: font(FontFamily.fontRegular),
                            }}
                        >
                            your Credit form Application Already Approved
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                // paddingBottom: hp("3%"),
                                // paddingHorizontal: wp("10%"),
                                marginTop: 15,
                                width: deviceWidth * 0.9,
                                // backgroundColor: "red",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                alignSelf: "center",
                            }}
                        >
                            <View></View>
                            <ButtonView
                                text="Cancel"
                                onPress={() => setShowModal(false)}
                                style={{
                                    height: 40,
                                    width: 100,
                                    borderRadius: 8,
                                    backgroundColor: "white",
                                }}
                            />

                            <ButtonView
                                text="Ok"
                                textStyle={{ color: BaseColor.purpleColor }}
                                onPress={() => setShowModal(false)}
                                // onPress={() => deleteCartItemApiCall()}
                                style={{
                                    height: 40,
                                    width: 100,
                                    borderRadius: 8,
                                    backgroundColor: "white",
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default CreditForm

const styles = StyleSheet.create({
    textView: {
        fontFamily: font(FontFamily.fontBold),
        color: 'black',
        fontSize: getFontSize(15)
    },
    formTextView: {
        fontFamily: font(FontFamily.fontRegular),
        fontSize: getFontSize(14)
    },
    inputFieldView: {
        borderBottomWidth: 1,
        height: 40
    },
    fontView: {
        color: BaseColor.purpleColor,
        fontFamily: font(FontFamily.fontBold)
    },
    cameraView: {
        justifyContent: 'center',
        borderWidth: 2,
        height: 140,
        width: 140,
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10
    },
    dropdown: {
        marginTop: 10,
        height: 50,
        borderRadius: 30,
        boederColor: 'black',
        borderWidth: 1,
        padding: 12,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
})