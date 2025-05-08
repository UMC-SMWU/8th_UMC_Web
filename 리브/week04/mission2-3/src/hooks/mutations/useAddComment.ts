import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface AddCommentParams {
  lpId: number;
  content: string;
}

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, content }: AddCommentParams) => {
      const response = await axios.post(`/v1/lps/${lpId}/comments`, { content }, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: (_, { lpId }) => {
      // 해당 LP의 댓글 목록을 다시 불러오게 만듦
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
    onError: (err: any) => {
      alert(`댓글 등록 실패: ${err.response?.data?.message || err.message}`);
    },
  });
};
