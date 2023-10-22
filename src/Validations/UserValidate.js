import * as yup from "yup";

export const UserSchema = yup.object().shape({
  login: yup.string(),
  email: yup.string().email(),
  password: yup
    .string()
    .min(6, )
    .max(20, "Пароль должен содержать не более 20 символов")
    .matches(
      /[a-zA-Z]/,
      "Пароль должен содержать хотя бы одну английскую букву"
    )
    .matches(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
});
