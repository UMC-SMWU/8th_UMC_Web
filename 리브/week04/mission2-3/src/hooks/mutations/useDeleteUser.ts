import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../apis/auth";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useDeleteUser = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      toast.success("회원 탈퇴가 완료되었습니다.");
      await logout();         
      navigate("/");          
    },
    onError: (err: any) => {
      toast.error("탈퇴 실패: " + (err.response?.data?.message || err.message));
    },
  });
};
