import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key.ts";
import { getMyInfo } from "../../api/AuthService.ts";

function useGetMyInfo(accessToken: string | null) {
  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    enabled: !!accessToken,
  });
}

export default useGetMyInfo;
