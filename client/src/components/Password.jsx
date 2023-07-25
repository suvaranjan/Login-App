import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { passwordSchema } from "../assets/schemas";
import { useAuthStore } from "../store/store";
import axios from "axios";

export default function Password() {
  const username = useAuthStore((state) => state.auth.username);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { password: "" },
      validationSchema: passwordSchema,
      onSubmit: async (values) => {
        try {
          const response = await axios.post("http://localhost:3000/api/login", {
            username: username,
            password: values.password,
          });

          if (response.status === 200 && response.data.token) {
            const accessToken = response.data.token;
            localStorage.setItem("accessToken", accessToken);

            setAccessToken(accessToken);
            alert("Login Successfull");

            navigate("/profile");
          } else {
            alert("An Error Occured");
          }
        } catch (error) {
          alert("Username and Password Not Found");
          navigate("/");
        }
      },
    });

  return (
    <div className="container">
      <div className="box1">
        <h1>Sign In</h1>
        <p className="text-gray">Explore more by connecting with us</p>
      </div>
      <form className="box2" onSubmit={handleSubmit}>
        <input
          type="password" // Use type="password" for secure password input
          placeholder="Enter Password"
          autoComplete="new-password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password ? (
          <p className="error">{errors.password}</p>
        ) : null}
        <button type="submit">Sign In</button>
      </form>
      <div className="box3">
        <span className="small text-gray">
          Forgot Password?{" "}
          <Link className="link" to="/recovery">
            Recover Now
          </Link>
        </span>
      </div>
    </div>
  );
}
