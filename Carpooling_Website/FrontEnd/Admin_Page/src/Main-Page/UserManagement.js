import React, { useState, useEffect } from "react";
import { H2, H3, H4 } from "../Styled-Components/Tags";
import { ButtonSubmit } from "../Styled-Components/Button";
import { BlackContainer } from "../Styled-Components/Container";
import Sidebar from "./SideBar";

//this hook saves what we did in a previous page
import { useNavigate } from "react-router-dom";
import Axios from "axios";
function UserManagement() {
  let navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:4000/settings", {}).then((response) => {
      console.log("response >>> ", response.data);
      navigate(response.data);
    });
  }, []);
  document.body.style.backgroundColor = "#000";
  return (
    <>
      <Sidebar />
      <BlackContainer>
        <H3>Choose what to modify</H3>
        <ButtonSubmit onClick={() => navigate("/client-customisation")}>
          Modify Client
        </ButtonSubmit>
        <ButtonSubmit onClick={() => navigate("/driver-customisation")}>
          Modify Driver
        </ButtonSubmit>
      </BlackContainer>
    </>
  );
}

export default UserManagement;
