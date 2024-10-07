import React from "react";
import FastImage from "react-native-fast-image";
import { SvgXml } from "react-native-svg";
import { Images } from "../../../Images";

type imageSizeMode = "contain" | "center" | "cover" | "stretch";
interface ImageData {
  width?: number;
  height?: number;
  isSVG: boolean;
  sizeMode?: imageSizeMode;
  imageSource: any;
  tintColor?: string;
  style?: object;
}

const ImageView = (props: ImageData) => {
  const { width, height, isSVG, imageSource, sizeMode, tintColor, style } =
    props;

  if (isSVG) {
    return (
      <SvgXml xml={imageSource} style={{ width: width, height: height }} />
    );
  } else {
    return (
      <FastImage
        defaultSource={Images.PlaceHolderImage}
        source={imageSource}
        tintColor={tintColor}
        style={[{ width: width, height: height }, style]}
        resizeMode={sizeMode ? sizeMode : "cover"}
      />

      // <FastImage
      //   source={isLoaded ? imageSource : Images.imageNotLoad}
      //   tintColor={tintColor}
      //  style={[{width: width, height: height,}, style]}
      //   onLoadEnd={() => setIsLoaded(true)}
      // />
    );
  }
};

export default ImageView;
