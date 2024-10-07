import {
    DefaultHeader,
    defaultHeaders,
    defaultParameters,
    HttpMethod,
    HttpRequest,
    RetailersRequestBody,
} from "../../../services";
import { retailersURL } from "../../Constants";

export class RetailersRequest implements HttpRequest {
    absolutePath: string = retailersURL;
    httpMethod: HttpMethod = "POST";
    body: object;

    constructor(requestBody: RetailersRequestBody) {
        const formData = new FormData();
        formData.append("hashkey", requestBody.hashkey);
        formData.append("referral_code", requestBody.referral_code);
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
