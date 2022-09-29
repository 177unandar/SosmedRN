export interface BaseResponse<T> {
  status: String;
  message: String;
  data: T;
}
