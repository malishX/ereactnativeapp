// import {
//     Api,
//     CategoryListRequestBody,
//     CategoryListResponse,
//     CategoryListRequest,
// } from "services";

// export class HomeApi {
//     public constructor() { }

//     public categoryList(data: CategoryListRequestBody): Promise<CategoryListResponse> {
//         let request = new CategoryListRequest(data);
//         console.log("CategoryList request", request);

//         return new Promise<CategoryListResponse>((resolve, reject) => {
//             Api.executeRequest(request)
//                 .then((result) => resolve(result as CategoryListResponse))
//                 .catch((error) => reject(error));
//         });
//     }
// }

// export const HomeApi = new HomeApi();

import {
    Api,
    CategoryListRequestBody,
    CategoryListResponse,
    CategoryListRequest,
    AddressListRequestBody,
    AddressListResponse,
    AddressListRequest,
    DeleteAddressRequest,
    DeleteAddressRequestBody,
    DeleteAddressResponse,
    DefaultAddressRequest,
    DefaultAddressRequestBody,
    DefaultAddressResponse
} from "../../services";

export class HomeApi {
    public constructor() { }

    public categorylist(data: CategoryListRequestBody): Promise<CategoryListResponse> {
        let request = new CategoryListRequest(data);
        console.log("Add coupon request", request);

        return new Promise<CategoryListResponse>((resolve, reject) => {
            Api.executeRequest(request)
                .then((result) => resolve(result as CategoryListResponse))
                .catch((error) => reject(error));
        });
    }

    public addresslist(data: AddressListRequestBody): Promise<AddressListResponse> {
        let request = new AddressListRequest(data);
        console.log("get Address request", request);

        return new Promise<AddressListResponse>((resolve, reject) => {
            Api.executeRequest(request)
                .then((result) => resolve(result as AddressListResponse))
                .catch((error) => reject(error));
        });
    }

    public DeleteAddress(data: DeleteAddressRequestBody): Promise<DeleteAddressResponse> {
        console.log("data", data);

        let request = new DeleteAddressRequest(data);
        return new Promise<DeleteAddressResponse>((resolve, reject) => {
            // console.log("APiStatus",Api.executeRequest(request));
            Api.executeRequest(request)
                .then((result) => resolve(result as DeleteAddressResponse))
                .catch((error) => reject(error));
        });
    }

    public DefaultAddress(data: DefaultAddressRequestBody): Promise<DefaultAddressResponse> {
        console.log("data", data);

        let request = new DefaultAddressRequest(data);
        return new Promise<DefaultAddressResponse>((resolve, reject) => {
            // console.log("APiStatus",Api.executeRequest(request));
            Api.executeRequest(request)
                .then((result) => resolve(result as DefaultAddressResponse))
                .catch((error) => reject(error));
        });
    }
}

export const homeApi = new HomeApi();