import React, { useEffect } from "react";
import "../assets/styles/Username.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signinSchema } from "../assets/schemas";
import { useAuthStore } from "../store/store";
import axios from "axios";

export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);

  const { errors, values, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: { username: "" },
      validationSchema: signinSchema,
      onSubmit: async (values, action) => {
        setUsername(values.username);
        const response = await axios.post(
          "http://localhost:3000/api/checkuser",
          {
            username: values.username,
          }
        );
        if (response.data.find) {
          navigate("/password");
        } else {
          alert(response.data.message);
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
          type="text"
          placeholder="Enter Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.username && touched.username ? (
          <p className="error">{errors.username}</p>
        ) : null}
        <button type="submit">Lets Go</button>
      </form>
      <div className="box3">
        <span className="small text-gray">
          Not a Member?{" "}
          <Link className="link" to="/register">
            Register Now
          </Link>
        </span>
      </div>
    </div>
  );
}
