import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../apis/auth";

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 5, 
  });
};
