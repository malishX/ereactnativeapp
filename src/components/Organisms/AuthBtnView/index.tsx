import { ImageView } from "components";
import { Images, useTheme } from "config";
import React from "react";
import {
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import useStyles from "./style";

const AuthBtnView = (props) => {
  const { text, onPress } = props;
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <TouchableWithoutFeedback onPress={() => onPress && onPress()}>
      <View style={styles.btnView}>
        <Text style={styles.btnText}>{text}</Text>
        <ImageView
          imageSource={Images.ic_next}
          height={14}
          width={14}
          isSVG={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AuthBtnView;
