import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usepPostComment() {
    return useMutation({
        mutationFn: postComment,
        onSuccess: (data) => {
            console.log("댓글 작성 성공", data);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.comment],
            });
        },
        onError: (error) => {
            console.error("댓글 작성 실패", error);
        },
    });
}

export default usepPostComment;
