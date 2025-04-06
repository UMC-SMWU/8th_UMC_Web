export interface RequestSignupDto {
    email: string;
    password: string;
    name: string;
  }
  
  export interface ResponseSignupDto {
    id: number;
    email: string;
    name: string;
  }
  
  export interface RequestSigninDto {
    email: string;
    password: string;
  }
  
  export interface ResponseSigninDto {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface ResponseMyInfoDto {
    email: string;
    name: string;
  }
  
  