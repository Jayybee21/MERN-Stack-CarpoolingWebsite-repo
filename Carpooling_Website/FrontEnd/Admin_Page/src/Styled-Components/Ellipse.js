import styled from "styled-components";

export const SmallBlueCircle = styled.div`
         
         width: 10%;
         height: 20%;
         background: #00b1ff;
         border-radius: 100%;
         position: absolute;
         margin-top: 22%;
         margin-left: 12%;
         z-index: 5;

         animation: MoveUpDown 12s linear infinite;
         @keyframes MoveUpDown {
        0%, 100% {
    transform: translateY(20px);
  }
  50% {
    transform: translateY(-20px);
  }
       `;
export const SmallerBlueCircle = styled.div`
  width: 5%;
  height: 10%;
  background: #00b1ff;
  border-radius: 100%;
  position: absolute;
  margin-top: 2%;
  margin-left: 78%;
  z-index: 5;
    animation: MoveUpDown 11s linear infinite;
       @keyframes MoveUpDown {
        0%, 100% {
    transform: translateY(17px);
  }
  50% {
    transform: translateY(-17px);
  }
`;
export const SmallRedCircle = styled.div`
  width: 10%;
  height: 20%;
  background: #b90000;
  border-radius: 100%;
  position: absolute;
  margin-left: 75%;
  margin-top: 20%;
  z-index: 5;

  animation: MoveUpDown 15s linear infinite;
       @keyframes MoveUpDown {
        0%, 100% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(-10px);
  }
`;
export const SmallerRedCircle = styled.div`
  width: 5%;
  height: 10%;
  background: #b90000;
  border-radius: 100%;
  position: absolute;
  margin-left: 15%;
  z-index: 5;
    animation: MoveUpDown 10s linear infinite;
       @keyframes MoveUpDown {
        0%, 100% {
    transform: translateY(20px);
  }
  50% {
    transform: translateY(-20px);
  }
`;
export const RedReactangle1 = styled.div`
  width: 30%;
  height: 30%;
  background: #b90000;
  border-radius: 175px;
  position: absolute;
  opacity: 50%;
  margin-left: 0%;
  margin-top: 0%;
  transform: rotate(135deg);
  z-index: 10;
`;
export const RedRectangle2 = styled.div`
  width: 30%;
  height: 30%;
  background: #b90000;
  border-radius: 175px;
  position: absolute;
  margin-left: 65%;
  margin-top: 18%;
  opacity: 50%;
  transform: rotate(135deg);
  z-index: 10;
`;
