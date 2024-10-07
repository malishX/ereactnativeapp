import {
    DefaultHeader,
    defaultHeaders,
    defaultParameters,
    HttpMethod,
    HttpRequest,
    AddressListRequestBody,
} from "../../../services/index";
import {
    AddressListURL
} from "../../../services/Constants";

export class AddressListRequest implements HttpRequest {
    absolutePath: string = AddressListURL;
    httpMethod: HttpMethod = "POST";
    body: object;

    constructor(requestBody: AddressListRequestBody) {
        const formData = new FormData();
        formData.append("hashkey", requestBody.hashkey);
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
