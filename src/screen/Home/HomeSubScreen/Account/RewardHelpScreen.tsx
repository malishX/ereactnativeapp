import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { BaseColor, font, FontFamily } from '../../../../config'
import { deviceHeight, deviceWidth, getFontSize } from '../../../../config/responsive'
import useStyles from '../../Style'
import { ImageView } from '../../../../components';
import { Images } from '../../../../Images';

const RewardHelpScreen = ({ navigation }: { navigation: any }) => {
    const style = useStyles()
    return (
        <View
            style={[style.mainView, { backgroundColor: "#fff" }]}
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
                                        Reward Points Help</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: "#fff", margin: 20 }}>
                    <View style={{ width: '100%', height: 50}}>
                        <Image
                            source={Images.RedeemStructure}
                            style={{ width: '100%', height: '85%' }}
                        />
                    </View>
                    <View style={{}}>
                        <Text style={styles.titleView}>How to earn points?</Text>
                        <Text style={styles.descriptionText}>Get 1 loyalty reward point on spent of every AED 10</Text>
                        <Text style={styles.descriptionText}>As an example, if an order value of 250 AED is placed, the user will receive 25 Conektr Reward Points.</Text>
                        <Text style={styles.titleView}>Spend points and Receive discount</Text>
                        <Text style={styles.descriptionText}>Redeem 10 Loyalty points to get a discount AED 1 on your purchase</Text>
                        <Text style={styles.descriptionText}>As an example, if a user spends 10 Conektr Reward Points then the discount value is 1 AED.</Text>
                        <Text style={styles.titleView}>Notes</Text>
                        <Text style={styles.descriptionText}>Maximum reward points to be redeemed is 10% of the total bill amount upto AED 20</Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default RewardHelpScreen

const styles = StyleSheet.create({
    titleView: {
        color: 'black',
        fontFamily: font(FontFamily.fontBold),
        fontSize: getFontSize(17),
        marginVertical: 10,
    },
    descriptionText: {
        color: 'black',
        fontFamily: font(FontFamily.fontRegular),
        fontSize: getFontSize(15),
        marginVertical: 5,
    }
})