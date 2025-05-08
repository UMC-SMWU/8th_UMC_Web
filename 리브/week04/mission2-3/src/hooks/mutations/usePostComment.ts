import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import { toast } from "react-toastify";

interface PostCommentParams {
  lpId: number;
  content: string;
}

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lpId, content }: PostCommentParams) =>
      postComment({ lpId, content }),
    onSuccess: (_data, { lpId }) => {
      toast.success("댓글이 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
    onError: () => {
      toast.error("댓글 등록에 실패했습니다.");
    },
  });
};
