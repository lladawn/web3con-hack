import styled from "styled-components";

export const OuterContainer = styled.div``;

export const Container = styled.div`
  height: 400px;
  width: 290px;
  color: white;
  /* display: flex;
  flex-direction: column; */
  display: grid;
  margin: 20px 50px;

  display: inline-block;
  justify-items: center;

  background-color: #1b1b1b;
  border-radius: 25px;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    position: relative;
  }
`;

export const ImgWrapper = styled.div`
  /* display: center; */
  width: 300px;
  height: 190px;
  margin: auto;
  display: grid;
  background-color: #1b1b1b;
  justify-content: center;
  border-radius: 10px;
`;

export const TextWrapper = styled.div`
  max-width: 300px;
`;

export const Img = styled.img`
  margin: auto;
  max-width: 100%;
`;

export const Title = styled.h1`
  font-family: Roboto;
  font-size: 30px;

  font-weight: bold;
  font-style: normal;
  text-align: center;
  color: white;
  margin: 10px 0 0 0;
`;

export const Description = styled.p`
  font-size: 12px;
  color: grey;
  text-align: center;
  margin: 10px 0 0 0;
  padding: 0 10px 0 10px;
`;

export const Video = styled.iframe`
  display: grid;
  align-self: center;
  justify-self: center;
  width: 300px;
`;
