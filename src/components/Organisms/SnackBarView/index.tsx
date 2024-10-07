import { useTheme } from "config";
import React from "react";
import { Text, View, ViewStyle } from "react-native";
import SnackBar from "react-native-snackbar-component";
import useStyles from "./styles";


interface SnackBarData {
  visible: boolean;
  containerStyle?: ViewStyle;
  // textMessage? : string;
  onPress?(): void;
  backgroundColor?: string;
  autoHidingTime?: number;
  actionText?: string;
  messageText?: string;
}

const SnackBarView = (props: SnackBarData) => {
  const { visible, actionText, messageText, onPress } = props;
  const styles = useStyles();
  const { colors } = useTheme();

  const actionTextData = actionText ? actionText : "";
  const messageTextData = messageText ? messageText : "Message Text";

  const snackUI = () => (
    <View style={styles.snackBar}>
      <View style={styles.actionTextView}>
        <Text style={styles.actionTextData}>{messageTextData}</Text>
      </View>
      <Text style={styles.actionText} onPress={() => onPress && onPress()}>
        {actionTextData}
      </Text>
    </View>
  );

  return (
    <SnackBar
      visible={visible}
      textMessage={snackUI}
      // bottom={Platform.OS === "ios" ? 30 : 8}
      position="bottom"
      backgroundColor={"#ffffff00"}
      // actionText="View Saved Events"
      autoHidingTime={2000}
      containerStyle={{
        // paddingVertical: 10,
        // margin: 5,
      }}
    />
  );
};

export default SnackBarView;
