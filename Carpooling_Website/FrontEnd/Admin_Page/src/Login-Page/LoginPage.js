import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonSubmit } from "./../Styled-Components/Button";
import { H2Blue, H6 } from "./../Styled-Components/Tags";
import { InputLogin } from "./../Styled-Components/TextBox";
import { WhiteContainer } from "./../Styled-Components/Container";
import { Toaster, toast } from "react-hot-toast";
import Axios from "axios";
import {
  SmallBlueCircle,
  SmallerBlueCircle,
  SmallRedCircle,
  SmallerRedCircle,
  RedReactangle1,
  RedRectangle2,
} from "./../Styled-Components/Ellipse";

function LoginPage() {
  const [User, setUser] = useState("");
  const [Pass, setPass] = useState("");
  let navigate = useNavigate();

  const handleLogin = async () => {
    await Axios.post("http://localhost:4000/", {
      User: User,
      Pass: Pass,
    }).then((response) => {
      toast(response.data.tokenMessage, {
        icon: "ℹ️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setTimeout(
        function () {
          navigate(response.data.link);
        }.bind(this),
        2000
      );
    });
  };
  document.body.style.backgroundColor = "#022C43";
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <SmallBlueCircle />
      <SmallerBlueCircle />
      <SmallRedCircle />
      <SmallerRedCircle />
      <RedReactangle1 />
      <RedRectangle2 />
      <WhiteContainer>
        <H2Blue>Welcome to Limni!</H2Blue>
        <H6>MAKING TRANSPORTATION EASY & SIMPLE</H6>
        <br></br>
        <br></br>
        <InputLogin
          type="text"
          name="User"
          placeholder="Username:"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
        />
        <br></br>
        <br></br>
        <InputLogin
          type="password"
          name="Pass"
          placeholder="Password:"
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <br></br>
        <br></br>
        <ButtonSubmit onClick={handleLogin}>Login</ButtonSubmit>
      </WhiteContainer>
    </>
  );
}

export default LoginPage;
