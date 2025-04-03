export type LoginForm = {
  email: string;
  password: string;
};

function validateUser(data: LoginForm) {
  const errors = {
    email: "",
    password: "",
  };

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }
  if (!(data.password.length >= 8 && data.password.length <= 20)) {
    errors.password = "비밀번호는 8자 이상 20자 이하로 입력해야 합니다.";
  }

  return errors;
}

function validateLogin(values: LoginForm) {
  return validateUser(values);
}

export { validateLogin };
// validateSignin 함수를 사용하여 로그인 폼의 유효성을 검사합니다.
