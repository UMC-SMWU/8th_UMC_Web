import useForm from "../hooks/useForm";
import { LoginForm, validateLogin } from "../utils/validate";
import { postLogin } from "../api/AuthService";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import Header from "../components/Header";
import InputField from "../components/InputField";
import GoogleLoginButton from "../components/GoogleLoginButton";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );
  const { values, errors, touched, getInputProps } = useForm<LoginForm>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const handleSubmit = async () => {
    try {
      const response = await postLogin(values);
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value.length === 0);

  const navigate = useNavigate();

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
