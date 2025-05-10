import { RequestLpDetailDto, RequestLpDto, RequestUpdateLpDto, ResponseLikeLpDto, ResponseLpDetailDto, ResponseLpDto } from "../types/lp";
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

export const postLp = async (
    {title, content, thumbnail, tags, published}: RequestLpDetailDto
): Promise<ResponseLpDto> => {
    const {data} = await axiosInstance.post(`/v1/lps`,
        {title, content, thumbnail, tags, published}
    );

    return data;
}

export const updateLp = async (
    {lpId, title, content, thumbnail, tags, published}: RequestUpdateLpDto
): Promise<ResponseLpDto> => {
    const {data} = await axiosInstance.patch(`/v1/lps/${lpId}`,
        {title, content, thumbnail, tags, published}
    );

    return data;
};

export const deleteLp = async (
    {lpId}: RequestLpDto
) => {
    const {data} = await axiosInstance.delete(`/v1/lps/${lpId}`);

    return data;
};
