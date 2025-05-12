import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";

interface UpdateLpParams {
  lpId: number;
  title: string;
  content: string;
  thumbnail: string;
}

const useUpdateLp = (
  options?: {
    onSuccess?: (updatedLp: any) => void;
  }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, title, content, thumbnail }: UpdateLpParams) => {
      const res = await axiosInstance.patch(`/v1/lps/${lpId}`, {
        title,
        content,
        thumbnail,
      });
      return res.data.data;
    },
    onSuccess: (updatedLp) => {
      queryClient.setQueryData(["lpDetail", updatedLp.id], (old: any) => {
        if (!old) return;
        return {
          ...old,
          data: {
            ...old.data,
            ...updatedLp,
          },
        };
      });

      if (options?.onSuccess) {
        options.onSuccess(updatedLp);
      }
    },
  });
};

export default useUpdateLp;