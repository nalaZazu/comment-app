import * as yup from "yup";

export const LoginValidation= yup.object({
  username: yup.string().required("Enter username"),
  password: yup.string().required("Enter password"),
});

export const SignUser = yup.object({
  firstname: yup.string().required("Enter First Name"),
  lastname: yup.string().required("Enter Last Name"),
  username: yup.string().required("Enter username"),
  password: yup.string().required("Enter password"),
});
