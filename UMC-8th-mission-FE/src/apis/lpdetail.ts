import { LpComment, RequestCommentDto, RequestLpDto, ResponseLikeLpDto, ResponseLpDetailDto } from "../types/lp";
import { axiosInstance } from "./axios"

export const getLpDetail = async (
    lpId: number
): Promise<ResponseLpDetailDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

    return data;
};

export const postLike = async (
    {lpId}: RequestLpDto
): Promise<ResponseLikeLpDto> => {
    const {data} = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

    return data;
};

export const deleteLike = async (
    {lpId}: RequestLpDto
): Promise<ResponseLikeLpDto>  => {
    const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

    return data;
};
