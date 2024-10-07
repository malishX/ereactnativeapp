import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const OrderDetailsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight, }}>
            <Text>OrderDetailsScreen</Text>
        </SafeAreaView>
    )
}

export default OrderDetailsScreen

const styles = StyleSheet.create({})