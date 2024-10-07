import { ActionTypes } from "./index";
import {
    authApi,
    ErrorResponse,
    OtpVerifyRequestBody,
    RegisterRequestBody,
    RegisterResponse,
    RegistrationResponse,
    RegistrationRequestBody,
    RetailersRequestBody,
    RetailersResponse,
    LatLngRequest,
    AddressListResponse,
    MaplocationResponse,
    AddAddressRequestBody,
    AddAddressResponse,
    EditAddressRequestBody,
    BaseResponse
} from "../services/index";

// export const onLogin = (data: any = undefined) => {
//     return {
//         type: ActionTypes.REGISTER,
//         data,
//     };
// };
// const reg = async () => {
//     const res = await
// }
// export const Register =
//     async (
//         requestBody: RegisterRequestBody,
//         callback: {
//             (response: any): void;
//             (arg0: any): void;
//         }
//     ) =>
//         (dispatch: (arg0: { type: string; data: any }) => void) => {
//             // (dispatch: any) => {
//             const res = authApi
//                 .Register(requestBody)
//             if (res) {
//                 console.log("Call Register--->", res);
//                 callback(res);
//             } else {
//                 console.log("Register error-->");
//                 // callback(error);
//             }
//             // authApi
//             //     .Register(requestBody)
//             // .then((res: RegisterResponse) => {
//             //     console.log("Call Register--->", res);
//             //     // dispatch(onLogin(res));
//             //     callback(res);
//             // })
//             // .catch((error: ErrorResponse) => {
//             //     console.log("Register error-->", error);
//             //     callback(error);
//             // });
//         };

export const Register =
    (
        requestBody: RegisterRequestBody,
        callback: {
            (response: any): void;
            (arg0: any): void;
        }
    ) =>
        (dispatch: (arg0: { type: string; data: any }) => void) => {
            // (dispatch: any) => {
            console.log("requestBody", requestBody);

            authApi
                .Register(requestBody)
                .then((res: RegisterResponse) => {
                    console.log("Call Register--->", res);
                    // dispatch(onLogin(res));
                    callback(res);
                })
                .catch((error: ErrorResponse) => {
                    console.log("Register error-->", error);
                    callback(error);
                });
        };

export const onLogin = (data: any = undefined) => {
    return {
        type: ActionTypes.REGISTER,
        data,
    };
};
export const OtpVerify =
    (
        requestBody: OtpVerifyRequestBody,
        callback: {
            (response: any): void;
            (arg0: any): void;
        }
    ) =>
        (dispatch: (arg0: { type: string; data: any }) => void) => {
            // (dispatch: any) => {
            authApi
                .OtpVerify(requestBody)
                .then((res: RegisterResponse) => {
                    console.log("Call OTP--->", res);
                    dispatch(onLogin(res));
                    callback(res);
                })
                .catch((error: ErrorResponse) => {
                    console.log("Otp error-->", error);
                    callback(error);
                });
        };

export const Registration =
    (
        requestBody: RegistrationRequestBody,
        callback: {
            (response: any): void;
            (arg0: any): void;
        }
    ) =>
        (dispatch: (arg0: { type: string; data: any }) => void) => {
            // (dispatch: any) => {
            authApi
                .Registration(requestBody)
                .then((res: RegistrationResponse) => {
                    console.log("Call Registration--->", res);
                    dispatch(onLogin(res));
                    callback(res);
                })
                .catch((error: ErrorResponse) => {
                    console.log("Registration error-->", error);
                    callback(error);
                });
        };

export const Retailers =
    (
        requestBody: RetailersRequestBody,
        callback: {
            (response: any): void;
            (arg0: any): void;
        }
    ) =>
        (dispatch: (arg0: { type: string; data: any }) => void) => {
            // (dispatch: any) => {
            authApi
                .Retailers(requestBody)
                .then((res: RetailersResponse) => {
                    console.log("Call Retailers--->", res);
                    // dispatch(onLogin(res));
                    callback(res);
                })
                .catch((error: ErrorResponse) => {
                    console.log("Retailers error-->", error);
                    callback(error);
                });
        };

export const getMapAddress =
    (
        point: LatLngRequest,
        callback: { (response: any): void; (arg0: any): void }
    ) =>
        (dispatch: (arg0: { type: string; data: any }) => void) => {
            authApi
                .AddressMap(point)
                .then((res) => {
                    console.log("Get Address --->", res);
                    if (res) {
                        // dispatch(onGetNotificationList(res.data.data));
                    }
                    callback(res);
                })
                .catch((error) => {
                    console.log("Get Address Error-->", error);
                    callback(error);
                });
        };

export const Maplocation =
    (
        // requestBody: RegisterRequestBody,
        callback: {
            (response: any): void;
            (arg0: any): void;
        }
    ) =>
        (dispatch: (arg0: { type: string; data: any }) => void) => {
            // (dispatch: any) => {
            authApi
                .Maplocation()
                .then((res: MaplocationResponse) => {
                    console.log("Call MapLocation--->", res);
                    // dispatch(onLogin(res));
                    callback(res);
                })
                .catch((error: ErrorResponse) => {
                    console.log("MapLocation error-->", error);
                    callback(error);
                });
        };

export const onAddAddress = (data: any = undefined) => {
    return {
        type: ActionTypes.ADDADDRESS,
        data,
    };
};
export const AddAddress =
    (
        requestBody: AddAddressRequestBody,
        callback: {
            (response: any): void;
            (arg0: any): void;
        }
    ) =>
        (dispatch: (arg0: { type: string; data: any }) => void) => {
            // (dispatch: any) => {
            authApi
                .AddAddress(requestBody)
                .then((res: AddAddressResponse) => {
                    console.log("Call Add Address--->", res);
                    // dispatch(onLogin(res));
                    callback(res);
                })
                .catch((error: ErrorResponse) => {
                    console.log("Add Address error-->", error);
                    callback(error);
                });
        };

export const onEditAddress = (data: any = undefined) => {
    return {
        type: ActionTypes.EDITADDRESS,
        data,
    };
};
export const EditAddress =
    (
        requestBody: EditAddressRequestBody,
        callback: {
            (response: any): void;
            (arg0: any): void;
        }
    ) =>
        (dispatch: (arg0: { type: string; data: any }) => void) => {
            // (dispatch: any) => {
            authApi
                .EditAddress(requestBody)
                .then((res: AddAddressResponse) => {
                    console.log("Call Edit Address--->", res);
                    // dispatch(onLogin(res));
                    callback(res);
                })
                .catch((error: ErrorResponse) => {
                    console.log("Edit Address error-->", error);
                    callback(error);
                });
        };

export const onLogOut = () => {
    return {
        type: ActionTypes.LOGOUT,
    };
};
export const logout =
    (
        // requestBody: LogOutRequestBody,
        callback: {
            (response: any): void;
            (arg0: any): void;
        }
    ) =>
        (dispatch: any) => {
            authApi
                .logout()
                .then((res: BaseResponse) => {
                    console.log("Call Logout User--->", res);
                    dispatch(onLogOut());
                    callback(res);
                })
                .catch((error: ErrorResponse) => {
                    console.log("Logout error-->", error);
                    callback(error);
                });
        };

