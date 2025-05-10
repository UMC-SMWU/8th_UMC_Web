import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";
import { patchMyInfo } from "../../apis/auth";

function usePatchMy () {
    return useMutation({
        mutationFn: patchMyInfo,
        onSuccess: (data) => {
        console.log("내 정보 수정 성공", data);
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.myInfo],
        });
        },
    });
};

export default usePatchMy;
