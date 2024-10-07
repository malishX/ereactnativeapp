// import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, StatusBar } from 'react-native'
// import React from 'react'
// import { Images } from '../Images'
// import useTheme from '../theme'
// import { ImageView } from '../components'
// import Man from '../assets/svgImage/signUpImg.svg'
// import Bg from '../assets/svgImage/bg-image.svg'
// import Svg, {
//     Use,
// } from 'react-native-svg';
// import Demo from '../assets/svgImage/Path 16005.svg'

// const Index = ({ navigation }) => {
//     const theme = useTheme()
//     return (
//         <View style={{ height: "100%" }}>
//             <StatusBar backgroundColor={'transparent'} translucent={true} />
//             <ImageBackground
//                 source={require('../assets/svgImage/Path 16005.svg')}
//                 style={styles.image}
//             >
//                 {/* <B  g /> */}
//                 <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
//                     {/* <Demo /> */}
//                     <Image source={Images.logo} resizeMode='center' />
//                 </View>
//                 <View style={{ alignItems: 'center' }}>
//                     <Text style={{
//                         color: 'white', fontSize: 25, textAlign: 'center', paddingHorizontal: 40
//                     }}>Online Luxury from your kn<Text style={{ color: '#EEB417' }}>own</Text> grocery</Text>
//                 </View>
//                 <View style={{ flex: 8 }}>
//                     <Man />
//                 </View>
//                 <View style={{ flex: 2, width: '90%' }}>
//                     <TouchableOpacity style={theme.buttonView} onPress={() => navigation.navigate("signin")}>
//                         <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Create Account or Sign-in</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={{ flex: 0.5, marginBottom: 20 }}>
//                     <Text style={{ color: 'white', fontSize: 15 }}>Continue as Guest</Text>
//                 </View>
//             </ImageBackground>
//         </View>
//     )
// }

// export default Index

// const styles = StyleSheet.create({
//     image: {
//         flex: 1,
//         width: "100%",
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//     }
// })

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Images } from "../Images";
import useTheme from "../theme";
import { ImageView } from "../components";
import Man from "../assets/svgImage/signUpImg.svg";
import Bg from "../assets/svgImage/bg-image.svg";
import Svg, { Use, SvgXml } from "react-native-svg";
import Logo from "../assets/svgImage/logo.svg";
import { BaseColor } from "../config";
import { deviceHeight, deviceWidth } from "../config/responsive";

const Index = ({ navigation }: any) => {
  const theme = useTheme();

  const xml = `${Bg}`;

  // const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      // setLoading(false);
      navigation.navigate("signinHome");
    }, 1500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BaseColor.purpleColor,
        // height: '100vh'
      }}
    >
      <StatusBar backgroundColor={"transparent"} translucent={true} />
      {/* <View style={{ position: 'absolute',flex: 1, }}> */}
      {/* <SvgXml xml={xml} width="100%" height="100%" />; */}
      {/* <View
        style={{
          height: deviceHeight,
          width: deviceWidth,
          justifyContent: "center",
          alignItems: "center   ",
        }}
      > */}
      <Bg height="100%" preserveAspectRatio="xMinYMin slice" width="100%" />
      {/* </View> */}

      {/* </View> */}
      <View
        style={{
          position: "absolute",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo />
      </View>
      {/* <ImageBackground
                source={require('../assets/svgImage/Path 16005.svg')}
                style={styles.image}
            >
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Images.logo} resizeMode='center' />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{
                        color: 'white', fontSize: 25, textAlign: 'center', paddingHorizontal: 40
                    }}>Online Luxury from your kn<Text style={{ color: '#EEB417' }}>own</Text> grocery</Text>
                </View>
                <View style={{ flex: 8 }}>
                    <Man />
                </View>
                <View style={{ flex: 2, width: '90%' }}>
                    <TouchableOpacity style={theme.buttonView} onPress={() => navigation.navigate("signin")}>
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Create Account or Sign-in</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.5, marginBottom: 20 }}>
                    <Text style={{ color: 'white', fontSize: 15 }}>Continue as Guest</Text>
                </View>
            </ImageBackground> */}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
