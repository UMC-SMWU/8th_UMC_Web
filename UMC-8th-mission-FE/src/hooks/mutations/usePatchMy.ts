import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";
import { patchMyInfo } from "../../apis/auth";
import { ResponseMyInfoDto } from "../../types/auth";

function usePatchMy () {
    return useMutation({
        mutationFn: patchMyInfo,
        onMutate: async (variables) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.myInfo],
            });

            const prevMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([
                QUERY_KEY.myInfo
            ]);

            if (prevMyInfo) {
                 // 새로운 객체를 생성하여 기존 데이터와 variables를 병합합니다.
                 // patch 요청이므로 variables에는 일부 필드만 있을 수 있습니다.
                 // variables의 필드명과 prevMyInfo.data의 필드명이 일치해야 합니다.
                const optimisticMyInfo = {
                    ...prevMyInfo,
                    data: {
                        ...prevMyInfo.data, // 기존 데이터 유지
                        ...variables,     // 새로운 데이터로 덮어씌우기 (name, bio 등)
                         // 만약 avatar가 File 객체로 전달된다면, Optimistic Update 시에는 임시 URL 등을 사용해야 합니다.
                         // 문자열 (URL) 형태로 전달된다면 바로 사용 가능합니다.
                         // 마이페이지 편집에서 논의했듯이, 파일 업로드는 별도 API가 필요할 수 있습니다.
                         // 여기서는 variables에 name, bio 등 문자열 값만 포함된다고 가정합니다.
                         // 만약 아바타 URL도 variables에 있다면: avatar: variables.avatar ?? prevMyInfo.data.avatar,
                    }
                }
                queryClient.setQueryData([QUERY_KEY.myInfo], optimisticMyInfo);
            };

            return {prevMyInfo};
        },

        onError: (error, variables, context) => {
            console.log("error", error, variables);
            queryClient.setQueryData(
                [QUERY_KEY.myInfo],
                context?.prevMyInfo
            );
        },

        onSettled: (data, error, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.myInfo],
                exact: true,
            });
        },
    })
    // return useMutation({
    //     mutationFn: patchMyInfo,
    //     onSuccess: (data) => {
    //     console.log("내 정보 수정 성공", data);
    //     queryClient.invalidateQueries({
    //         queryKey: [QUERY_KEY.myInfo],
    //     });
    //     },
    // });
};

export default usePatchMy;
