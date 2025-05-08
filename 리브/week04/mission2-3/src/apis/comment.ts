import { axiosInstance } from "../apis/axios";
import { ResponseCommentListDto } from "../types/comment";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getComments = async ({
  lpId,
  cursor,
  order,
}: {
  lpId: number;
  cursor?: number;
  order: "asc" | "desc";
}): Promise<ResponseCommentListDto> => {
  const res = await axiosInstance.get<ResponseCommentListDto>(
    `/v1/lps/${lpId}/comments`,
    {
      params: { cursor, order },
      headers: getAuthHeader(),
    }
  );
  return res.data;
};

//댓글 삭제
export const deleteComment = async (commentId: number) => {
  const res = await axiosInstance.delete(`/v1/comments/${commentId}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// 댓글 등록
export const postComment = async ({
  lpId,
  content,
}: {
  lpId: number;
  content: string;
}): Promise<void> => {
  await axiosInstance.post(
    `/v1/lps/${lpId}/comments`,
    { content },
    {
      headers: getAuthHeader(),
    }
  );
};



