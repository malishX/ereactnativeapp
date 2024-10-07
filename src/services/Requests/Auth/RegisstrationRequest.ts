import {
    DefaultHeader,
    defaultHeaders,
    defaultParameters,
    HttpMethod,
    HttpRequest,
    RegistrationRequestBody,
} from "../../../services";
import { registrationURL } from "../../Constants";

export class RegistrationRequest implements HttpRequest {
    absolutePath: string = registrationURL;
    httpMethod: HttpMethod = "POST";
    body: object;

    constructor(requestBody: RegistrationRequestBody) {
        const formData = new FormData();
        formData.append("fullname", requestBody.fullname);
        formData.append("email", requestBody.email);
        formData.append("trn", requestBody.trn);
        formData.append("shopname", requestBody.shopname);
        formData.append("telephone", requestBody.telephone);
        formData.append("whatsapp", requestBody.whatsapp);
        formData.append("outlet_type", requestBody.outlet_type);
        formData.append("lat", requestBody.lat);
        formData.append("lng", requestBody.lng);
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
