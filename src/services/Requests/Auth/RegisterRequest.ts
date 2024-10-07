import {
  DefaultHeader,
  defaultHeaders,
  defaultParameters,
  HttpMethod,
  HttpRequest,
  RegisterRequestBody,
} from "services";
import { sendOtpURL } from "../../Constants";

export class RegisterRequest implements HttpRequest {
  absolutePath: string = sendOtpURL;
  httpMethod: HttpMethod = "POST";
  body: object;

  constructor(requestBody: RegisterRequestBody) {
    const formData = new FormData();
    formData.append("mobile", requestBody.mobile);
    formData.append("event", requestBody.event);
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
