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
    errors.email = "올바른 이메일 형식을 입력해주세요.";
  }

  switch (true) {
    case data.email.length < 8:
      errors.email = "이메일은 8자 이상이어야 합니다.";
      break;
    case data.email.length > 20:
      errors.email = "이메일은 20자 이하이어야 합니다.";
      break;
  }

  return errors;
}

function validateLogin(values: LoginForm) {
  return validateUser(values);
}

export { validateLogin };
// validateSignin 함수를 사용하여 로그인 폼의 유효성을 검사합니다.
