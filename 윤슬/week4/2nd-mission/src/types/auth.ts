import { CommonResponse } from "./common.ts";

// 회원 가입입
export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};

export type ResponseSignupDto = CommonResponse & {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// 로그인
export type RequestSigninDto = {
  email: string;
  password: string;
};
export type ResponseSigninDto = CommonResponse<{
  accessToken: string;
  refreshToken: string;
  id: number;
  name: string;
}>;

// 내 정보 조회
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;
