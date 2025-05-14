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

export type CommentPaginationDto = {
  lpId: number;
  cursor?: number;
  limit?: number;
  order?: PAGINATION_ORDER;
};

export enum PAGINATION_ORDER {
  ASC = "asc",
  DESC = "desc",
}

export type ResponseWithMessage = BaseResponse<{
  message: string;
}>;
