import {
  Api,
  OtpVerifyRequest,
  OtpVerifyRequestBody,
  RegisterRequest,
  RegisterRequestBody,
  RegisterResponse,
  RegistrationRequest,
  RegistrationRequestBody,
  RegistrationResponse,
  RetailersRequest,
  RetailersRequestBody,
  RetailersResponse,
  AddressMapResponse,
  AddressMapRequest,
  LatLngRequest,
  MaplocationRequest,
  MaplocationResponse,
  AddAddressRequest,
  AddAddressResponse,
  AddAddressRequestBody,
  EditAddressRequest,
  EditAddressRequestBody,
  BaseResponse,
  LogOutRequest,
} from "../../services";
export class AuthApi {
  public constructor() {}

  public Register = (data: RegisterRequestBody) => {
    let request = new RegisterRequest(data);
    return new Promise<RegisterResponse>((resolve, reject) => {
      // console.log("APiStatus",Api.executeRequest(request));
      Api.executeRequest(request)
        .then((result: RegisterResponse) => resolve(result as RegisterResponse))
        .catch((error: any) => reject(error));
    });
  };

  // public Register(data: RegisterRequestBody): Promise<RegisterResponse> {
  //     let request = new RegisterRequest(data);
  //     return new Promise<RegisterResponse>((resolve, reject) => {
  //         // console.log("APiStatus",Api.executeRequest(request));
  //         Api.executeRequest(request) =>
  //         // return(

  //         // )
  //             .then((result) => resolve(result as RegisterResponse))
  //             .catch((error) => reject(error));
  //     });
  // }

  public OtpVerify = (
    data: OtpVerifyRequestBody
  ): Promise<RegisterResponse> => {
    let request = new OtpVerifyRequest(data);
    return new Promise<RegisterResponse>((resolve, reject) => {
      // console.log("APiStatus",Api.executeRequest(request));
      Api.executeRequest(request)
        .then((result: RegisterResponse) => resolve(result as RegisterResponse))
        .catch((error: any) => reject(error));
    });
  };

  public Registration(
    data: RegistrationRequestBody
  ): Promise<RegistrationResponse> {
    let request = new RegistrationRequest(data);
    return new Promise<RegistrationResponse>((resolve, reject) => {
      // console.log("APiStatus",Api.executeRequest(request));
      Api.executeRequest(request)
        .then((result: RegistrationResponse) =>
          resolve(result as RegistrationResponse)
        )
        .catch((error: any) => reject(error));
    });
  }

  public Retailers(data: RetailersRequestBody): Promise<RetailersResponse> {
    let request = new RetailersRequest(data);
    return new Promise<RetailersResponse>((resolve, reject) => {
      // console.log("APiStatus",Api.executeRequest(request));
      Api.executeRequest(request)
        .then((result: RetailersResponse) =>
          resolve(result as RetailersResponse)
        )
        .catch((error: any) => reject(error));
    });
  }

  public AddressMap(data: LatLngRequest): Promise<AddressMapResponse> {
    console.log("data", data);

    let request = new AddressMapRequest(data);
    return new Promise<AddressMapResponse>((resolve, reject) => {
      Api.executeRequest(request)
        .then((result: AddressMapResponse) =>
          resolve(result as AddressMapResponse)
        )
        .catch((error: any) => reject(error));
    });
  }

  public Maplocation(): // data: LatLngRequest
  Promise<MaplocationResponse> {
    // console.log("data", data);

    let request = new MaplocationRequest();
    return new Promise<MaplocationResponse>((resolve, reject) => {
      Api.executeRequest(request)
        .then((result: MaplocationResponse) =>
          resolve(result as MaplocationResponse)
        )
        .catch((error: MaplocationResponse) => reject(error));
    });
  }

  public AddAddress(data: AddAddressRequestBody): Promise<AddAddressResponse> {
    let request = new AddAddressRequest(data);
    return new Promise<AddAddressResponse>((resolve, reject) => {
      // console.log("APiStatus",Api.executeRequest(request));
      Api.executeRequest(request)
        .then((result: AddAddressResponse) =>
          resolve(result as AddAddressResponse)
        )
        .catch((error: any) => reject(error));
    });
  }

  public EditAddress(
    data: EditAddressRequestBody
  ): Promise<AddAddressResponse> {
    let request = new EditAddressRequest(data);
    return new Promise<AddAddressResponse>((resolve, reject) => {
      // console.log("APiStatus",Api.executeRequest(request));
      Api.executeRequest(request)
        .then((result: AddAddressResponse) =>
          resolve(result as AddAddressResponse)
        )
        .catch((error: any) => reject(error));
    });
  }
  public logout(): Promise<BaseResponse> {
    let request = new LogOutRequest();
    return new Promise<BaseResponse>((resolve, reject) => {
      Api.executeRequest(request)
        .then((result: BaseResponse) => resolve(result as BaseResponse))
        .catch((error: any) => reject(error));
    });
  }
}

export const authApi = new AuthApi();
