// import { ImageView } from "components";
// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { TextInputProps, TouchableOpacity, View } from "react-native";
// import CountryPicker from "react-native-country-picker-modal";
// import { TextInput } from "react-native-gesture-handler";
// import Modal from "react-native-modal";
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from "react-native-responsive-screen";
// import { BaseColor, Images, useTheme } from "../../../config";
// // import { Country, CountryCode } from "../../../data/types";
// import useStyles from "./styles";

// const CountryModalView = (props: any) => {
//   const { isVisible, selectedCountry, close } = props;
//   const { t } = useTranslation();
//   const styles = useStyles();
//   const { colors } = useTheme();

//   const [countryCode, setCountryCode] = useState<any>("FR");
//   const [country, setCountry] = useState<any>();
//   const [withCountryNameButton, setWithCountryNameButton] =
//     useState<boolean>(false);
//   const [withFlag, setWithFlag] = useState<boolean>(true);
//   const [withEmoji, setWithEmoji] = useState<boolean>(true);
//   const [withFilter, setWithFilter] = useState<boolean>(true);
//   const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(false);
//   const [withCallingCode, setWithCallingCode] = useState<boolean>(true);
//   const [withModal, setWithModal] = useState<boolean>(false);

//   const onSelect = (country: any) => {
//     // setCountryCode(country.cca2);
//     // setCountry(country);
//     console.log("Selected Country =--->", country);
//     selectedCountry(country);
//   };

//   const countryFilter = (props: TextInputProps) => {
//     return (
//       <View style={styles.searchSection}>
//         <ImageView
//           style={styles.searchIcon}
//           imageSource={Images.ic_search}
//           isSVG={false}
//           tintColor={BaseColor.blackColor}
//         />
//         <TextInput
//           testID="text-input-country-filter"
//           placeholder={t("search_country")}
//           autoCorrect={false}
//           style={[styles.searchTextInput]}
//           allowFontScaling={false}
//           {...props}
//         />
//       </View>
//     );
//   };

//   return (
//     <Modal
//       isVisible={isVisible}
//       useNativeDriver={true}
//       hideModalContentWhileAnimating
//       style={{
//         justifyContent: "center",
//         alignItems: "center",
//         margin: 0,
//         // padding: 10,
//       }}
//       onBackdropPress={() => close()}
//     >
//       <View style={styles.modalView}>
//         <TouchableOpacity
//           style={styles.closeButtonView}
//           onPress={() => {
//             console.log("Close button click");
//             close();
//           }}
//         >
//           <ImageView
//             style={[styles.closeButton]}
//             imageSource={Images.ic_close}
//             isSVG={false}
//           />
//         </TouchableOpacity>
//         <View style={{ flex: 1, width: "98%" }}>
//           <CountryPicker
//             containerButtonStyle={{ margin: 0 }}
//             {...{
//               countryCode,
//               withFilter,
//               withFlag,
//               withCountryNameButton,
//               withAlphaFilter,
//               withCallingCode,
//               withEmoji,
//               withModal,
//               onSelect,
//             }}
//             theme={{ backgroundColor: BaseColor.whiteColor }}
//             onClose={() => close()}
//             visible={isVisible}
//             withCloseButton={false}
//             renderCountryFilter={(props) => countryFilter(props)}
//           />
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default CountryModalView;
