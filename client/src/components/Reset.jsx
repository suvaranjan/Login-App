import React from "react";
import "../assets/styles/Username.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { resetSchema } from "../assets/schemas";
import axios from "axios";
import { useAuthStore } from "../store/store";

export default function Username() {
  const navigate = useNavigate();
  const username = useAuthStore((state) => state.auth.username);
  const { errors, values, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: { password: "", confirmpassword: "" },
      validationSchema: resetSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/resetpassword",
            {
              username: username,
              password: values.password,
              confirmpassword: values.confirmpassword,
            }
          );
          alert(response.data.message);
          navigate("/password");
        } catch (error) {
          console.log(error);
        }
      },
    });

  return (
    <div className="container">
      <div className="box1">
        <h1>Reset</h1>
        <p className="text-gray">Enter new password</p>
      </div>
      <form className="box2" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="password"
          name="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.password && touched.password ? (
          <p className="error">{errors.password}</p>
        ) : null}
        <input
          type="password"
          placeholder="confirm password"
          name="confirmpassword"
          value={values.confirmpassword}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.confirmpassword && touched.confirmpassword ? (
          <p className="error">{errors.confirmpassword}</p>
        ) : null}
        <button type="submit">Reset</button>
      </form>
      <div className="box3">
        <span className="small text-gray">
          Already reset?
          <Link className="link" to="/">
            Login Now
          </Link>
        </span>
      </div>
    </div>
  );
}
