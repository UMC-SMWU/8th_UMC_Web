import { axiosInstance } from "./axios.ts";
import { ResponseMyInfoDto } from "../types/auth.ts";

export const deleteUser = async (): Promise<void> => {
  return await axiosInstance.delete("/v1/users");
};

export const patchUser = async (requestPatchUserDto: {
  name: string;
  bio: string | null;
  avatar: string | null;
}): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.patch(`v1/users`, requestPatchUserDto);
  return data;
};
