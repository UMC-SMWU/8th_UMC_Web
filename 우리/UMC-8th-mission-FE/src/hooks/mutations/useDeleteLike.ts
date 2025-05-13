import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lpdetail";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDetailDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
    return useMutation({
        mutationFn: deleteLike,
        // onMutate -> API 요청 이전에 호출되는 친구
        // UI 에 바로 변경 보여주기 위해Cache 업데이트
        onMutate: async (lp) => {
            // 1. 게시글에 관련된 쿼리 취소 (캐시된 데이터를 새로 불러오는 요청)
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.lps, lp.lpId],
            });

            // 2. 현재 게시글의 데이터를 캐시에서 가져오기
            const prevLpPost = queryClient.getQueryData<ResponseLpDetailDto>([
                QUERY_KEY.lps, 
                lp.lpId
            ]);

            // 게시글 데이터를 복사해서 NewLpPost 라는 새로운 객체를 만들기
            // 복사하는 이유는 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위해서로 생각
            const newLpPost = {...prevLpPost};

            // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치 찾기
            const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
            const userId = Number(me?.data.id);

            const likedIndex = prevLpPost?.data.likes.findIndex(
                (like) => like.userId === userId,
            ) ?? -1;

            if (likedIndex>=0) {
                prevLpPost?.data.likes.splice(likedIndex, 1); // 내가 있는 위치를 찾아서 제거
            } else {
                const newLike = {userId, lpId: lp.lpId} as Likes;
                prevLpPost?.data.likes.push(newLike);
            }

            // 업데이트된 게시글 데이터를 캐시에 저장
            // UI 바로 럽데이트
            queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);
            
            return {prevLpPost, newLpPost};
        },

        onError: (error, newLp, context) => {
            console.log("error", error, newLp);
            queryClient.setQueryData(
                [QUERY_KEY.lps, newLp.lpId],
                context?.prevLpPost?.data.id,
            );
        },

        // onSettled 는 API 요청이 끝난 후 (성공 실패 모두 실행)
        // 서버 동기화
        onSettled: (data, error, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, variables.lpId],
                exact: true,
            });
        },
    });
}

export default useDeleteLike;
