import { ActionTypes } from "./index";
import {
  homeApi,
  ErrorResponse,
  CategoryListRequestBody,
  CategoryListResponse,
  AddressListRequestBody,
  AddressListResponse,
  DeleteAddressRequestBody,
  DeleteAddressResponse,
  DefaultAddressRequestBody,
  DefaultAddressResponse,
} from "../services/index";
// import {  } from "../services/ApiManager/Home";

export const onCategoryList = (data: any) => {
  return {
    type: ActionTypes.CATEGORY_LIST,
    data,
  };
};

export const CategoryList =
  (
    requestBody: CategoryListRequestBody,
    callback: { (response: any): void; (arg0: any): void }
  ) =>
  (dispatch: (arg0: { type: string; data: any }) => void) => {
    console.log("Category Request Request BODY", requestBody);

    homeApi
      .categorylist(requestBody)
      .then((res: CategoryListResponse) => {
        console.log("Category Res Response --->", res);
        dispatch(onCategoryList(res));
        callback(res);
      })
      .catch((error: ErrorResponse) => {
        console.log("CategoryList Error-->", error);
        callback(error);
      });
  };

export const onAddressList = (data: any) => {
  return {
    type: ActionTypes.ADDRESS_LIST,
    data,
  };
};

export const AddressList =
  (
    requestBody: AddressListRequestBody,
    callback: { (response: any): void; (arg0: any): void }
  ) =>
  (dispatch: (arg0: { type: string; data: any }) => void) => {
    console.log("Address Request BODY", requestBody);

    homeApi
      .addresslist(requestBody)
      .then((res: AddressListResponse) => {
        // for(var )
        // const addressLsit = res.result.map((item) => {
        //     const latlng = item.latlng.split(",")
        //     console.log("latlng", latlng);

        //     return {
        //         ...item,
        //         latitude: latlng[0],
        //         longitude: latlng[1]
        //     }
        // })
        // const requiredList = res.result.map((data) => ({
        //     ...data,
        //    latitude
        // }));
        console.log("Category Res Response --->", res);
        dispatch(onAddressList(res));
        callback(res);
      })
      .catch((error: ErrorResponse) => {
        console.log("AddressList Error-->", error);
        callback(error);
      });
  };

export const DeleteAddress =
  (
    requestBody: DeleteAddressRequestBody,
    callback: {
      (response: any): void;
      (arg0: any): void;
    }
  ) =>
  (dispatch: (arg0: { type: string; data: any }) => void) => {
    // (dispatch: any) => {
    homeApi
      .DeleteAddress(requestBody)
      .then((res: DeleteAddressResponse) => {
        console.log("Call Add Address--->", res);
        // dispatch(onLogin(res));
        callback(res);
      })
      .catch((error: ErrorResponse) => {
        console.log("Add Address error-->", error);
        callback(error);
      });
  };

export const DefaultAddress =
  (
    requestBody: DefaultAddressRequestBody,
    callback: {
      (response: any): void;
      (arg0: any): void;
    }
  ) =>
  (dispatch: (arg0: { type: string; data: any }) => void) => {
    // (dispatch: any) => {
    homeApi
      .DefaultAddress(requestBody)
      .then((res: DefaultAddressResponse) => {
        console.log("Call Add Address--->", res);
        // dispatch(onLogin(res));
        callback(res);
      })
      .catch((error: ErrorResponse) => {
        console.log("Add Address error-->", error);
        callback(error);
      });
  };
