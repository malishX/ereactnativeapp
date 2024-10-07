// import React from "react";
// import { Dimensions, Platform, PixelRatio } from "react-native";
// // import { create, PREDEF_RES } from "react-native-pixel-perfect";

// const { width, height } = Dimensions.get("window");
// const standardWidth = 375;

// export const deviceWidth = width;
// export const deviceHeight = height;
// const diff = deviceWidth / standardWidth;

// const USE_FOR_BIGGER_SIZE = true;

// export function dySize(size: number) {
//   return diff * size;
// }

// export function getFontSize(size: number) {
//   if (USE_FOR_BIGGER_SIZE || deviceWidth < standardWidth) {
//     const newSize = dySize(size);
//     return newSize;
//   }
//   return size;
// }

// export function scale(size: number) {
//   if (deviceWidth < standardWidth) {
//     const newSize = diff * size;
//     return newSize;
//   }
//   return size;
// }

import React from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const standardWidth = 375;

export const deviceWidth = width;
export const deviceHeight = height;
const diff = deviceWidth / standardWidth;

const USE_FOR_BIGGER_SIZE = true;

export function dySize(size: number) {
  return diff * size;
}

export function getFontSize(number: number) {
  if (USE_FOR_BIGGER_SIZE || deviceWidth < standardWidth) {
    const newSize = dySize(number);
    return newSize;
  }
  return number;
}

export function scale(number: number) {
  if (deviceWidth < standardWidth) {
    const newSize = diff * number;
    return newSize;
  }
  return number;
}
