// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from "react-native-responsive-screen";

// function useStyles() {
//     return StyleSheet.create({
//         mainView: {
//             flex: 4,
//             width: "100%",
//             height: "100%",
//             backgroundColor: '#784DA8',
//             borderBottomLeftRadius: 30,
//             borderBottomRightRadius: 30,
//             justifyContent: 'center',
//             alignItems: 'center',
//             // position: 'fixed'
//         },
//         text: {
//             marginTop: 50,
//             color: 'white',
//             fontSize: 30,
//             fontWeight: 'bold',
//             textAlign: 'center',
//             alignSelf: 'center'
//         },
//         textDec: {
//             color: 'white',
//             textAlign: 'center',
//             alignSelf: 'center',
//             paddingVertical: hp("4%"),
//             fontSize: 20,
//         },
//         formView: {
//             paddingHorizontal: wp("8%"),
//             paddingVertical: hp("5%"),
//             flex: 10,
//             // marginHorizontal: 40,
//             // marginVertical: 40
//         },
//         formText: {
//             // flex: 1,
//             fontSize: 15
//         },
//         inputFieldView: {
//             alignItems: "center",
//             borderWidth: 1,
//             height: 48,
//             borderColor: '#C9C9C9',
//             borderLeftWidth: 0,
//             borderRightWidth: 0,
//             borderTopWidth: 0
//         },
//         buttonView: {
//             // flex: 0.5,
//             // justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: '#E23D79',
//             height: '100%',
//             borderRadius: 5
//         }
//     })
// }

// export default useStyles;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function useStyles() {
    return StyleSheet.create({
        mainView: {
            height: '100%'
        }
    })
}

export default useStyles;