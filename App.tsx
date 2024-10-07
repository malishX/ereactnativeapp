// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  *
// //  * Generated with the TypeScript template
// //  * https://github.com/react-native-community/react-native-template-typescript
// //  *
// //  * @format
// //  */

// // import React, {type PropsWithChildren} from 'react';
// // import {
// //   SafeAreaView,
// //   ScrollView,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   useColorScheme,
// //   View,
// // } from 'react-native';

// // import {
// //   Colors,
// //   DebugInstructions,
// //   Header,
// //   LearnMoreLinks,
// //   ReloadInstructions,
// // } from 'react-native/Libraries/NewAppScreen';

// // const Section: React.FC<
// //   PropsWithChildren<{
// //     title: string;
// //   }>
// // > = ({children, title}) => {
// //   const isDarkMode = useColorScheme() === 'dark';
// //   return (
// //     <View style={styles.sectionContainer}>
// //       <Text
// //         style={[
// //           styles.sectionTitle,
// //           {
// //             color: isDarkMode ? Colors.white : Colors.black,
// //           },
// //         ]}>
// //         {title}
// //       </Text>
// //       <Text
// //         style={[
// //           styles.sectionDescription,
// //           {
// //             color: isDarkMode ? Colors.light : Colors.dark,
// //           },
// //         ]}>
// //         {children}
// //       </Text>
// //     </View>
// //   );
// // };

// // const App = () => {
// //   const isDarkMode = useColorScheme() === 'dark';

// //   const backgroundStyle = {
// //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
// //   };

// //   return (
// //     <SafeAreaView style={backgroundStyle}>
// //       <StatusBar
// //         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
// //         backgroundColor={backgroundStyle.backgroundColor}
// //       />
// //       <ScrollView
// //         contentInsetAdjustmentBehavior="automatic"
// //         style={backgroundStyle}>
// //         <Header />
// //         <View
// //           style={{
// //             backgroundColor: isDarkMode ? Colors.black : Colors.white,
// //           }}>
// //           <Section title="Step One">
// //             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
// //             screen and then come back to see your edits.
// //           </Section>
// //           <Section title="See Your Changes">
// //             <ReloadInstructions />
// //           </Section>
// //           <Section title="Debug">
// //             <DebugInstructions />
// //           </Section>
// //           <Section title="Learn More">
// //             Read the docs to discover what to do next:
// //           </Section>
// //           <LearnMoreLinks />
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   sectionContainer: {
// //     marginTop: 32,
// //     paddingHorizontal: 24,
// //   },
// //   sectionTitle: {
// //     fontSize: 24,
// //     fontWeight: '600',
// //   },
// //   sectionDescription: {
// //     marginTop: 8,
// //     fontSize: 18,
// //     fontWeight: '400',
// //   },
// //   highlight: {
// //     fontWeight: '700',
// //   },
// // });

// // export default App;

// import { StyleSheet, Text, View, StatusBar } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import Index from './src/SplashScreen/Index'
// import Signin from './src/screen/Auth/Signin';
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from '@react-navigation/native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import VerifyOTP from './src/screen/Auth/VerifyOTP';
// import Profile from './src/screen/profile/Profile';
// import AddressDetail from './src/screen/addressDetail/AddressDetail';
// import Location from './src/screen/addressDetail/Location';
// import SignInHome from './src/screen/Auth/SignInHome';
// import Home from './src/screen/Home';
// import Main from './src/screen/Home/index';

// const App = () => {
//   const MainStack = createStackNavigator();
//   const Tab = createBottomTabNavigator();

//   const [isLoading, setLoading] = useState(true);
//   console.log("isLoading", isLoading);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 1500);
//   })
//   return (
//     <>
//       <StatusBar backgroundColor={'transparent'} translucent={true} />
//       <NavigationContainer>
//         <MainStack.Navigator>
//           {isLoading ? <MainStack.Screen
//             name="Splash"
//             component={Index}
//             options={{ headerShown: false }}
//           /> :
//             <MainStack.Screen
//               name="signinHome"
//               component={SignInHome}
//               options={{ headerShown: false }}
//             />}
//           <MainStack.Screen
//             name="signin"
//             component={Signin}
//             options={{ headerShown: false }}
//           />
//           <MainStack.Screen
//             name="otpverify"
//             component={VerifyOTP}
//             options={{ headerShown: false }}
//           />

//           <MainStack.Screen
//             name="profile"
//             component={Profile}
//             options={{ headerShown: false }}
//           />
//           <MainStack.Screen
//             name="addressdetail"
//             component={AddressDetail}
//             options={{ headerShown: false }}
//           />
//           <MainStack.Screen
//             name="home"
//             component={Main}
//             options={{ headerShown: false }}
//           />
//         </MainStack.Navigator>

//       </NavigationContainer>
//     </>
//   )
// }

// export default App

// const styles = StyleSheet.create({})

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * Generated with the TypeScript template
//  * https://github.com/react-native-community/react-native-template-typescript
//  *
//  * @format
//  */

// import React, {type PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section: React.FC<
//   PropsWithChildren<{
//     title: string;
//   }>
// > = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import "react-native-screens";
import { useSelector } from "react-redux";
import Auth from "./Main";
import { BaseColor } from "./src/config";

import Navigation from "./src/navigation";
import Main from "./src/screen/Home/index";

const App = () => {
  const MainStack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const isLogged = useSelector((state: any) => state.auth.isLogin);
  console.log("isLogged", isLogged);

  const [isLoading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(isLogged);
  console.log("isLoading", isLoading);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });
  const authContext = React.useMemo(() => {
    return {
      signIn: (authToken: string) => {
        // USER_TOKEN.set(authToken, "");
        setLoading(false);
        setLogin(true);
      },
      signOut: () => {
        // USER_TOKEN.set("", "");
        setLoading(false);
        setLogin(false);
      },
    };
  }, []);
  console.log("authContext", authContext);
  return (
    <>
      {/* <StatusBar backgroundColor={BaseColor.purpleColor} translucent={true} /> */}
      {/* <Navigation /> */}
      <NavigationContainer>
        {/* <Main /> */}
        {isLogged ? <Main /> : <Auth />}
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
