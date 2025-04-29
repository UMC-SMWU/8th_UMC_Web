import { BaseResponse } from "./common";

export type RequestLoginDto = {
  email: string;
  password: string;
};

export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};

export type ResponseLoginDto = BaseResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

export type ResponseMyInfoDto = BaseResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

export type ResponseSignupDto = BaseResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;
