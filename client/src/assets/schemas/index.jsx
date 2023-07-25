import * as Yup from "yup";

export const signinSchema = Yup.object({
  username: Yup.string().min(2).required("Please enter your username"),
});

export const registerSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  username: Yup.string().min(2).max(10).required("Please enter your username"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    .matches(
      /^(?=.*[!@#$%^&*])/,
      "Password must contain at least one special character."
    ),
});

export const passwordSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    .matches(
      /^(?=.*[!@#$%^&*])/,
      "Password must contain at least one special character."
    ),
});

export const otpSchema = Yup.object({
  otp: Yup.number()
    .typeError("OTP must be a number")
    .integer("OTP must be an integer")
    .positive("OTP must be a positive number")
    .test("len", "The otp is 6 digits", (val) => val.toString().length === 6)
    .required("OTP is required"),
});

export const resetSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    .matches(
      /^(?=.*[!@#$%^&*])/,
      "Password must contain at least one special character."
    ),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const profileSchema = Yup.object().shape({
  firstname: Yup.string().required("firstname is required"),
  lastname: Yup.string().required("lastname is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
});

export default profileSchema;
