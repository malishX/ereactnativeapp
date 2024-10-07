import React from "react";
import {
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { BaseColor } from "../../../config";
import useStyles from "./style";
import { useFont } from "../../../config";

interface ButtonViewProps {
  text?: string;
  onPress(): void;
  isBordered?: boolean;
  style?: Object;
  textStyle?: Object;
}

const ButtonView = (props: ButtonViewProps) => {
  const { text, onPress, isBordered, style,textStyle } = props;
  const styles = useStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnView}
      delayPressIn={0}
      activeOpacity={0.5}
    >
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <View
          style={[
            styles.btnView,
            {
              borderRadius: isBordered ? 10 : 24,
              backgroundColor: isBordered
                ? "transparent"
                : BaseColor.yellowColor,
              borderWidth: isBordered ? 2 : 0,
              borderColor: isBordered ? BaseColor.yellowColor : undefined,
            },
            style,
          ]}
        >
          <Text
            style={[
              styles.btnText,
              {
                color: isBordered
                  ? BaseColor.purpleColor
                  : BaseColor.textGrayColor,
              },
              textStyle
            ]}
          >
            {text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonView;
