import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function LogoutPage() {
  let navigate = useNavigate();

  Axios.get("http://localhost:4000/logout", {}).then((response) => {
    navigate(response.data);
  });

  const handleLogin = async () => {};
  document.body.style.backgroundColor = "#022C43";
  return (
    <>
      {handleLogin}
      <div></div>
    </>
  );
}

export default LogoutPage;
