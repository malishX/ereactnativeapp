import getHooks from "../hooks";
import { CART_LIST } from "../action/ActionType";

function getSelectedItemFromCart(skuID: string,cartList:any[]) {
    console.log("cartList-----",cartList);
    
    // const getSelectedItemFromCart = (skuID: string) => {
    var cartItem = null
    for (var i = 0; i < cartList.length; i++) {
        if (cartList[i].sku === skuID) {
            cartItem = cartList[i]
            break;
        }
    }
    return cartItem


}

export default getSelectedItemFromCart;

// export const UTILS_QTY = {
//     getSelectedItemFromCart(skuID: string) {
//         console.log("call getSelectedItemFromCart");
        
//         const hooks = getHooks()
//         const cartList = hooks.cartList;
//         // // const getSelectedItemFromCart = (skuID: string) => {
//         var cartItem = null
//         for (var i = 0; i < cartList.length; i++) {
//             if (cartList[i].sku === skuID) {
//                 cartItem = cartList[i]
//                 break;
//             }
//         }
//         return cartItem
//     }

// };
