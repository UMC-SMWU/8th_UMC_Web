export type BaseResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBaseResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: CursorData<T>;
};

export type CursorData<T> = {
  data: T[];
  nextCursor: number;
  hasNext: boolean;
};

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER;
};

enum PAGINATION_ORDER {
  ASC = "asc",
  DESC = "desc",
}
