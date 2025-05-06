import { ResponseLpDetailDto } from "../types/lp";
import { axiosInstance } from "./axios"

export const getLpDetail = async (
    lpId: number
): Promise<ResponseLpDetailDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

    return data;
};
