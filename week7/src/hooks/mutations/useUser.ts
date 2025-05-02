import { useMutation } from "@tanstack/react-query";
import { deleteUser, patchUser } from "../../api/UserService.ts";

function useDeleteUser() {
  return useMutation({
    mutationFn: deleteUser,
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
