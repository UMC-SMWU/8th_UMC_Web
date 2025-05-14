import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../api/LpService.ts";
import { queryClient } from "../../App.tsx";
import { QUERY_KEY } from "../../constants/key.ts";
import { ResponseLpDetailDto } from "../../types/lp.ts";
import { ResponseMyInfoDto } from "../../types/auth.ts";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,

    // 1. Optimistic Update
    onMutate: async (lpId: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lps, lpId] });
      const previousLp = queryClient.getQueryData<ResponseLpDetailDto>([
        QUERY_KEY.lps,
        lpId,
      ]);

      queryClient.setQueryData(
        [QUERY_KEY.lps, lpId],
        (old: ResponseLpDetailDto) => {
          if (!old) return old;
          const myInfo = queryClient.getQueryData<ResponseMyInfoDto>([
            QUERY_KEY.myInfo,
          ]);

          return {
            ...old,
            data: {
              ...old.data,
              likes: [
                ...old.data.likes,
                { userId: myInfo?.data?.id, temp: true }, // 임시 좋아요 추가
              ],
            },
          };
        },
      );

      return { previousLp };
    },

    // 2. 오류 시 롤백
    onError: (err, lpId, context) => {
      if (context?.previousLp) {
        queryClient.setQueryData([QUERY_KEY.lps, lpId], context.previousLp);
      }
      console.error("Error posting like:", err);
    },

    // 3. 성공/실패 관계없이 invalidate
    onSettled: (_data, _error, lpId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps, lpId] });
    },
  });
}

export default usePostLike;
