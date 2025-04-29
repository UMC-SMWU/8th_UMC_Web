import { ResponseCommentDto } from "../types/comment";
import { CommentPaginationDto } from "../types/common";
import { axiosInstance } from "./axios";

export const getComments = async (
  commentPaginationDto: CommentPaginationDto
): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.get(
    `v1/lps/${commentPaginationDto.lpId}/comments`,
    {
      params: commentPaginationDto,
    }
  );
  return data;
};
