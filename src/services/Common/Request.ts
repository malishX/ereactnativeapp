import { DefaultHeader } from "./DefaultHeader";

export type HttpMethod = "POST" | "GET" | "PUT" | "DELETE";

export const defaultHeaders: DefaultHeader = {
  Accept: "application/json",
  // "Content-Type": "application/x-www-form-urlencoded"
};

export interface HttpRequest {
  readonly absolutePath: string;
  readonly httpMethod: HttpMethod;
  readonly headers: DefaultHeader;
  readonly parameters: any;
  readonly body?: object;
}


export const defaultParameters = [];


// export const defaultParameters = {
//     get: () => {
//         return [];
//     },
// };
