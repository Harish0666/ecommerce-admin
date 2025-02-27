// src/components/AdminLayout.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import NavBar from "./NavBar";
const AdminLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="" style={{ width: "100%", height: "100vh" }}>
        <div className="row p-5 m-5" style={{ height: "auto" }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
