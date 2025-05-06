import { BaseResponse, CursorBaseResponse } from "./common";

export type ResponseLpDto = CursorBaseResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Like[];
}>;

export type ResponseLpDetailDto = BaseResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Like[];
  author: Author;
}>;

export type Tag = {
  id: number;
  name: string;
};

export type Like = {
  id: number;
  userId: number;
  lpId: number;
};

export type Author = {
  id: number;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ResponseLikeDto = BaseResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type ResponsePostLpDto = BaseResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}>;

export type RequestPostLpDto = {
  title: string;
  content: string;
  thumbnail: string | null;
  tags: string[];
  published: boolean;
};

export type ResponsePatchLpDto = BaseResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
}>;

export type ResponseDeleteLpDto = {
  status: boolean;
  statusCode: number;
  message: string;
  data: boolean;
};
