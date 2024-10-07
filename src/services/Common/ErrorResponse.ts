import { Exception } from "./Exception";

export interface ErrorResponse {
  statusCode?: number;
  error?: string;
  data?: any;
  exceptionType: Exception;
}
