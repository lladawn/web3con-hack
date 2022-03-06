import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  background-color: #1b1b1b;
  width: 1060px;
  height: 900px;
  border-radius: 20px;
  margin: auto;
  padding: 75px 0 0 60px;
`;

export const VideoWrapper = styled.div`
  // background-color: white;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  display: grid;
  gap: 20px;

  #player {
    width: 1000px;
    height: 500px;
  }
`;

export const TextWrapper = styled.div`
  // background-color: white;
  height: 200px;
  width: 920px;
  padding: 0 0 0 50px;
`;

export const Title = styled.h1`
  font-family: Roboto;
  font-size: 40px;
  font-weight: bold;
  text-align: left;
  color: white;
`;

export const PoapMinted = styled.h2`
  font-family: Roboto;
  font-size: 30px;
  text-align: center;
  color: white;
`;

export const Description = styled.p`
  font-size: 20px;
  color: grey;
  text-align: left;
`;
export const BackLink = styled(Link)`
  color: grey;
  text-decoration: none;
`;

export const MintPoap = styled.div`
  color: white;
  background: grey;
  width: 130px;
  height: 50px;
  padding: 10px;
  font-size: 20px;
  display: grid;
  align-content: center;
  justify-content: center;
  border-radius: 10px;
  margin: auto;

  &:hover {
    cursor: pointer;
  }
`;
