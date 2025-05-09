import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

interface UpdateMyInfoDto {
  name: string;
  bio?: string;
  avatar?: string;
}

export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useAuth();

  return useMutation({
    mutationFn: async (data: UpdateMyInfoDto) => {
      const response = await axiosInstance.patch("/v1/users", data, {
        withCredentials: true,
      });
      return response.data;
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["myInfo"] });

      const previousUser = queryClient.getQueryData(["myInfo"]);

      queryClient.setQueryData(["myInfo"], (old: any) => ({
        ...old,
        data: {
          ...old?.data,
          name: newData.name,
          bio: newData.bio,
          avatar: newData.avatar,
        },
      }));

      if (setUser && user) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                name: newData.name,
                bio: newData.bio ?? null,
                avatar: newData.avatar ?? null,
              }
            : prev
        );
      }

      return { previousUser };
    },

    onError: (_err, _newData, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["myInfo"], context.previousUser);
      }
      toast.error("정보 수정 실패");
    },

    onSuccess: () => {
      toast.success("정보가 수정되었습니다!");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
};


