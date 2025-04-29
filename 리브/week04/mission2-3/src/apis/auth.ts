import { 
  RequestSignupDto, 
  ResponseSignupDto, 
  RequestSigninDto, 
  ResponseSigninDto,
  ResponseMyInfoDto
 } from "../types/auth.ts";
import { axiosInstance } from "./axios.ts";

export const postSignup=async (
  body: RequestSignupDto,
):Promise<ResponseSignupDto>=> {
  const {data} =await axiosInstance.post("/v1/auth/signup", body);

  return data as ResponseSignupDto;
};

export const postSignin=async (
  body: RequestSigninDto,
):Promise<ResponseSigninDto>=> {
  const {data} =await axiosInstance.post("/v1/auth/signin", body);

  return data as ResponseSigninDto;
};

export const getMyInfo=async ():Promise<ResponseMyInfoDto>=> {
  const {data} =await axiosInstance.get("/v1/users/me", {
  });

  return data as ResponseMyInfoDto;
};

export const postLogout=async ()=> {
  const {data} =await axiosInstance.post("/vl/auth/signout");
  
  return data;
}

  
