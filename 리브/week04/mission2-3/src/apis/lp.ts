import { PaginationDto } from "../types/common.ts";
import { ResponseLpListDto } from "../types/lp.ts";
import { axiosInstance } from "./axios.ts";
import { ResponseLpDetailDto } from "../types/lp.ts";

export const getLpList = async (
 paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get<ResponseLpListDto>( "/v1/lps", {
   params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (id: number): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get<ResponseLpDetailDto>(`/v1/lps/${id}`);
  return data;
};
