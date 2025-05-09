import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMyInfo } from "../../apis/auth";

const useUpdateMyInfo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateMyInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["myInfo"]});
        },
    });
};

export default useUpdateMyInfo;