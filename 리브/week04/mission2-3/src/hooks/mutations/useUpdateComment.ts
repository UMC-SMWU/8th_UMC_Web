import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios"; 
import { toast } from "react-toastify";

interface UpdateCommentParams {
  commentId: number;
  lpId: number;
  content: string;
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId, lpId, content }: UpdateCommentParams) => {
      const response = await axiosInstance.patch(
        `/v1/lps/${lpId}/comments/${commentId}`, 
        { content }
      );
      return response.data;
    },
    onSuccess: (_data, { lpId }) => {
      toast.success("댓글이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
    onError: (error: any) => {
      toast.error("댓글 수정 실패: " + (error.response?.data?.message || error.message));
    },
  });
};



