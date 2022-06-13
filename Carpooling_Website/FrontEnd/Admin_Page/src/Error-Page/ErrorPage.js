import React from "react";
import { H6, H2White } from "./../Styled-Components/Tags";
import { TransparentContainer } from "./../Styled-Components/Container";

function ErrorPage() {
  document.body.style.backgroundColor = "#022C43";
  return (
    <>
      <TransparentContainer>
        <img src={require("./Images/404_Img.png")} alt="error" />
      </TransparentContainer>
    </>
  );
}

export default ErrorPage;
