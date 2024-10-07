import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Images } from '../../../../Images';

const Radio = (props) => {
  const [checked, setChecked] = useState(props.default);
  //var gender = ['Male', 'Female'];
  return (
    <View>
      <View style={styles.btn}>
        {props.list.map((value, key) => {
          return (
            <View key={value}>
              {checked == key ? (
                <TouchableOpacity style={styles.btn}>
                  <Image
                    style={styles.img}
                    
                    source={Images.check}
                  />
                  <Text>{value}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setChecked(key);
                    props.onChange(key)
                  }}
                  style={styles.btn}>
                  <Image
                    style={styles.img}
                    source={Images.UnChack}
                  />
                  <Text>{value}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
      {/* <Text>{gender[checked]}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
  },
  img: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Radio;