import { useMutation } from "@tanstack/react-query";
import { RequestSigninDto } from "../../types/auth";
import { postLogout, postSignin } from "../../apis/auth";

export function useLogin() {
    return useMutation({
        mutationFn: (signinData: RequestSigninDto) => postSignin(signinData),
    });
};

export function useLogout() {
    return useMutation({
        mutationFn: () => postLogout(),
    });
}