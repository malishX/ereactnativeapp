import {
    DefaultHeader,
    defaultHeaders,
    defaultParameters,
    HttpMethod,
    HttpRequest,
    CategoryListRequestBody,
} from "../../../services/index";
import {
    CategoryListURL
} from "../../../services/Constants";

export class CategoryListRequest implements HttpRequest {
    absolutePath: string = CategoryListURL;
    httpMethod: HttpMethod = "POST";
    body: object;

    constructor(requestBody: CategoryListRequestBody) {
        const formData = new FormData();
        formData.append("hashkey", requestBody.hashkey);
        formData.append("retailer_id", requestBody.retailer_id);

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
