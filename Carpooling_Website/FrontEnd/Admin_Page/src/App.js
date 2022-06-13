import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Login-Page/LoginPage";
import Dashboard from "./Main-Page/Dashboard";
import UserManagement from "./Main-Page/UserManagement";
import LogoutPage from "./Main-Page/LogoutPage";
import ClientCustomisation from "./Main-Page/ClientCustomisation";
import DriverCustomisation from "./Main-Page/DriverCustomisation";
import ErrorPage from "./Error-Page/ErrorPage";

//import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/logout" exact element={<LogoutPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/client-customisation" element={<ClientCustomisation />} />
        <Route path="/driver-customisation" element={<DriverCustomisation />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
