import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { useNavigate } from "react-router-dom";

const useDeleteLp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (lpId: number) => {
      await axiosInstance.delete(`/v1/lps/${lpId}`);
    },
    onSuccess: () => {
      alert("LP가 삭제되었습니다.");
      navigate("/");
    },
  });
};

export default useDeleteLp;