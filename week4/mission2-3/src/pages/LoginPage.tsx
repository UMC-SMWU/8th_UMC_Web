import useForm from "../hooks/useForm";
import { LoginForm, validateLogin } from "../utils/validate";
import { postLogin } from "../api/AuthService";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

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

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          type="email"
          placeholder={"이메일"}
          className={`border border-[#ccc] w-[300px] p-[10px]
        focus:border-[#807bff] rounded-sm
        ${
          errors?.email && touched?.email
            ? "border-red-500 bg-red-200"
            : "border-gray-300"
        }`}
        />
        {errors?.email && touched?.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
        <input
          {...getInputProps("password")}
          type={"password"}
          placeholder={"비밀번호"}
          className={`border border-[#ccc] w-[300px] p-[10px]
            focus:border-[#807bff] rounded-sm
            ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
        />
        {errors?.password && touched?.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}
        <button
          className="w-full bg-black text-white p-[10px] rounded-sm hover:bg-[#807bff] transition-colors duration-200 disabled:bg-[#ccc]"
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
