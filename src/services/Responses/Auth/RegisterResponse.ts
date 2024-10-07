import { RegisterAction } from "redux-persist";
import { BaseResponse } from "../../../services";
import { UserApi } from "../../user";

export interface RegisterResponse extends BaseResponse {
    specification: string;
    success: number;
    data: User;
}

export interface User {
    addresses: Address[]
    created_at: string;
    created_in: string;
    credit_info: null | string
    custom_attributes: Custom_attribute[]
    customer_status: number
    customer_type: string
    default_billing: string
    default_shipping: string
    disable_auto_group_change: number
    email: string
    extension_attributes: Extension_attributes
    firstname: string;
    gender: number;
    group_id: number;
    id: number;
    lastname: string;
    quoteid: string;
    shopName: string;
    store_id: number;
    telephone: string;
    updated_at: string;
    website_id: number
    whatsapp: string
}

export interface Extension_attributes {
    is_subscribed: boolean;
}

export interface Address {
    address_type: string;
    city: string;
    country_id: string;
    country_name: string;
    customer_id: string;
    firstname: string;
    id: string;
    lastname: string;
    latlng: string;
    postcode: string;
    region: Region;
    street: string;
    telephone: string;
}

export interface Region {
    region_code: string;
    region: string;
    region_id: number;
}

export interface Custom_attribute {
    attribute_code: string;
    value: string;
}