import { Image, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import getSelectedItemFromCart from '../../../screen/Utils';
import getHooks from '../../../hooks';
import useStyles from '../../../screen/Home/Style';
import { BaseColor, font, FontFamily, getFontSize } from '../../../config';
import { Images } from '../../../Images';
import { ProductsDataResponse } from '../../../services/Responses/Home/ProductsDataResponse';
import Button from '../../Atoms/Button';
import { scale } from '../../../config/responsive';

interface ProductListView {
    item: any;
    updateState(): void;
    id: string;
    addCartItemApiCall(item: any, count: any): void;
    updateCartItemApiCall(item: any, count: any): void;
    deleteCartItemApiCall(item: any): void;
    favoriteProductApiCall(item: any): void;
}

export type RootStackParamList = {
    productdetail: { sku: string } | undefined;
    categorydetail: { id: string, name: string } | undefined;
};

const ProductExpandableListView = ({
    item,
    updateState,
    id,
    addCartItemApiCall,
    updateCartItemApiCall,
    deleteCartItemApiCall,
    favoriteProductApiCall,
}: ProductListView) => {
    const hooks = getHooks()
    const style = useStyles()
    const [count, setCount] = useState<string>("")
    var selectedQty = 0;
    var itemId = 0;
    var cartItem = getSelectedItemFromCart(item.sku, hooks.cartList);
    if (cartItem === null) {
        // setCount("0")
        // selectedQty = 0;
        // homeCateGory.setCartItemId(null);
    } else {
        // setCount(JSON.stringify(cartItem.qty))
        // selectedQty = cartItem.qty;
        itemId = cartItem.item_id;
        // homeCateGory.setCartItemId(cartResult.getItemId());
    }
    const showQtyCount = () => {
        if (cartItem === null) {
            setCount("0")
            // selectedQty = 0;
            // homeCateGory.setCartItemId(null);
        } else {
            setCount(JSON.stringify(cartItem.qty))
            // selectedQty = cartItem.qty;
            itemId = cartItem.item_id;
            // homeCateGory.setCartItemId(cartResult.getItemId());
        }
    }
    // setCount(selectedQty);
    useEffect(() => {
        showQtyCount()
    }, [cartItem])
    console.log("selectedQty ========  >", item);

    var discount = item.price - item.special_price;
    const per = (discount / item.price) * 100;
    const persentage = Math.trunc(per);
    console.log("discount", persentage);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View style={{ paddingLeft: 10 }}>
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.push("productdetail", { sku: item.sku });
                }}
            >
                <View
                    style={[
                        style.offerView,
                        {
                            width: id === "1" ? hp("17") : hp("21"), padding: 10, position: "relative",
                            opacity: item.stock === 0 ? 0.9: 1, backgroundColor: item.stock === 0 ? "transparent" : "#fff"
                        },
                    ]}
                >
                    <View style={{}}>
                        <View>
                        </View>
                        <View style={style.contain}>
                            {item.special_price > 0 ? (
                                <View style={style.offView}>
                                    <Text
                                        style={style.offviewText}
                                    >{`${persentage}% off`}</Text>
                                </View>
                            ) : (
                                <View></View>
                            )}
                            {item.favourite === 1 ? (
                                <TouchableOpacity
                                    onPress={() => favoriteProductApiCall(item)}
                                >
                                    <FontAwesome
                                        name="heart"
                                        size={20}
                                        color={BaseColor.purpleColor}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => favoriteProductApiCall(item)}
                                >
                                    <FontAwesome
                                        name="heart-o"
                                        size={20}
                                        color={BaseColor.purpleColor}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        {item.stock === 0 &&
                            <View>
                                <View
                                    style={{
                                        position: "absolute",
                                        top: -25,
                                        left: -10,
                                        backgroundColor: BaseColor.yellowColor,
                                        height: scale(25),
                                        width: scale(100),
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={{ fontFamily: font(FontFamily.fontBold), color: 'black' }}>Out of Stock</Text>
                                    {/* <Images.OutOfStock width={100} height={45} /> */}
                                </View>
                            </View>
                        }
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            height: 80,
                        }}
                    >
                        <Image
                            defaultSource={Images.PlaceHolderImage}
                            source={{ uri: item.small_image }}
                            style={{ height: scale(75), width: '100%', resizeMode: 'contain' }}
                        />
                        {/* <Catagory height={100} width={100} /> */}
                    </View>
                    <View style={{ width: 80 }}>
                        <Text
                            style={{
                                //  fontSize: 17,
                                fontFamily: font(FontFamily.fontBold),
                            }}
                            numberOfLines={2}
                            ellipsizeMode="head"
                        >
                            {item.name}
                        </Text>
                    </View>
                    {item.stock === 0 &&
                        <View style={{
                            // flex: 1,
                            position: "absolute",
                            alignItems: "center",
                            justifyContent: "center",
                            top: 120,
                            left: scale(20),
                            right: scale(20),
                            alignContent: "center",
                        }}>
                            <Button
                                text='View Similar Products'
                                onClick={() =>
                                    navigation.navigate("categorydetail", {
                                        id: item.sku,
                                        name: "similar products",
                                    })
                                }
                                textStyle={{ color: 'black', fontSize: getFontSize(10), textAlign: 'center' }}
                                style={{ width: 90, height: 40, backgroundColor: BaseColor.yellowColor }}
                            />
                        </View>}
                    <View
                        style={{
                            alignItems: "flex-end",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}></View>
                            <View style={{ justifyContent: "flex-end", flex: 1 }}>
                                {item.special_price > 0 && (
                                    <Text
                                        style={{ fontFamily: font(FontFamily.fontBold) }}
                                    >
                                        {`AED ${item.special_price.toFixed(2)}`}
                                    </Text>
                                )}

                                <Text
                                    style={{
                                        fontFamily:
                                            item.special_price > 0
                                                ? font(FontFamily.fontRegular)
                                                : font(FontFamily.fontBold),
                                        fontSize:
                                            item.special_price > 0
                                                ? getFontSize(11)
                                                : getFontSize(13),
                                        textDecorationLine:
                                            item.special_price > 0 ? "line-through" : "none",
                                    }}
                                >
                                    {`AED ${item.price.toFixed(2)}`}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >
                            {count === "0" ? (
                                <View style={{ height: 60 }}>
                                </View>
                            ) : (
                                <View style={[style.actionIcon]}>
                                    {count !== "1" ? (
                                        <TouchableOpacity
                                            onPress={() =>
                                                updateCartItemApiCall(itemId, parseInt(count) - 1)
                                            }
                                        >
                                            <Images.Minus height={25} />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() => deleteCartItemApiCall(itemId)}
                                        >
                                            <Images.Delete height={25} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}

                            {count !== "0" && (
                                // <TextInput
                                //     style={{
                                //         marginVertical: 5,
                                //         borderWidth: 2,
                                //         width: 38,
                                //         height: 30,
                                //         borderColor: BaseColor.yellowColor,
                                //         borderRadius: 5,
                                //         fontFamily: font(FontFamily.fontBold),
                                //         textAlign: "center",
                                //         paddingVertical: 0,
                                //         // fontWeight: "bold",
                                //     }}
                                //     keyboardType="numeric"
                                //     // multiline
                                //     // value=
                                //     value={JSON.stringify(selectedQty)}
                                //     onChangeText={(e) =>
                                //         e === "0" ? setCount("1") : setCount(e)
                                //     }
                                //     cursorColor={BaseColor.purpleColor}
                                // />
                                <TextInput
                                    style={{
                                        marginVertical: 5,
                                        borderWidth: 2,
                                        width: 38,
                                        height: 30,
                                        borderColor: BaseColor.yellowColor,
                                        borderRadius: 5,
                                        fontFamily: font(FontFamily.fontBold),
                                        textAlign: "center",
                                        paddingVertical: 0,
                                        // fontWeight: "bold",
                                    }}
                                    keyboardType="numeric"
                                    // multiline
                                    // value=
                                    value={count}
                                    onChangeText={(e) =>
                                        setCount(e)
                                    }
                                    cursorColor={BaseColor.purpleColor}
                                    onEndEditing={() => updateCartItemApiCall(itemId, count)}
                                />
                            )}
                            <TouchableOpacity
                                activeOpacity={0.1}
                                onPress={() => addCartItemApiCall(item, "1")}
                                style={{ alignItems: "flex-end" }}
                            >
                                <Images.Add height={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default ProductExpandableListView

const styles = StyleSheet.create({})


// import { StyleSheet, Text, TextInput, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { BaseColor, font, FontFamily } from '../../../config'
// import getHooks from '../../../hooks';
// import getSelectedItemFromCart from '../../../screen/Utils';

// interface ProductListView {
//     item: any;
//     updateState(): void;
//     id: string;
//     addCartItemApiCall(item: any): void;
//     updateCartItemApiCall(item: any, selectedQty: number, id: string): void;
//     deleteCartItemApiCall(item: any): void;
//     favoriteProductApiCall(item: any): void;
// }

// const ProductExpandableListView = ({
//     item,
//     updateState,
//     id,
//     addCartItemApiCall,
//     updateCartItemApiCall,
//     deleteCartItemApiCall,
//     favoriteProductApiCall,
// }: ProductListView) => {

//     const hooks = getHooks()
//     console.log("product Expandeble item", item);

//     // const style = useStyles()
//     const [count, setCount] = useState<string>("1")
//     var selectedQty: string = "0";
//     var itemId = 0;
//     var cartItem = getSelectedItemFromCart(item.sku, hooks.cartList);
//     console.log("cartItem", cartItem);
//     console.log("count", count);

//     const showCount = () => {
//         if (cartItem === null) {
//             setCount("0")
//             // selectedQty = JSON.stringify(0);
//             // homeCateGory.setCartItemId(null);
//         } else {
//             setCount(JSON.stringify(cartItem.qty))
//             // selectedQty = JSON.stringify(cartItem.qty);
//             itemId = cartItem.item_id;
//             // homeCateGory.setCartItemId(cartResult.getItemId());
//         }
//     }

//     useEffect(() => {
//         showCount()
//     }, [])
//     // setCount(selectedQty);

//     console.log("selectedQty ========  >", selectedQty);

//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <TextInput
//                 style={{
//                     marginVertical: 5,
//                     borderWidth: 2,
//                     width: 38,
//                     height: 30,
//                     borderColor: BaseColor.yellowColor,
//                     borderRadius: 5,
//                     fontFamily: font(FontFamily.fontBold),
//                     textAlign: "center",
//                     paddingVertical: 0,
//                     // fontWeight: "bold",
//                 }}
//                 keyboardType="numeric"
//                 // multiline
//                 value={count}
//                 onChangeText={(e) => {
//                     console.log(
//                         "eee", e
//                     )
//                     setCount(e)
//                 }
//                 }
//                 cursorColor={BaseColor.purpleColor}
//             />
//         </View>
//     )
// }

// export default ProductExpandableListView

// const styles = StyleSheet.create({})