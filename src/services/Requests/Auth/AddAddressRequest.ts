import {
    AddAddressRequestBody,
    DefaultHeader,
    defaultHeaders,
    defaultParameters,
    HttpMethod,
    HttpRequest,
    OtpVerifyRequestBody,
} from "../../index";
import { addAddressURL } from "../../Constants";

export class AddAddressRequest implements HttpRequest {
    absolutePath: string = addAddressURL;
    httpMethod: HttpMethod = "POST";
    body: object;

    constructor(requestBody: AddAddressRequestBody) {
        const formData = new FormData();
        formData.append("customerId", requestBody.customerId);
        formData.append("fullname", requestBody.fullname);
        formData.append("address", requestBody.address);
        formData.append("Telephone", requestBody.Telephone);
        formData.append("flat", requestBody.flat);
        formData.append("building_name", requestBody.building_name);
        formData.append("addressType", requestBody.addressType);
        formData.append("landmark", requestBody.landmark);
        formData.append("company", requestBody.company);
        formData.append("latitude", requestBody.latitude);
        formData.append("longitude", requestBody.longitude);
        formData.append("is_in_superhub", requestBody.is_in_superhub);
        this.body = formData;
    }
    get headers(): DefaultHeader {
        return defaultHeaders;
    }
    get parameters(): string[][] {
        const parameters: string[][] = defaultParameters;
        return parameters;
    }
}