import styled from "styled-components";

export const ButtonSubmit = styled.button`
  display: inline-block;
  background: #b90000;
  color: #fcfcfc;
  border-radius: 4px;
  border: none;
  text-align: center;
  font-size: 24px;
  width: 200px;
  height: 50px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 36px;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);
  position: relative;
  transition: 0.5s;

  &:after {
    content: "»";
    position: absolute;
    opacity: 0;
    right: -20px;
    transition: 0.3s;
  }

  &:hover {
    padding-right: 24px;
    padding-left: 8px;
  }

  &:hover:after {
    opacity: 1;
    right: 10px;
  }
`;

export const ButtonMenuItems = styled.button`
  display: inline-block;
  color: #fcfcfc;
  background-color: #1e1e1e;
  border-radius: 10px;
  border: none;
  align: center;
  font-size: 20px;
  width: 200px;
  height: 50px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 36px;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);
  position: relative;
  margin-left: -2px;
  transition: 0.5s;

  &:after {
    content: "»";
    position: absolute;
    opacity: 0;
    right: -20px;
    transition: 0.3s;
  }

  &:hover {
    padding-right: 24px;
    padding-left: 8px;
    background: #00b1ff;
  }

  &:hover:after {
    opacity: 1;
    right: 10px;
  }
`;

export const ButtonSubmitDriver = styled.button`
  display: inline-block;
  background: #b90000;
  color: #fcfcfc;
  border-radius: 4px;
  border: none;
  text-align: center;
  font-size: 20px;
  width: 200px;
  height: 50px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 36px;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);
  position: relative;
  transition: 0.5s;

  &:after {
    content: "📝";
    position: absolute;
    opacity: 0;
    right: -20px;
    transition: 0.3s;
  }

  &:hover {
    padding-right: 24px;
    padding-left: 8px;
  }

  &:hover:after {
    opacity: 1;
    right: 10px;
  }
`;
export const ButtonSubmitClient = styled.button`
  display: inline-block;
  background: #00b1ff;
  color: #fcfcfc;
  border-radius: 4px;
  border: none;
  text-align: center;
  font-size: 20px;
  width: 200px;
  height: 50px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 36px;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);
  position: relative;
  transition: 0.5s;

  &:after {
    content: "📝";
    position: absolute;
    opacity: 0;
    right: -20px;
    transition: 0.3s;
  }

  &:hover {
    padding-right: 24px;
    padding-left: 8px;
  }

  &:hover:after {
    opacity: 1;
    right: 10px;
  }
`;

export const ButtonCancel = styled.button`
  display: inline-block;
  background: #b90000;
  color: #fcfcfc;
  border-radius: 4px;
  border: none;
  text-align: center;
  font-size: 16px;
  width: 100px;
  height: 40px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 36px;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);
  position: relative;
  transition: 0.5s;

  &:after {
    content: "✘";
    position: absolute;
    opacity: 0;
    right: -20px;
    transition: 0.3s;
  }

  &:hover {
    padding-right: 24px;
    padding-left: 8px;
  }

  &:hover:after {
    opacity: 1;
    right: 10px;
  }
`;

export const ButtonConfirm = styled.button`
  display: inline-block;
  background: #00ff00;
  color: #fcfcfc;
  border-radius: 4px;
  border: none;
  text-align: center;
  font-size: 16px;
  width: 100px;
  height: 40px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 36px;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);
  position: relative;
  transition: 0.5s;

  &:after {
    content: "✔";
    position: absolute;
    opacity: 0;
    right: -20px;
    transition: 0.3s;
  }

  &:hover {
    padding-right: 24px;
    padding-left: 8px;
  }

  &:hover:after {
    opacity: 1;
    right: 10px;
  }
`;
