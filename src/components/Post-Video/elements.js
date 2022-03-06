import { Link } from "react-router-dom";
import styled from "styled-components";

export const MaxContainer = styled.div`
  width: 100vw;
`;

export const Container = styled.div`
  height: 500px;
  width: 1080px;
  color: white;
  background-color: #1b1b1b;
  border-radius: 25px;
  margin-top: 20px;
  margin: 30px auto;
`;

export const ImgWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  margin: 0 0 0 500px;
`;

export const TextWrapper = styled.div`
  max-width: 600px;
  align-items: right;
  padding: 10px 0 0 0;
  position: absolute;
  display: grid;
`;

export const Img = styled.img`
  padding-right: 0;
  border: 0;
  margin: 0 0 0 100px;
  width: 100%;
`;

export const Title = styled.h1`
  font-family: Roboto;
  font-size: 45px;
  width: 350px;
  font-weight: bold;
  font-style: normal;
  text-align: left;
  color: white;

  margin: 100px 0 0 100px;
`;

export const Description = styled.p`
  font-size: 15px;
  color: grey;
  width: 250px;
  position: relative;
  text-align: left;
  margin: 20px 0 0 0;
  padding: 0 10px 0 100px;
`;

export const WatchNow = styled(Link)`
  /* height: 50px; */
  width: fit-content;
  padding: 5px 10px;
  background-color: #26b14b;
  border-radius: 5px;
  outline: none;
  color: white;
  text-align: center;
  font-size: 20px;
  margin: 20px 0 0 100px;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;
