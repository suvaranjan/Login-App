import React, { useEffect, useState } from "react";
import "../assets/styles/Username.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useAuthStore } from "../store/store";

export default function ProfileUpdate() {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
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

  const handleUpdate = () => {
    navigate("/update");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="box1">
        <h1 className="text-grey">Hii, {data.username}👋</h1>
        <p className="text-gray">Your Profile Information</p>
      </div>

      <div className="profilebox2">
        <div className="profilechild">
          Firstname :{" "}
          {data.firstname ? (
            <span className="profilespan">{data.firstname}</span>
          ) : (
            <span className="updatespan">Update Your firstname</span>
          )}
        </div>

        <div className="profilechild">
          Lastname :
          {data.lastname ? (
            <span className="profilespan">{data.lastname}</span>
          ) : (
            <span className="updatespan">Update Your Lastname</span>
          )}
        </div>

        <div className="profilechild">
          Phone :{" "}
          {data.phone ? (
            <span className="profilespan">{data.phone}</span>
          ) : (
            <span className="updatespan">Update Your Phone</span>
          )}
        </div>

        <div className="profilechild">
          Email :{" "}
          {data.email ? (
            <span className="profilespan">{data.email}</span>
          ) : (
            <span className="updatespan">Update Your Email</span>
          )}
        </div>

        <div className="profilechild">
          Address :
          {data.address ? (
            <span className="profilespan">{data.address}</span>
          ) : (
            <span className="updatespan">Update Your Address</span>
          )}
        </div>
        <div className="profilebutton">
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
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
