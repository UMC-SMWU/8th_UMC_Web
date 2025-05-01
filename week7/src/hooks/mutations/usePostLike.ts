import {useMutation} from "@tanstack/react-query";
import {postLike} from "../../api/LpService.ts";
import {queryClient} from "../../App.tsx";
import {QUERY_KEY} from "../../constants/key.ts";

function usePostLike() {
    return useMutation({
        mutationFn: postLike,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, data.data.lpId],
            });
        },
        onError: (error) => {
            console.error("Error posting like:", error);
        },
    });
}

export default usePostLike;