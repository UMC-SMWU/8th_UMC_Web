import { useMutation } from "@tanstack/react-query";
import { patchComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePatchComment() {
    return useMutation({
      mutationFn: patchComment,
      onSuccess: (data) => {
        console.log("댓글 수정 성공", data);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.comment],
        });
      },
    });
}

export default usePatchComment;
