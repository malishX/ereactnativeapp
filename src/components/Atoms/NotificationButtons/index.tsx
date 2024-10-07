import { BaseStyle, font, FontFamily } from "config";
import { getFontSize, scale } from "config/responsive";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export const NotificationButton = ({ color, title, onPress }) => {
  const baseStyles = BaseStyle();

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: scale(50),
        backgroundColor: color,
        borderRadius: scale(10),
        marginHorizontal: scale(5),
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text
        style={{
          fontFamily: font(FontFamily.fontRegular),
          fontSize: getFontSize(12),
          color: "white",
          ...baseStyles.textRTLStyle,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
