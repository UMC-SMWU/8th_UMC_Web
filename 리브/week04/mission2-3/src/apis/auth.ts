import { axiosInstance } from "./axios";
import {
  RequestSignupDto,
  ResponseSignupDto,
  RequestSigninDto,
  ResponseSigninDto,
  ResponseMyInfoDto,
} from "../types/auth";

// 회원가입 요청
export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post<ResponseSignupDto>("/v1/auth/signup", body);
  return data;
};

// 로그인 요청
export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post<ResponseSigninDto>("/v1/auth/signin", body);
  return data;
};

// 닉네임 중복 확인 요청
export const checkDuplicateName = async (
  name: string
): Promise<{ isExist: boolean }> => {
  const { data } = await axiosInstance.get<{ isExist: boolean }>(
    `/v1/auth/exists/name/${name}`
  );
  return data;
};

// 마이페이지 정보 가져오기
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get<ResponseMyInfoDto>("/v1/users/me");
  return data;
};


  
