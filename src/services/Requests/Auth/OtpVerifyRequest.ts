import {
    DefaultHeader,
    defaultHeaders,
    defaultParameters,
    HttpMethod,
    HttpRequest,
    OtpVerifyRequestBody,
} from "../../index";
import { verifyOTPURL } from "../../Constants";

export class OtpVerifyRequest implements HttpRequest {
    absolutePath: string = verifyOTPURL;
    httpMethod: HttpMethod = "POST";
    body: object;

    constructor(requestBody: OtpVerifyRequestBody) {
        const formData = new FormData();
        formData.append("mobile", requestBody.mobile);
        formData.append("otp", requestBody.otp);
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