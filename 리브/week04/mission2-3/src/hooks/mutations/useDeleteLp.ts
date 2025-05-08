import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../apis/axios";

export const useDeleteLp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (lpId: number) => {
      const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
      return data;
    },
    onSuccess: () => {
      toast.success("LP가 성공적으로 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["lpList"] });
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(`LP 삭제 실패: ${error.response?.data?.message || error.message}`);
    },
  });
};