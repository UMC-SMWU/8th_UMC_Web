import useForm from "../hooks/useForm";
import { LoginForm, validateLogin } from "../utils/validate";
import Header from "../components/Header";
import InputField from "../components/InputField";
import GoogleLoginButton from "../components/GoogleLoginButton";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { usePostLogin } from "../hooks/mutations/useUser.ts";

export default function LoginPage() {
  const { accessToken } = useAuthContext();
  const navigate = useNavigate();
  const { values, errors, touched, getInputProps } = useForm<LoginForm>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const { mutate: postLogin } = usePostLogin(values.email, values.password);

  const handleSubmit = () => {
    postLogin({ email: values.email, password: values.password });
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value.length === 0);

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      <Header text="로그인" onClick={() => navigate(-1)} />
      <div className="flex flex-col gap-3">
        <GoogleLoginButton />
        <div className="flex items-center justify-center w-[300px] text-gray-300 py-4">
          <div className="w-full h-[1px] bg-gray-300" />
          <p className="px-10">OR</p>
          <div className="w-full h-[1px] bg-gray-300" />
        </div>
        <InputField
          type="email"
          placeholder="이메일을 입력해주세요!"
          error={errors?.email}
          touched={touched?.email}
          inputProps={getInputProps("email")}
        />
        <InputField
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          error={errors?.password}
          touched={touched?.password}
          inputProps={getInputProps("password")}
        />
        <SubmitButton
          text="로그인"
          onClick={handleSubmit}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}
