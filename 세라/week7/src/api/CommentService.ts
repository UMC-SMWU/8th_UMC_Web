import { ResponseCommentDto } from "../types/comment";
import { CommentPaginationDto, ResponseWithMessage } from "../types/common";
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

export const postComment = async (
  lpId: number,
  requestPostCommentDto: { content: string }
): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.post(
    `v1/lps/${lpId}/comments`,
    requestPostCommentDto
  );
  return data;
};

export const patchComment = async (
  lpId: number,
  commentId: number,
  requestPatchCommentDto: { content: string }
): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.patch(
    `v1/lps/${lpId}/comments/${commentId}`,
    requestPatchCommentDto
  );
  return data;
};

export const deleteComment = async (
  lpId: number,
  commentId: number
): Promise<ResponseWithMessage> => {
  const { data } = await axiosInstance.delete(
    `v1/lps/${lpId}/comments/${commentId}`
  );
  return data;
};
