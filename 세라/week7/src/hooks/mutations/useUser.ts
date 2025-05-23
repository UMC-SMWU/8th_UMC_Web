import { useMutation } from "@tanstack/react-query";
import { deleteUser, patchUser } from "../../api/UserService.ts";
import { useAuthContext } from "../../context/AuthContext.tsx";
import { postLogin, postLogout } from "../../api/AuthService.ts";
import { LOCAL_STORAGE_KEY } from "../../constants/key.ts";

function useDeleteUser() {
  const { signOut } = useAuthContext();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: signOut,
  });
}

function usePatchUser() {
  return useMutation({
    mutationFn: patchUser,
    onMutate: (variables) => {
      localStorage.setItem(LOCAL_STORAGE_KEY.nickname, variables.name);
    },
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem(LOCAL_STORAGE_KEY.nickname, data.data.name);
    },
    onError: (error) => console.log(error),
  });
}

function usePostLogin(email: string, password: string) {
  const { login } = useAuthContext();
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      console.log(data);
      login({ email, password });
    },
  });
}

function usePostLogout() {
  const { logout } = useAuthContext();
  return useMutation({
    mutationFn: postLogout,
    onSuccess: logout,
  });
}

export { useDeleteUser, usePatchUser, usePostLogin, usePostLogout };
