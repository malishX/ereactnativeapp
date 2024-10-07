import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Images, useTheme } from "config";
import ImageView from "../imageView";
import useStyles from "./styles";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { font, FontFamily } from "../../../config";

interface ButtonProps {
  text: string;
  onClick(): void;
  style?: Object;
  textStyle?: Object;
}

const Button = (props: ButtonProps) => {
  const { text, onClick, style, textStyle } = props;
  const styles = useStyles();
  // const { colors } = useTheme();
  // const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.buttonView, style]}
      onPress={() => {
        onClick && onClick();
      }}
    >
      {/* <View
        style={{
          backgroundColor: colors.primary,
        
          justifyContent: "center",
          alignItems: "center",
         
        }}
      > */}
      <Text style={[{ fontSize: 18, fontFamily: font(FontFamily.fontBold) }, textStyle]}>
        {text}
      </Text>
      {/* </View> */}
    </TouchableOpacity>
  );
};

export default Button;
