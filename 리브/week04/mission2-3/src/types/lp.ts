import { CursorBasedResponse } from "./common.ts";
import { CommonResponse } from "./common.ts";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type ResponseLpDetailDto = CommonResponse<Lp & {
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
}>;

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpListDto = CursorBasedResponse<{
  data: Lp[];
}>;
