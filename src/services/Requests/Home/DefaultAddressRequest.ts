import {
    DefaultHeader,
    defaultHeaders,
    defaultParameters,
    HttpMethod,
    HttpRequest,
    DefaultAddressRequestBody,
} from "../../../services/index";
import {
    defaultAddressURL
} from "../../../services/Constants";

export class DefaultAddressRequest implements HttpRequest {
    absolutePath: string = defaultAddressURL;
    httpMethod: HttpMethod = "POST";
    body: object;

    constructor(requestBody: DefaultAddressRequestBody) {
        const formData = new FormData();
        formData.append("addressId", requestBody.addressId);
        formData.append("customerId", requestBody.customerId);

        this.body = formData;
    }

    get headers(): DefaultHeader {
        var header = Object.assign({}, defaultHeaders);
        // header.Authorization = `Bearer ${USER_TOKEN.get().token}`;
        return header;
    }
    get parameters(): string[][] {
        const parameters: string[][] = defaultParameters;
        return parameters;
    }
}
