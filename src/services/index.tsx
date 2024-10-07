import { AccessToken } from "./Common/AccessToken";
import Api from "./Common/Api";
import { authApi } from "./ApiManager/Auth";
import { homeApi } from "./ApiManager/Home";
import { DefaultHeader } from "./Common/DefaultHeader";
import { ErrorResponse } from "./Common/ErrorResponse";
import { BaseResponse } from "./Common/BaseResponse";
import { Exception } from "./Common/Exception";
import { RegisterRequest } from "./Requests/Auth/RegisterRequest";
import { RegisterRequestBody } from "./Requests/Auth/RegisterRequestBody";
import { RegisterResponse } from "./Responses/Auth/RegisterResponse";
import { OtpVerifyRequest } from "./Requests/Auth/OtpVerifyRequest";
import { OtpVerifyRequestBody } from "./Requests/Auth/OtpVerifyRequestBody";
import { RegistrationRequest } from "./Requests/Auth/RegisstrationRequest";
import { RegistrationRequestBody } from "./Requests/Auth/RagistrationRequestBody";
import { RegistrationResponse } from "./Responses/Auth/RegistrationResponse";
import { RetailersResponse } from "./Responses/Auth/RetailersResponse";
import { RetailersRequest } from "./Requests/Auth/RetailersRequest";
import { RetailersRequestBody } from "./Requests/Auth/RetailersRequestBody";
import { AddressMapRequest } from "./Requests/Auth/AddressMapRequest";
import { AddressMapResponse } from "./Responses/Auth/AddressMapResponse";
import { LatLngRequest } from "./Requests/Auth/LatLngRequest";
import { MaplocationResponse } from "./Responses/Auth/MaplocationResponse";
import { MaplocationRequest } from "./Requests/Auth/MaplocationRequest";
import { AddAddressRequest } from "./Requests/Auth/AddAddressRequest";
import { AddAddressRequestBody } from "./Requests/Auth/AddAddressRequestBody";
import { AddAddressResponse } from "./Responses/Auth/AddAddressResponse";
import { LogOutRequest } from "./Requests/Auth/LogoutRequest";

import { CategoryListRequest } from "./Requests/Home/CategoryListRequest";
import { CategoryListRequestBody } from "./Requests/Home/CategoryListRequestBody";
import { CategoryListResponse } from "./Responses/Home/HomePageCategoryResponse";
import { AddressListRequest } from "./Requests/Home/AddressListRequest";
import { AddressListResponse } from "./Responses/Home/AddressListResponse";
import { AddressListRequestBody } from "./Requests/Home/AddressListRequestBody"
import { DeleteAddressRequest } from "./Requests/Auth/DeleteAddressRequest";
import { DeleteAddressRequestBody } from "./Requests/Auth/DeleteAddressRequestBody";
import { DeleteAddressResponse } from "./Responses/Auth/DeleteAddressResponse";
import { DefaultAddressResponse } from "./Responses/Home/DefaultAddressResponse";
import { DefaultAddressRequest } from "./Requests/Home/DefaultAddressRequest";
import { DefaultAddressRequestBody } from "./Requests/Home/DefaultAddressRequestBody";
import { EditAddressRequest } from "./Requests/Auth/EditAddressRequest";
import { EditAddressRequestBody } from "./Requests/Auth/EditAddressRequestBody";

import {
    defaultHeaders,
    defaultParameters,
    HttpMethod,
    HttpRequest,
} from "./Common/Request";

export {
    Api,
    Exception,
    authApi,
    homeApi,
    // couponApi,

    // Requests
    RegisterRequest,
    OtpVerifyRequest,
    RegistrationRequest,
    RetailersRequest,
    CategoryListRequest,
    AddressListRequest,
    AddressMapRequest,
    MaplocationRequest,
    AddAddressRequest,
    DeleteAddressRequest,
    DefaultAddressRequest,
    EditAddressRequest,
    LogOutRequest,

    defaultHeaders,
    defaultParameters,
    // USER_TOKEN,
}

export type {
    AccessToken,
    BaseResponse,
    DefaultHeader,
    ErrorResponse,
    HttpMethod,
    HttpRequest,
    //RequestBody
    RegisterRequestBody,
    OtpVerifyRequestBody,
    RegistrationRequestBody,
    RetailersRequestBody,
    LatLngRequest,
    AddAddressRequestBody,
    EditAddressRequestBody,

    CategoryListRequestBody,
    AddressListRequestBody,
    DeleteAddressRequestBody,
    DefaultAddressRequestBody,

    //Responses
    RegisterResponse,
    RegistrationResponse,
    RetailersResponse,
    AddressMapResponse,
    MaplocationResponse,
    AddAddressResponse,

    CategoryListResponse,
    AddressListResponse,
    DeleteAddressResponse,
    DefaultAddressResponse
}