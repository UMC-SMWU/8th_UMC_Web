import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../../apis/axios";

interface DeleteCommentParams {
  lpId: number;
  commentId: number;
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, commentId }: DeleteCommentParams) => {
      const res = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
      return res.data;
    },
    onSuccess: (_data, { lpId }) => {
      toast.success("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
    onError: (error: any) => {
      toast.error("댓글 삭제 실패: " + (error.response?.data?.message || error.message));
    },
  });
};




