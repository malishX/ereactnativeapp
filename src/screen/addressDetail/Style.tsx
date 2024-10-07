import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BaseColor } from '../../config'

function useStyles() {
  return StyleSheet.create({
    addressLabelView: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginVertical: 12
    },
    addressLabel: {
      width: hp('17'),
      height: hp('5'),
      borderColor: '#C9C9C9',
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10
    },
    inputText: {
      // fontStyle: 
      color: 'white',
      fontSize: 15.5,
      fontFamily: "metropolis",
      alignSelf: 'center',
      fontWeight: 'bold',
      borderColor: '#C9C9C9'
    },
    locattionView: {
      height: hp('30'),
      backgroundColor: BaseColor.purpleColor,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      justifyContent: 'center',
      alignItems: 'center'
    },
    searchView: {
      position: 'absolute',
      marginTop: hp('10'),
      // flexDirection: 'row',
      backgroundColor: '#fff',
      width: '90%',
      alignSelf: 'center',
      paddingTop: 18,
      paddingRight: 18,
      paddingLeft: 18,
      borderRadius: 20,
      shadowColor: 'gray',
      elevation: 3
    },
    locationBackView: {
      flex: 0.2,
      position: 'absolute',
      marginTop: hp('5'),
      marginHorizontal: hp('3')
    }
  })
}

export default useStyles;