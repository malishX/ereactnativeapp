import React from "react";
import { Modal, View } from "react-native";
import Lottie from "lottie-react-native";
import useStyles from "./styles";

interface ProgressViewProps {
  indicatorColor?: string;
  backgroundColor?: string;
}

const ProgressView = (props: ProgressViewProps) => {
  const { indicatorColor, backgroundColor } = props;
  // const {colors} = useTheme();
  const styles = useStyles();

  return (
    <Modal visible={true} transparent={true}>
      <View
        style={[
          styles.container,
          styles.horizontal,
          {
            backgroundColor: backgroundColor ? backgroundColor : "#00000044",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Lottie
          source={require("../../../assets/lottieFiles/loader.json")}
          autoPlay
          loop
          style={{
            height: 45,
          }}
        />
        {/* <ActivityIndicator
          size="large"
          color={indicatorColor ? indicatorColor : BaseColor.purpleColor}
        /> */}
      </View>
    </Modal>
  );
};

export default ProgressView;
