import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string("email must be a valid email address")
    .required("email is required")
    .email("email must be a valid email address")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      { message: "Please enter a valid email address" }
    ),
  password: Yup.string()
    .required("password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
});

export const registerSchema = Yup.object().shape({
  fullname: Yup.string("fullname").required("fullname is required"),
  email: Yup.string("email must be a valid email address")
    .required("email is required")
    .email("email must be a valid email address")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      { message: "Please enter a valid email address" }
    ),
  password: Yup.string("password must a string")
    .required("password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
  cpassword: Yup.string("confirm password must a string")
    .required("confirm password is required")
    .oneOf([Yup.ref("password"), null], "passwords must match"),
});
