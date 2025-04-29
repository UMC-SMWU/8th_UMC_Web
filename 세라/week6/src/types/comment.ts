import { CursorBaseResponse } from "./common";
import { Author } from "./lp";

export type ResponseCommentDto = CursorBaseResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
}>;
