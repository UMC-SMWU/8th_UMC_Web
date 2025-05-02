import { useMutation } from "@tanstack/react-query";
import {
  deleteComment,
  patchComment,
  postComment,
} from "../../api/CommentService";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostComment() {
  return useMutation({
    mutationFn: ({
      lpId,
      requestPostCommentDto,
    }: {
      lpId: number;
      requestPostCommentDto: { content: string };
    }) => postComment(lpId, requestPostCommentDto),
    onSuccess: (data) => {
      console.log("Post Comment Success", data);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments],
      });
    },
    onError: (error) => {
      console.error("Error posting comment:", error);
    },
  });
}

function usePatchComment() {
  return useMutation({
    mutationFn: ({
      lpId,
      commentId,
      requestPatchCommentDto,
    }: {
      lpId: number;
      commentId: number;
      requestPatchCommentDto: { content: string };
    }) => patchComment(lpId, commentId, requestPatchCommentDto),
    onSuccess: (data) => {
      console.log("Patch Comment Success", data);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments],
      });
    },
  });
}

function useDeleteComment() {
  return useMutation({
    mutationFn: ({ lpId, commentId }: { lpId: number; commentId: number }) =>
      deleteComment(lpId, commentId),
    onSuccess: (data) => {
      console.log("Delete Comment Success", data);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments],
      });
    },
  });
}
export { usePostComment, usePatchComment, useDeleteComment };
