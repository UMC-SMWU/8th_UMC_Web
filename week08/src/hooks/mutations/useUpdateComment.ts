// hooks/mutations/useUpdateComment.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";

interface UpdateCommentParams {
  commentId: number;
  content: string;
}

const useUpdateComment = (lpId: number, order: "asc" | "desc") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId, content }: UpdateCommentParams) => {
      const res = await axiosInstance.patch(
        `/v1/lps/${lpId}/comments/${commentId}`,
        { content }
      );
      return res.data.data;
    },
    onSuccess: (updatedComment) => {
      // 댓글 목록 업데이트
      queryClient.setQueryData<any>(["comments", lpId, order], (oldData:any) => {
        if (!oldData) return;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((comment: any) =>
                comment.id === updatedComment.id
                  ? { ...comment, ...updatedComment,author: comment.author  } // 🔥 기존 author 덮어쓰기 방지
                  : comment
            ),
          })),
        };
      });
    },
  });
};

export default useUpdateComment;