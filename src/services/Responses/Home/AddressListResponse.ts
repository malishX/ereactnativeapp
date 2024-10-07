import { BaseResponse } from "../../../services";

export interface AddressListResponse extends BaseResponse {
    // result: [Data]
}

// export interface Data {
//     IsDefaultBilling: boolean,
//     IsDefaultShipping: boolean,
//     address_type: string,
//     city: string,
//     country_id: string,
//     country_name: string,
//     customer_id: string,
//     firstname: string,
//     id: string,
//     latlng: string,
//     lastname: string,
//     latitiude: string,
//     longitude: string,
//     postcode: string,
//     street: string,
//     telephone: number
// }