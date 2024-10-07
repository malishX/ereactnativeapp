import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { scale } from "../../../config/responsive";
import { BaseColor, font, FontFamily } from "../../../config";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useStyles } from "./styles";

interface CustomButtonProps {
  title: string;
  onPress(): void;
  isIconVisible: boolean;
  iconName?: string;
  style?: Object;
  textStyle?: Object;
}

const CustomButton = ({
  onPress,
  title,
  isIconVisible,
  iconName,
  style,
  textStyle,
}: CustomButtonProps) => {
  const styles = useStyles();

  return (
    <TouchableOpacity style={{...styles.buttonMainView, ...style}} onPress={onPress}>
      {isIconVisible && iconName && (
        <Ionicons
          name={iconName}
          size={scale(23)}
          color={BaseColor.blackColor}
          style={styles.iconsStyle}
        />
      )}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
