import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Signup from "../components/Signup/Signup";
import Login from "../components/Login/Login";
import { LoggedIn } from "./logged-in";
import { ProtectedRoute } from "./protected";

const Router = () => {
  return (
    <Routes>
      <Route element={<LoggedIn />}>
        <Route path="" element={<Signup />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export { Router };
