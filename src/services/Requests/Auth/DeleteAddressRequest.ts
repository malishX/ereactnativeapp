import {
    AddAddressRequestBody,
    DefaultHeader,
    defaultHeaders,
    defaultParameters,
    HttpMethod,
    HttpRequest,
    DeleteAddressRequestBody,
} from "../../index";
import { deleteAddressURL } from "../../Constants";

export class DeleteAddressRequest implements HttpRequest {
    absolutePath: string = deleteAddressURL;
    httpMethod: HttpMethod = "POST";
    body: object;

    constructor(requestBody: DeleteAddressRequestBody) {
        const formData = new FormData();
        formData.append("hashkey", requestBody.hashkey);
        formData.append("addressID", requestBody.addressID);
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