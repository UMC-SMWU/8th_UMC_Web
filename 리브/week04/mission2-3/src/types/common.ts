import { PAGINATION_ORDER } from "../enums/common";

export type CommonResponse<T>={
  status: boolean;
  statusCode: number;
  message: string;
  data:T;
};

export type CursorBasedResponse<T>={
  status: boolean;
  statusCode: number;
  message: string;
  data:T & {
    nextCursor: number | null;
    hasNext: boolean;
  };  
};


export type PaginationDto={
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER;
};

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
}

export interface ResponseCommentListDto {
  data: {
    data: Comment[];
    nextCursor: number | null;
  };
}

  