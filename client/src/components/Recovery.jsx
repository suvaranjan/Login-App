import React, { useEffect } from "react";
import "../assets/styles/Username.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { otpSchema } from "../assets/schemas";
import { useAuthStore } from "../store/store";
import axios from "axios";

export default function Username() {
  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  const username = useAuthStore((state) => state.auth.username);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/forgotpassword",
        {
          username,
        }
      );
      console.log(`Your OTP is ${response.data.OTP}`);
    } catch (error) {
      console.error("Error fetching OTP:", error);
    }
  };

  const { errors, values, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: { otp: "" },
      validationSchema: otpSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/verifyotp",
            {
              username,
              otp: values.otp,
            }
          );
          alert(response.data.message);
          navigate("/reset");
        } catch (error) {
          alert("Invalid OTP!! Try Resend");
        }
      },
    });

  const handleResend = async () => {
    console.log("Resending Otp");
    try {
      const response = await axios.post("http://localhost:3000/api/resendotp", {
        username,
      });
      console.log(`Your new OTP is ${response.data.OTP}`);
    } catch (error) {
      console.error("Error fetching OTP:", error);
    }
  };

  return (
    <div className="container">
      <div className="box1">
        <h1>Recovery</h1>
        <p className="text-gray">Enter 6 digit otp sent to your mail</p>
      </div>
      <form className="box2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="OTP"
          name="otp"
          value={values.otp}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.otp && touched.otp ? (
          <p className="error">{errors.otp}</p>
        ) : null}
        <button type="submit">Recover</button>
      </form>
      <div className="box3">
        <span className="small text-gray">
          Can't get otp?
          <Link className="link" to="#" onClick={handleResend}>
            Resend Now
          </Link>
        </span>
      </div>
    </div>
  );
}
