import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface EditAddressRequestBody {
    "addressId": string,
    "customerId": String,
    "fullname": String,
    "address": String,
    "Telephone": String,
    "flat": String,
    "building_name": String,
    "addressType": String,
    "landmark": String,
    "company": String,
    "latitude": number,
    "longitude": number,
    "is_in_superhub": boolean
}