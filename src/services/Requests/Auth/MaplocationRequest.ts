import {
    DefaultHeader,
    defaultHeaders,
    defaultParameters,
    HttpMethod,
    HttpRequest,
    OtpVerifyRequestBody,
} from "../../index";
import { maplocationURL } from "../../Constants";

export class MaplocationRequest implements HttpRequest {
    absolutePath: string = maplocationURL;
    httpMethod: HttpMethod = "POST";
    // body: object;

    constructor() {
        // const formData = new FormData();
        // formData.append("mobile", requestBody.mobile);
        // formData.append("otp", requestBody.otp);
        // this.body = formData;
    }
    get headers(): DefaultHeader {
        return defaultHeaders;
    }
    get parameters(): string[][] {
        const parameters: string[][] = defaultParameters;
        return parameters;
    }
}