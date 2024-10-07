import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal/dist/modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Images } from "../../Images";
import { ButtonView } from "..";
import { deviceHeight, deviceWidth } from "../../config/responsive";
import { font, FontFamily } from "../../config";

interface DeleteModalProps {
  text: string;
  style?: Object;
  onPress(): void;
  isShowDeleteModal: boolean;
  setShowDeleteModal(isVisible: boolean): void;
  image: JSX.Element;
  headerText: string;
}

const DeleteModal = (props: DeleteModalProps) => {
  const {
    text,
    style,
    onPress,
    isShowDeleteModal,
    setShowDeleteModal,
    image,
    headerText,
  } = props;

  // const [isShowDeleteModal, setShowDeleteModal] = useState(true)
  return (
    <View>
      <Modal
        style={{ margin: 15 }}
        isVisible={isShowDeleteModal}
        useNativeDriver={true}
        hideModalContentWhileAnimating
        onBackdropPress={() => setShowDeleteModal(false)}
      >
        <View
          style={[
            style,
            {
              display: "flex",
              width: "95%",
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              // borderTopLeftRadius: 30,
              // borderTopRightRadius: 30,
              // borderBottomLeftRadius: 30,
              // borderBottomRightRadius: 30,
              paddingHorizontal: 10,
              alignSelf: "center",
              // justifyContent: 'center'
            },
          ]}
        >
          <View
            style={{ justifyContent: "center", padding: 15, width: "100%" }}
          >
            <View
              style={{
                alignSelf: "center",
                backgroundColor: "#7146A233",
                height: 100,
                width: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
              }}
            >
              {image}
              {/* <image width={50} height={40} /> */}
            </View>
            <Text
              style={{
                fontSize: 25,
                alignSelf: "center",
                color: "black",
                marginVertical: 15,
                fontFamily: font(FontFamily.fontBold)
              }}
            >
              {headerText}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: "black",
                fontFamily: font(FontFamily.fontRegular)
              }}
            >
              {text}
            </Text>

            <View
              style={{
                flexDirection: "row",
                // paddingBottom: hp("3%"),
                // paddingHorizontal: wp("10%"),
                marginTop: 15,
                width: deviceWidth * 0.9,
                // backgroundColor: "red",
                justifyContent: "space-evenly",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <ButtonView
                text="Cancel"
                onPress={() => setShowDeleteModal(false)}
                // isBordered
                style={{ height: 40, width: 120, borderRadius: 8 }}
              />
              <View></View>
              <ButtonView
                text="Ok"
                onPress={() => onPress && onPress()}
                style={{ height: 40, width: 120, borderRadius: 8 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({});
