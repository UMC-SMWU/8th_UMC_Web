import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";

export const useToggleLike = (lpId: number, isLiked: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
      } else {
        await axiosInstance.post(`/v1/lps/${lpId}/likes`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpId] });
    },
  });
};

