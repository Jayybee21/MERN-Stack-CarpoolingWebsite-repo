import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { elastic as Menu } from "react-burger-menu";
import { ButtonMenuItems } from "../Styled-Components/Button";

import "./SideBar.css";
import toast from "react-hot-toast";
import { Axios } from "axios";

function SideBar() {
  let navigate = useNavigate();
  let currentUser = "";

  document.body.style.backgroundColor = "#000";
  return (
    <Menu>
      <p>{currentUser}</p>
      <hr></hr>
      <ButtonMenuItems onClick={() => navigate("/dashboard")}>
        Dashboard
      </ButtonMenuItems>
      <ButtonMenuItems onClick={() => navigate("/user-management")}>
        User Management
      </ButtonMenuItems>
      <ButtonMenuItems onClick={() => navigate("/logout")}>
        Logout
      </ButtonMenuItems>
    </Menu>
  );
}

export default SideBar;
