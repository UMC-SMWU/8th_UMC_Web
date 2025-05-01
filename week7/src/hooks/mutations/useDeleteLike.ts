import {useMutation} from "@tanstack/react-query";
import {deleteLike} from "../../api/LpService.ts";
import {queryClient} from "../../App.tsx";
import {QUERY_KEY} from "../../constants/key.ts";

function useDeleteLike() {
    return useMutation({
        mutationFn: deleteLike,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, data.data.lpId]
            })
        },
        onError: (error) => {
            console.error("Error deleting like:", error);
        },
    });
}

export default useDeleteLike;