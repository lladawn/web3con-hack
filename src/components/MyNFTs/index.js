import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NFT from "../../assets/images/Avatar.png";
import BouncrToken from "../../ethereum/BouncrToken";
import axios from "axios";
import Background from "../../assets/images/Background.png";
import Profile from "../../assets/images/Profile.png";

const Container = styled.div`
  padding: 100px 0 0 0;
  display: flex;
  background-color: black;
  flex-wrap: wrap;
  background-image: url(${Background});
  gap: 30px;

  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`;

const Profiles = styled.div`
  display: inline-block;
  margin: 80px 0 0 400px;
`;

const NFTs = styled.div`
  margin: 100px 0 0 300px;
  display: flex;
  flex-wrap: wrap;
  border-top: 2px solid white;
  border-bottom-width: 15px;
`;

const WalletAddress = styled.div`
  display: inline-block;
  color: white;
  font-size: 50px;
  font-weight: bold;
  margin: 170px 0 0 0px;
`;

export const Box = styled.div`
  background-color: white;
  height: 400px;
  width: 320px;

  border-radius: 20px;
  margin: 25px 0 0 20px;

  padding: 10px 0 0 0;
  /* box-shadow: 10px 10px 10px grey; */
  border: solid black 2px;
`;

const Feed = styled.div``;

export const ImageConatiner = styled.div`
  background-color: white;
  width: 300px;
  height: 350px;
  align-items: center;
  margin: 0px 0 0 10px;
`;

const Image = styled.image``;

export const Title = styled.h3`
  color: black;
  text-align: center;
  margin: -25px 0px 0px 30px;
`;

export const Button = styled.button`
  text-decoration: none;
  height: 40px;
  width: 100px;
  border-radius: 50px;
  color: white;
  background-color: #2180e2;
  align-content: center;
  justify-content: space-around;
  margin: -30px 0 0 90px;
  transition: 0.3s ease-in;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  &.selected {
    background-color: #25b04a;
    transform: scale(1.1);
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

const MyNFTs = ({ account, listCards }) => {
  const userAddress = `${account.slice(0, 6)}....${account.slice(-4)}`;

  return (
    <>
      <Container>
        <Profiles>
          <img src={Profile}></img>
        </Profiles>
        <WalletAddress>{userAddress}</WalletAddress>
        <NFTs>
          {listCards}
          {/* <Box>
            <ImageConatiner>
              <img src={NFT} width="100%"></img>
            </ImageConatiner>
            <div style={{ display: "flex" }}>
              <Title>Bouncr#1</Title>
              <Button>
                <a href="" target="_blank">
                  Opensea
                </a>
              </Button>
            </div>
          </Box> */}
        </NFTs>
      </Container>
    </>
  );
};

export default MyNFTs;
