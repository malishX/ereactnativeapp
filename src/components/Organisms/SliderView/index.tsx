// import { BaseStyle, Images } from "config";
import { BaseStyle } from "../../../config";
import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import Swiper from "react-native-swiper";
// import 'swiper/css'
import useStyles from "./styles";
import ImageView from "../../Atoms/imageView";
import { Images } from "../../../Images";
// import { Image } from "react-native-svg";
interface sliderListProps {
  data: any;
  handleBannerClick(item: any): void;
}

const SliderView = (
  { data,
    handleBannerClick }: sliderListProps) => {
  // const data = props.data;
  // console.log("props", props);

  const baseStyle = BaseStyle();
  const styles = useStyles();
  console.log("data", data);

  const dotView = () => {
    return <View style={styles.dot} />;
  };

  const activeDot = () => {
    return <View style={styles.activeDot} />;
  };

  const singleView = (singleRecord: any) => {
    console.log("singleView", singleRecord.banner);
    return (
      <TouchableOpacity style={{}} onPress={() => handleBannerClick(singleRecord)}>
        <Image
          defaultSource={Images.PlaceHolderImage}
          source={{ uri: singleRecord.banner }}
          resizeMode='stretch'
          // isSVG={false}
          style={{ height: '100%' }}
        />
      </TouchableOpacity>
    )
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        autoplayTimeout={3}
        horizontal={true}
        autoplay
        showsButtons={false}
        dot={dotView()}
        activeDot={activeDot()}
      >
        {
          data.map && data
            .map((item: any) => {
              return (
                singleView(item)
              )
            })
        }
        {/* {singleView(data[0])}
        {singleView(data[1])}
        {singleView(data[2])}
        {singleView(data[3])} */}
      </Swiper>
    </View>
  );
};
export default SliderView;
