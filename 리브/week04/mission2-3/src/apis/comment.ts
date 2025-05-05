import { axiosInstance } from "../apis/axios";
import { ResponseCommentListDto } from "../types/comment";

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
    }
  );
  return res.data;
};


