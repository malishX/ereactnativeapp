import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Images, useTheme } from "config";
import ImageView from "../imageView";
import useStyles from "./styles";
import { useNavigation } from "@react-navigation/native";

const BackButton = (props: any) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={{borderWidth:0,}}>
      <TouchableOpacity
        style={styles.buttonView}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon
          name="arrow-left"
          size={20}
          color={colors.primary}
          enableRTL={true}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
