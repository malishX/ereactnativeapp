import React from 'react';
import {ActivityIndicator, StyleSheet, View, Modal} from 'react-native';
import {useTheme, BaseStyle} from 'config';
import useStyles from './styles';

const ProgressView = (props: any) => {
  const {indicatorColor, backgroundColor} = props;
  const {colors} = useTheme();
  const styles = useStyles();

  return (
    <Modal visible={true} transparent={true}>
      <View
        style={[
          styles.container,
          styles.horizontal,
          {backgroundColor: backgroundColor ? backgroundColor : colors.progressViewBackground},
        ]}>
        <ActivityIndicator
          size="large"
          color={indicatorColor ? indicatorColor : colors.primary}
        />
      </View>
    </Modal>
  );
};

export default ProgressView;
