import React, { useState } from 'react';
import { View,Text } from 'react-native';

function PaymentStatusScreen ({navigation,route}){
console.log("payment status screen");
    return (
        <View style={{padding:20}} >
            <Text>{route.params.data}</Text>
        </View>
    );
}

export default PaymentStatusScreen;