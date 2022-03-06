import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  font-size: 35px;
  margin-top: 40px;
  color: yellow;
`;

const ErrorPage = ({ text }) => {
  return (
    <>
      <Container>{text}</Container>
      <Container>Error: 404 NOT FOUND or LOCKED</Container>
    </>
  );
};

export default ErrorPage;
