export interface BaseResponse {
  status: string | number;
  statusCode: number;
  message?: string;
  msg: string;
  data:any;
  success: number | string;
  specification: string;
  token: string;
}
