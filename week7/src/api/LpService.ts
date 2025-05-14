import { PaginationDto } from "../types/common";
import {
  RequestPostLpDto,
  ResponseDeleteLpDto,
  ResponseLikeDto,
  ResponseLpDetailDto,
  ResponseLpDto,
  ResponsePatchLpDto,
  ResponsePostLpDto,
} from "../types/lp";
import { axiosInstance } from "./axios";

export const getLps = async (
  paginationDto: PaginationDto,
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

export const postLike = async (lpId: number): Promise<ResponseLikeDto> => {
  const { data } = await axiosInstance.post(`v1/lps/${lpId}/likes`);
  return data;
};

export const deleteLike = async (lpId: number): Promise<ResponseLikeDto> => {
  const { data } = await axiosInstance.delete(`v1/lps/${lpId}/likes`);
  return data;
};

export const postLp = async (
  requestPostLpDto: RequestPostLpDto,
): Promise<ResponsePostLpDto> => {
  const { data } = await axiosInstance.post("v1/lps", requestPostLpDto);
  return data;
};

export const patchLp = async (
  lpId: number,
  requestPostLpDto: RequestPostLpDto,
): Promise<ResponsePatchLpDto> => {
  const { data } = await axiosInstance.patch(
    `v1/lps/${lpId}`,
    requestPostLpDto,
  );
  return data;
};

export const deleteLp = async (lpId: number): Promise<ResponseDeleteLpDto> => {
  const { data } = await axiosInstance.delete(`v1/lps/${lpId}`);
  return data;
};
