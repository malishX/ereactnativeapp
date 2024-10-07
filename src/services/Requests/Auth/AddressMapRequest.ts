import {
    DefaultHeader,
    defaultHeaders,
    defaultParameters,
    HttpMethod,
    HttpRequest,
    LatLngRequest,
    OtpVerifyRequestBody,
} from "../../index";
import { addressMapURL } from "../../Constants";

export class AddressMapRequest implements HttpRequest {
    absolutePath: string = addressMapURL;
    httpMethod: HttpMethod = "GET";
    // body: object;

    constructor(requestData: LatLngRequest) {
        // console.log("requestData", requestData.point);

        this.absolutePath = `${this.absolutePath}&point=${requestData.longitude},${requestData.latitude}`;
    }
    get headers(): DefaultHeader {
        return defaultHeaders;
    }
    get parameters(): string[][] {
        const parameters: string[][] = defaultParameters;
        return parameters;
    }
}