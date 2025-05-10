import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { deleteLp } from "../../apis/lpdetail";
import { queryClient } from "../../App";

export function useDeleteLp() {
    return useMutation({
        mutationFn: deleteLp,
        onSuccess: (data) => {
            alert("LP 삭제 성공");
            console.log("LP 삭제 성공", data);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.myInfo],
            });
        },
        onError: (error) => {
            alert("LP 삭제 실패");
            console.error("LP 삭제 실패", error);
        },
    })
}

