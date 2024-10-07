import { toastController } from "./toastController";
import { _isEmailValid, _isPhoneValid } from "./validationController";
import { AvenuesParams, Constants, MerchantParams, InitialParams, CardPattern } from "./AvenuesParams";

export { _isEmailValid, toastController, _isPhoneValid, AvenuesParams, Constants, MerchantParams, InitialParams, CardPattern };

// public static CartResult getSelectedItemFromCart(String skuID) {

//     if (getMyCartListResponse == null) {
//         return null;
//     }

//     CartInformation cartInformation = getMyCartListResponse.getCartInformation();

//     if (cartInformation == null) {
//         return null;
//     }
//     CartResult cartResult = null;
//     for (int i = 0; i < cartInformation.getListCartItems().size(); i++) {
//         if (cartInformation.getListCartItems().get(i).getSku().equalsIgnoreCase(skuID)) {
//             cartResult = cartInformation.getListCartItems().get(i);
//             break;
//         }
//     }
//     return cartResult;
// }

// const getSelectedItemFromCart = (skuID: string) => {
//     if (getMyCartListResponse == null) {
//         //         return null;
//         //     }
//     }