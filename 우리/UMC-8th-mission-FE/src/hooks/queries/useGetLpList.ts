import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
    return useQuery({
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn: () => getLpList({
            cursor,
            search,
            order,
            limit,
        }),
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
        // enabled: true // 쿼리 실행 여부 제어

        // 쿼리 요청이 실패했을 때 자동으로 재시도할 횟수 지정
        // retry: 3,

        // initalData: [], // 쿼리 요청이 성공했을 때 초기 데이터 설정
        // 컴포넌트 렌더링 시 안전하게 UI 구성할 수 있도록

        //praametr가 변경될 때 이전 데이터를 유지하여 UI 깜빡임을 줄여줌
        // 페이지네이션 시 페이지 전환 사이에 이전 데이터를 넣어 사용자 경험 향상
        // keepPreviousData: true,

        select: (data) => data.data,
    });
};

export default useGetLpList;
