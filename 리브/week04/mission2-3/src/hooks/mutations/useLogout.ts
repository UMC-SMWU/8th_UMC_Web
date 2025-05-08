import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: async () => {
      await logout();
      toast.success("로그아웃 성공!");
      navigate("/login");
    },
    onError: () => {
      toast.error("로그아웃 실패");
    },
  });
};
