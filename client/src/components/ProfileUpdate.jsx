import React from "react";
import { useState, useEffect } from "react";
import "../assets/styles/Username.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { profileSchema } from "../assets/schemas";
import axios from "axios";

export default function ProfileUpdate() {
  const [data, setData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error accessing protected route:", error);
      });
  }, []);

  const { errors, values, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        firstname: data.firstname || "",
        lastname: data.lastname || "",
        phone: data.phone || "",
        email: data.email || "",
        address: data.address || "",
      },
      enableReinitialize: true,
      validationSchema: profileSchema,
      onSubmit: async (values) => {
        try {
          const response = await axios.put(
            "http://localhost:3000/api/profile",
            {
              firstname: values.firstname,
              lastname: values.lastname,
              phone: values.phone,
              email: values.email,
              address: values.address,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          alert(response.data);
          navigate("/profile");
        } catch (error) {
          alert("Server Error");
          console.log(error.message);
        }
      },
    });

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="box1">
        <h1>Profile</h1>
        <p className="text-gray">Update Your Information</p>
      </div>
      <form className="box2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Firstname"
          name="firstname"
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.firstname && touched.firstname ? (
          <p className="error">{errors.firstname}</p>
        ) : null}
        <input
          type="text"
          placeholder="Lastname"
          name="lastname"
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.lastname && touched.lastname ? (
          <p className="error">{errors.lastname}</p>
        ) : null}
        <input
          type="text"
          placeholder="Mobile Num"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.phone && touched.phone ? (
          <p className="error">{errors.phone}</p>
        ) : null}
        <input
          type="text"
          placeholder="Email"
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
          placeholder="Address"
          name="address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.address && touched.address ? (
          <p className="error">{errors.address}</p>
        ) : null}
        <button type="submit">Save</button>
      </form>
      <div className="box3">
        <span className="small text-gray">
          Comeback Later?{" "}
          <Link className="link" to="#" onClick={handleLogout}>
            Logout
          </Link>
        </span>
      </div>
    </div>
  );
}
