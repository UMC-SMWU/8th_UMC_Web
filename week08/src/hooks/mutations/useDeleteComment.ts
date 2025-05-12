import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";

interface DeleteCommentParams {
  lpId: number;
  commentId: number;
}

const useDeleteComment = (lpId: number, order: "asc" | "desc") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, commentId }: DeleteCommentParams) => {
      await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
    },
    onSuccess: (_data, variables) => {
      const { commentId } = variables;

      queryClient.setQueryData(["comments", lpId, order], (oldData: any) => {
        if (!oldData) return;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.filter((comment: any) => comment.id !== commentId),
          })),
        };
      });
    },
  });
};

export default useDeleteComment;