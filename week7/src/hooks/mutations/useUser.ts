import { useMutation } from "@tanstack/react-query";
import { deleteUser, patchUser } from "../../api/UserService.ts";
import { useAuthContext } from "../../context/AuthContext.tsx";

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
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => console.log(error),
  });
}

export { useDeleteUser, usePatchUser };
