export type BaseResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};
