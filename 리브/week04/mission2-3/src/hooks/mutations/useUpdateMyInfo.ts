import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { toast } from "react-toastify";

interface UpdateMyInfoDto {
  name: string;
  bio?: string;
  avatar?: string;
}

export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateMyInfoDto) => {
      const response = await axiosInstance.patch("/v1/users", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("정보가 수정되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
    onError: (err: any) => {
      toast.error("수정 실패: " + (err.response?.data?.message || err.message));
    },
  });
};


