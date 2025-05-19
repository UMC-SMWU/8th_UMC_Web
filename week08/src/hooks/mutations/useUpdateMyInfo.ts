import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyInfo } from "../../apis/auth";
import { ResponseMyInfoDto } from "../../types/auth";
import { QUERY_KEY } from "../../constants/key";

const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyInfo,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      const prevMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      if (prevMyInfo) {
        const optimisticMyInfo: ResponseMyInfoDto = {
          ...prevMyInfo,
          data: {
            ...prevMyInfo.data,
            ...variables,
          },
        };

        queryClient.setQueryData([QUERY_KEY.myInfo], optimisticMyInfo);
      }

      return { prevMyInfo };
    },

    onError: (err, variables, context) => {
      if (context?.prevMyInfo) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.prevMyInfo);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
        exact: true,
      });
    },
  });
};

export default useUpdateMyInfo;