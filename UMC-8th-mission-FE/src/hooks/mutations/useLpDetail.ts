import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { deleteLp, postLp, updateLp } from "../../apis/lpdetail";
import { queryClient } from "../../App";
import { PAGINATION_ORDER } from "../../enums/common";

export function usePostLp(){
    return useMutation({
    })
}

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

export function useUpdateLp() {
    return useMutation({
        mutationFn: updateLp,
        onSuccess: (data) => {
            alert("LP 수정 성공");
            console.log("LP 수정 성공", data);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, data.data.id],
            });
        }
        
    })
}
