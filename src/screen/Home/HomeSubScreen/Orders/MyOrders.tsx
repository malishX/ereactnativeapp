import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import useStyles from "../../Style";
import { Images } from "../../../../Images";
import { BaseColor, font, FontFamily } from "../../../../config";
import { Button, ButtonView, ImageView } from "../../../../components";
import { getFontSize, scale } from "../../../../config/responsive";
import { OrderDetailsResponse, Result } from "../../../../services/Responses/Orders/OrderDetailsResponse";
import ApiHelper from "../../../../services/apiHelper";
import ProgressView from "../../../../components/Organisms/progressView";
import moment from "moment";
import RNFetchBlob from 'rn-fetch-blob';
import { showToast } from "../../../../utils/toastController";
import { InvoicePdfResponse } from "../../../../services/Responses/Orders/InvoicePdfResponse";



const MyOrders = ({ navigation, route }: any) => {
  const style = useStyles();

  console.log("routes", route);


  const [isProgress, setProgress] = useState<boolean>(false)
  const [orderDetails, setOrderDetails] = useState<Result>()
  const [IsInvoiceBtn, setShowInvoiceBtn] = useState<boolean>(false)
  const tempData = [
    {
      orderStatus: "Order Placed",
      imageURl: "",
      productTitle: "Marlboto Cigarette Red 1 AED 201.00 * 10",
      qty: 1,
    },
  ];
  console.log("orderDetails", orderDetails);

  // const getOrderDetails = () => {
  //   return new Promise<OrderDetailsResponse>((resolve, reject) => {
  //     ApiHelper.getOrderDetails({ order_id: routes.params.orderId })
  //       .then((res: OrderDetailsResponse) => {
  //         console.log("ORderDetails res", res);
  //         // setOrderDetails(res);
  //         resolve(res);
  //       })
  //       .catch((err) => {
  //         console.log("Get order details err", err);
  //         reject(err);
  //       });
  //   });
  // };

  const getOrderDetails = async () => {
    setProgress(true)
    ApiHelper.getOrderDetails({ order_id: route.params.orderId }).then((res: OrderDetailsResponse) => {
      console.log("Order details Api Call", res);
      if (res.success === 1) {
        setOrderDetails(res.result);
        res.result.is_invoices_available === true ? setShowInvoiceBtn(true) : setShowInvoiceBtn(false)
        setProgress(false)
      } else {
        setProgress(false)
      }
    })
  }

  const getInvoicePdf = async () => {
    setProgress(true)
    ApiHelper.invoicePdf({ order_id: route.params.orderId }).then((res: InvoicePdfResponse) => {
      console.log("Invoice Pdf Api Call", res);
      if (res.success === 1) {
        // setOrderDetails(res.result);
        downloadFile(res.invoices[0])
        setProgress(false)
      } else {
        setProgress(false)
      }
    })
  }

  useEffect(() => {
    getOrderDetails()
  }, [])

  const checkPermission = async () => {

    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      getInvoicePdf();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          getInvoicePdf();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };
  // const fileUrl = 'https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg';
  const downloadFile = (file: string) => {
    const fileUrl = file
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    var file_ext: any = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        showToast('File Downloaded Successfully.');
      });
  };

  const getFileExtention = (fileUrl: string) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
      /[^.]+$/.exec(fileUrl) : undefined;
  };

  return (
    <View style={{ flex: 1, backgroundColor: BaseColor.purpleColor }}>
      <SafeAreaView
        style={[
          style.mainView,
          {
            marginTop: StatusBar.currentHeight,
            backgroundColor: BaseColor.backGroundColor,
          },
        ]}
      >
        <View style={[style.headerView, { justifyContent: "flex-start" }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Images.LeftArrow />
          </TouchableOpacity>
          <Text style={style.headerTextView}>My Orders</Text>
        </View>
        {/* <View style={{ flex: 1, padding: 20 }}>
          <View style={style.estimatedView}>
            <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
              <Text style={{ color: "black", fontWeight: "bold" }}>
                Order #23435455
              </Text>
              <Text style={{}}>Placed on Jan 12, 2020</Text>
              <View style={{ marginVertical: 12 }}>
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Payment Method
                </Text>
                <Text style={{}}>Home Delivery | Cash on Delivery</Text>
              </View>
            </View>
            <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
              <Text
                style={{ color: BaseColor.purpleColor, fontWeight: "bold" }}
              >
                Delivered
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row" }}>
                <Images.LocationIcon />
                <Text style={{ fontWeight: "bold", marginLeft: 8 }}>
                  Delivering To Store{" "}
                </Text>
              </View>
              <View>
                <Text style={{ color: BaseColor.purpleColor }}>Directions</Text>
              </View>
            </View>
            <Text style={{ paddingRight: 90, marginLeft: 24 }}>
              juma al majid building deira deira, Dubai, United Arab Emirates
            </Text>
          </View>
          <View style={style.estimatedView}>
            <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
              <Text>SubTotal</Text>
              <Text>Tex</Text>
              <Text>Delivery Charges</Text>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                Estimated Total
              </Text>
            </View>
            <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
              <Text>AED 19.00</Text>
              <Text>AED 1.00</Text>
              <Text>AED 19.00</Text>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                AED 19.00
              </Text>
            </View>
          </View>
        </View> */}
        <ScrollView>
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <View style={[styles.orderView, { height: scale(120) }]}>
              <Text style={{
                fontSize: getFontSize(15),
                fontFamily: font(FontFamily.fontBold),
                color: BaseColor.blackColor,
                marginBottom: -20
              }}>{`Order #${orderDetails?.increment_id}`}</Text>
              <Text>{`Placed on ${moment(orderDetails?.order_date).format('YYYY-MM-DD')}`}</Text>
              <Text style={{
                fontSize: getFontSize(15),
                fontFamily: font(FontFamily.fontBold),
                color: BaseColor.blackColor,
                marginBottom: -20
              }}>Payment Method</Text>
              <Text>{`${orderDetails?.shipping_method} | ${orderDetails?.payment_method}`}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Images.LocationIcon />
                </View>
                <View style={{ marginLeft: 10, width: scale(150) }}>
                  <Text
                    style={{
                      fontFamily: font(FontFamily.fontBold),
                      fontSize: getFontSize(14),
                      color: BaseColor.blackColor
                    }}
                  >
                    Delivering To {orderDetails?.address.address_type}
                  </Text>
                  {/* {address.street.length > 0 && ( */}
                  <View>
                    <Text style={{}}>{`${orderDetails?.address.firstname} ${orderDetails?.address.lastname}`}</Text>
                    <Text>{orderDetails?.address.street}</Text>
                    <Text>{orderDetails?.address.city}</Text>
                    <Text>{orderDetails?.address.country_name}</Text>
                    <Text>+{orderDetails?.address.telephone}</Text>
                  </View>
                  {/* )} */}
                </View>
              </View>


            </View>
            <View style={[styles.orderView, { marginVertical: scale(20), flex: 1 }]}>
              <Text style={{
                fontSize: getFontSize(18),
                fontFamily: font(FontFamily.fontBold),
                color: BaseColor.blackColor,
                marginBottom: 15
              }}>
                Items Ordered
              </Text>
              <FlatList
                data={orderDetails?.items}
                renderItem={({ item }) => {
                  console.log("items Oreder", item);

                  return (
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginVertical: 5,
                        }}
                      >
                        <View style={{ width: 100 }}>
                          <ImageView
                            imageSource={{ uri: item.image_url }}
                            style={{ width: 100, height: 80 }}
                            isSVG={false}
                            sizeMode="contain"
                          />
                        </View>
                        <View
                          style={{
                            width: scale(130),
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: font(FontFamily.fontBold),
                              fontSize: 15,
                            }}
                          >
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: font(FontFamily.fontRegular),
                              marginVertical: 4,
                            }}
                          >
                            {`Qty: ${item.qty}`}
                          </Text>
                        </View>
                        <View style={{ marginRight: 5 }}>
                          <Text style={{ fontFamily: font(FontFamily.fontBold) }}>
                            {`AED ${item.total.toFixed(2)}`}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.dividerView}></View>
                    </View>
                  )
                }}
              />
              {/* <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 5,
                    }}
                  >
                    <View style={{ width: 100 }}>
                      <ImageView
                        imageSource={{ uri: orderDetails?.items }}
                        style={{ width: 100, height: 80 }}
                        isSVG={false}
                        sizeMode="contain"
                      />
                    </View>
                    <View
                      style={{
                        width: scale(130),
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: font(FontFamily.fontBold),
                          fontSize: 15,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font(FontFamily.fontRegular),
                          marginVertical: 4,
                        }}
                      >
                        {`Qty: ${item.qty}`}
                      </Text>
                    </View>
                    <View style={{ marginRight: 5 }}>
                      <Text style={{ fontFamily: font(FontFamily.fontBold) }}>
                        {`AED ${item.total.toFixed(2)}`}
                      </Text>
                    </View>
                  </View> */}
            </View>
            <View style={{
              height: scale(80),
              backgroundColor: BaseColor.grayColor,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderRadius: 10,
              padding: 10,
            }}>
              <Images.RewardPoint width={40} height={40} />
              <View style={{ marginLeft: 15, width: scale(300) }}>
                <Text style={{ fontSize: 15, fontFamily: font(FontFamily.fontBold), flexWrap: 'wrap' }}>You have earned {orderDetails?.rewards.earn} points for this order!</Text>
              </View>
            </View>
            <View style={styles.displayTotalView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.totalText}>SubTotal</Text>
                  <Text style={styles.totalText}>Discount Amount</Text>
                  <Text style={styles.totalText}>Service Charges</Text>
                  <Text style={styles.totalText}>
                    Reward points Discount
                  </Text>
                  <Text style={styles.totalText}>Tax</Text>
                </View>
                <View>
                  <Text style={[styles.totalText, { textAlign: "right", fontFamily: font(FontFamily.fontSemiBold), }]}>
                    AED {orderDetails?.subtotal.toFixed(2)}
                  </Text>
                  <Text style={[styles.totalText, { textAlign: "right", fontFamily: font(FontFamily.fontSemiBold), }]}>
                    AED {orderDetails?.discount_amount.toFixed(2)}
                  </Text>
                  <Text style={[styles.totalText, { textAlign: "right", fontFamily: font(FontFamily.fontSemiBold), }]}>
                    AED {orderDetails?.rewards.points.toFixed(2)}
                  </Text>
                  <Text style={[styles.totalText, { textAlign: "right", fontFamily: font(FontFamily.fontSemiBold), }]}>
                    AED {orderDetails?.service_charge.toFixed(2)}
                  </Text>
                  <Text style={[styles.totalText, { textAlign: "right", fontFamily: font(FontFamily.fontSemiBold), }]}>
                    AED {orderDetails?.tax_amount.toFixed(2)}
                  </Text>
                </View>
                {/* } */}
              </View>
              <View style={styles.dividerView}></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.textStyle}>Total</Text>
                <Text style={styles.textStyle}>
                  AED  {(orderDetails?.subtotal +
                    orderDetails?.discount_amount +
                    orderDetails?.service_charge +
                    orderDetails?.tax_amount -
                    orderDetails?.rewards.points).toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              {IsInvoiceBtn && <Button
                text="Print Invoice"
                onClick={() => { checkPermission() }}
                style={{ backgroundColor: BaseColor.yellowColor, borderRadius: 50, height: scale(40) }}
              />}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {isProgress && <ProgressView />}
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  orderView: {
    width: "100%",
    flex: 1,
    // height: scale(120),
    marginVertical: scale(10),
    justifyContent: "space-between",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowColor: "#000",
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  textStyle: {
    color: "black",
    fontFamily: font(FontFamily.fontBold),
    fontSize: getFontSize(15),
  },
  displayTotalView: {
    // height: hp(14),
    width: "97%",
    flex: 1,
    marginBottom: scale(30),
    marginTop: scale(20),
    marginHorizontal: scale(5),
    // flexDirection: 'row',
    justifyContent: "space-between",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowColor: "#000",
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10
  },
  dividerView: {
    borderTopWidth: 0.5,
    borderTopColor: BaseColor.dividerColor,
    marginVertical: 10,
  },
  totalText: {
    fontFamily: font(FontFamily.fontRegular),
  },
});
// Import React Component
// import React from 'react';

