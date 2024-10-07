import {
    DefaultHeader,
    defaultHeaders,
    defaultParameters,
    HttpMethod,
    HttpRequest,
    OtpVerifyRequestBody,
} from "../../index";
import { LogoutURL } from "../../Constants";

export class LogOutRequest implements HttpRequest {
    absolutePath: string = LogoutURL;
    httpMethod: HttpMethod = "POST";
    // body: object;

    constructor() { }
    get headers(): DefaultHeader {
        return defaultHeaders;
    }
    get parameters(): string[][] {
        const parameters: string[][] = defaultParameters;
        return parameters;
    }
}