import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteComment() {
    return useMutation({
        mutationFn: deleteComment,
        onSuccess: (data) => {
        console.log("댓글 삭제 성공", data);
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.comment],
        });
        },
    });
}

export default useDeleteComment;
