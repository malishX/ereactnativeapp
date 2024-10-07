import { ActivityIndicator, Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { WebView } from 'react-native-webview'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { BaseColor } from '../../../../config'
import { Images } from '../../../../Images'
import useStyles from '../../Style'


const SpotiiWebView = ({ navigation, route }: { navigation: any, route: any }) => {
    const style = useStyles()
    const [canGoBack, setCanGoBack] = useState(false)
    const [canGoForward, setCanGoForward] = useState(false)
    const [currentUrl, setCurrentUrl] = useState('')
  
    const webviewRef = useRef(null)
  
   const backButtonHandler = () => {
      if (webviewRef.current) webviewRef.current.goBack()
    }
  
   const frontButtonHandler = () => {
      if (webviewRef.current) webviewRef.current.goForward()
    }
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView style={styles.flexContainer}>
          <WebView
            source={{ uri: 'https://heartbeat.fritz.ai/' }}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator
                color='black'
                size='large'
                style={styles.flexContainer}
              />
            )}
            ref={webviewRef}
            onNavigationStateChange={navState => {
              setCanGoBack(navState.canGoBack)
              setCanGoForward(navState.canGoForward)
              setCurrentUrl(navState.url)
            }}
          />
          <View style={styles.tabBarContainer}>
            <TouchableOpacity onPress={backButtonHandler}>
              <Text style={styles.button}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={frontButtonHandler}>
              <Text style={styles.button}>Forward</Text>
            </TouchableOpacity>
          </View>
          
        </SafeAreaView>
      </>
    )
  }
  
  const styles = StyleSheet.create({
    flexContainer: {
      flex: 1
    },
    tabBarContainer: {
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#b43757'
    },
    button: {
      color: 'white',
      fontSize: 24
    }
  })

export default SpotiiWebView

// const styles = StyleSheet.create({})