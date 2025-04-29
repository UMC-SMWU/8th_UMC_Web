import { PaginationDto } from "../types/common";
import { ResponseLpDetailDto, ResponseLpDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLps = async (
  paginationDto: PaginationDto
): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get("v1/lps", {
    params: paginationDto,
  });
  return data;
};

export const getLpById = async (lpId: number): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`v1/lps/${lpId}`);
  return data;
};
