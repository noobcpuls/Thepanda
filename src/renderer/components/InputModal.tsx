import React from "react";
import styled from "styled-components";

interface InputModal {}

export default function InputModal() {
  return <ModalDiv></ModalDiv>;
}

const ModalDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background: ${(props) => props.theme.colors.brand2.main};
`;