// // Import React native Components
// import {
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   Platform,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Alert,
// } from 'react-native';

// // Import RNFetchBlob for the file download
// import RNFetchBlob from 'rn-fetch-blob';

// const MyOrders = () => {
//   const fileUrl = 'https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg';

//   const checkPermission = async () => {

//     // Function to check the platform
//     // If Platform is Android then check for permissions.

//     if (Platform.OS === 'ios') {
//       downloadFile();
//     } else {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           // Start downloading
//           downloadFile();
//           console.log('Storage Permission Granted.');
//         } else {
//           // If permission denied then show alert
//           Alert.alert('Error', 'Storage Permission Not Granted');
//         }
//       } catch (err) {
//         // To handle permission related exception
//         console.log("++++" + err);
//       }
//     }
//   };

//   const downloadFile = () => {

//     // Get today's date to add the time suffix in filename
//     let date = new Date();
//     // File URL which we want to download
//     let FILE_URL = fileUrl;
//     // Function to get extention of the file url
//     var file_ext = getFileExtention(FILE_URL);

//     file_ext = '.' + file_ext[0];

//     // config: To get response by passing the downloading related options
//     // fs: Root directory path to download
//     const { config, fs } = RNFetchBlob;
//     let RootDir = fs.dirs.PictureDir;
//     let options = {
//       fileCache: true,
//       addAndroidDownloads: {
//         path:
//           RootDir +
//           '/file_' +
//           Math.floor(date.getTime() + date.getSeconds() / 2) +
//           file_ext,
//         description: 'downloading file...',
//         notification: true,
//         // useDownloadManager works with Android only
//         useDownloadManager: true,
//       },
//     };
//     config(options)
//       .fetch('GET', FILE_URL)
//       .then(res => {
//         // Alert after successful downloading
//         console.log('res -> ', JSON.stringify(res));
//         Alert.alert('File Downloaded Successfully.');
//       });
//   };

//   const getFileExtention = fileUrl => {
//     // To get the file extension
//     return /[.]/.exec(fileUrl) ?
//       /[^.]+$/.exec(fileUrl) : undefined;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ alignItems: 'center' }}>
//         <Text style={{ fontSize: 25, textAlign: 'center' }}>
//           React Native File Download Example
//         </Text>

//       </View>
//       <Image
//         source={{
//           uri: fileUrl,
//         }}
//         style={{
//           width: '100%',
//           height: 100,
//           resizeMode: 'contain',
//           margin: 5
//         }}
//       />
//       <TouchableOpacity
//         style={styles.button}
//         onPress={checkPermission}>
//         <Text style={styles.text}>
//           Download File
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default MyOrders;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   text: {
//     color: '#fff',
//     fontSize: 20,
//     textAlign: 'center',
//     padding: 5,
//   },
//   button: {
//     width: '80%',
//     padding: 10,
//     backgroundColor: 'blue',
//     margin: 10,
//   },

// });