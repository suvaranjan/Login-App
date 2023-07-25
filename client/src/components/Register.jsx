import React from "react";
import "../assets/styles/Username.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../assets/schemas";
import axios from "axios";
export default function Username() {
  const navigate = useNavigate();
  const { errors, values, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: { email: "", username: "", password: "" },
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/register",
            {
              username: values.username,
              email: values.email,
              password: values.password,
            }
          );
          alert("Registration successfull");
          navigate("/");
        } catch (error) {
          alert(error.message);
          console.log(error.message);
        }
      },
    });

  return (
    <div className="container">
      <div className="box1">
        <h1>Registration</h1>
        <p className="text-gray">Happy to join you</p>
      </div>
      <form className="box2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email ? (
          <p className="error">{errors.email}</p>
        ) : null}
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
        <input
          type="text"
          placeholder="Enter Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password ? (
          <p className="error">{errors.password}</p>
        ) : null}
        <button type="submit">Register</button>
      </form>
      <div className="box3">
        <span className="small text-gray">
          Already a Member?{" "}
          <Link className="link" to="/">
            Login Now
          </Link>
        </span>
      </div>
    </div>
  );
}
