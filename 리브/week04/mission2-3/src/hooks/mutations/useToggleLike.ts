import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { useAuth } from "../../context/AuthContext";
import { ResponseLpDetailDto } from "../../types/lp";

export const useToggleLike = (lpId: number, isLiked: boolean) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  return useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
      } else {
        await axiosInstance.post(`/v1/lps/${lpId}/likes`);
      }
    },

    // Optimistic update
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["lp", lpId] });

      const previousLp = queryClient.getQueryData<ResponseLpDetailDto>(["lp", lpId]);

      if (previousLp && userId != null) {
        const newLikes = isLiked
          ? previousLp.data.likes.filter((like) => like.userId !== userId)
          : [...previousLp.data.likes, { id: Date.now(), userId, lpId }]; // lpId 추가됨

        queryClient.setQueryData<ResponseLpDetailDto>(["lp", lpId], {
          ...previousLp,
          data: {
            ...previousLp.data,
            likes: newLikes,
          },
        });
      }

      return { previousLp };
    },

    onError: (_err, _newLike, context) => {
      if (context?.previousLp) {
        queryClient.setQueryData(["lp", lpId], context.previousLp);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpId] });
    },
  });
};


