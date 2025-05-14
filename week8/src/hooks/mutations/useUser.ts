import { useMutation } from "@tanstack/react-query";
import { deleteUser, patchUser } from "../../api/UserService.ts";
import { useAuthContext } from "../../context/AuthContext.tsx";
import { postLogin, postLogout } from "../../api/AuthService.ts";
import { LOCAL_STORAGE_KEY, QUERY_KEY } from "../../constants/key.ts";
import { queryClient } from "../../App.tsx";
import { ResponseMyInfoDto } from "../../types/auth.ts";

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
    // 요청 전에 먼저 업데이트
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.myInfo],
      });

      // 캐시된 데이터를 가져옴
      const prevMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);
      if (prevMyInfo) {
        const optimisticMyInfo = {
          ...prevMyInfo,
          data: {
            ...prevMyInfo.data,
            name: variables.name, // 사용자 입력으로 미리 업데이트
          },
        };

        // 캐시값을 미리 변경
        queryClient.setQueryData([QUERY_KEY.myInfo], optimisticMyInfo);
      }
      localStorage.setItem(LOCAL_STORAGE_KEY.nickname, variables.name);

      return { prevMyInfo };
    },
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem(LOCAL_STORAGE_KEY.nickname, data.data.name);
    },

    // 에러가 발생했을 때 캐시값을 롤백
    onError: (error, variables, context) => {
      console.error(error, variables);
      queryClient.setQueryData([QUERY_KEY.myInfo], context?.prevMyInfo);
    },

    // 성공 실패 여부와 상관없이 강제로 fetch
    onSettled: (data, error, variables, context) => {
      console.log(data, error, variables, context);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
        exact: true,
      });
    },
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
