import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import { RequestSigninDto, ResponseSigninDto } from "../../types/auth";

export const useLogin = () => {
  return useMutation<ResponseSigninDto, Error, RequestSigninDto>({
    mutationFn: (body) => postSignin(body),
  });
};

