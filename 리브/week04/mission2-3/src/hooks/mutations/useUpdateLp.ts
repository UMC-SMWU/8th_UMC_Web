import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../../apis/axios";

interface UpdateLpDto {
  lpId: number;
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
}

export const useUpdateLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, ...body }: UpdateLpDto) => {
      const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, {
        ...body,
        published: true,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("LP 수정이 완료되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["lp"] });
    },
    onError: (error: any) => {
      toast.error(`LP 수정 실패: ${error.response?.data?.message || error.message}`);
    },
  });
};