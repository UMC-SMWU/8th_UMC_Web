import { PaginationDto } from "../types/common";
import { LpComment, RequestCommentDto, ResponseCommentDto, ResponseLpCommentListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpCommentList = async (
    lpId: number, paginationDto: PaginationDto
): Promise<ResponseLpCommentListDto> => {
    const { cursor, limit, order } = paginationDto;

    const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
        params: {cursor, limit, order},
    });

    return data;
}

export const postComment = async (
    {lpId, content}: RequestCommentDto,
): Promise<ResponseCommentDto> => {
    const {data} = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
        content,
    });

    return data;
};
