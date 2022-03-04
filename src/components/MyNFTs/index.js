import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import NFT from "../images/unnamed.png";
import BouncrToken from "../../ethereum/BouncrToken";
import axios from "axios";

const Container = styled.div`
  margin: 0 0 0 200px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;

  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`;

const Box = styled.div`
  background-color: white;
  height: 400px;
  width: 320px;
  border-radius: 20px;
  margin: 25px 0 0 20px;
  padding: 10px 0 0 0;
  /* box-shadow: 10px 10px 10px grey; */
  border: solid black 2px;
`;

const ImageConatiner = styled.div`
  background-color: white;
  width: 300px;
  height: 350px;
  align-items: center;
  margin: 0px 0 0 10px;
`;

const Image = styled.image``;

const Title = styled.h3`
  color: black;
  text-align: center;
  margin: -25px 0px 0px 30px;
`;

const Button = styled.button`
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

const MyNFTs = ({ account }) => {
  const [listCards, setListCards] = useState([]);
  const run = async () => {
    try {
      const userAddress = account;
      console.log("user address: ", userAddress);
      const balance = await BouncrToken.methods
        .balanceOf(userAddress.toString())
        .call();

      console.log("Jor token balance: ", balance);

      let listOfCards = [];

      for (let i = 0; i < balance; i++) {
        const tokenId = await BouncrToken.methods
          .tokenOfOwnerByIndex(userAddress, i)
          .call();

        const tokenUri = await BouncrToken.methods.tokenURI(tokenId).call();
        console.log(tokenUri);

        const url = tokenUri;

        // const url =
        //   // `https://api.opensea.io/api/v1/asset/0x2E9983b023934e72e1E115Ab6AEbB3636f1C4Cbe/${tokenId}/`;
        //   `https://rinkeby-api.opensea.io/api/v1/asset/0xe8b533C9936eF21850B0Fa8C8F1114b164540039/${tokenId}/`;
        const { data } = await axios.get(url);
        console.log(data.image);

        let card = renderCard(
          `Bouncr#${tokenId}`,
          `https://testnets.opensea.io/assets/0xe8b533c9936ef21850b0fa8c8f1114b164540039/${tokenId}`,
          data.image
        );
        listOfCards.push(card);
      }
      setListCards(listOfCards);
    } catch (err) {
      console.log(err);
    }
  };

  const renderCard = (name, permalink, image) => {
    return (
      <Box key={permalink}>
        <ImageConatiner>
          <img src={image} width="100%"></img>
        </ImageConatiner>
        <div style={{ display: "flex" }}>
          <Title>{name}</Title>
          <Button>
            <a href={permalink} target="_blank">
              Opensea
            </a>
          </Button>
        </div>
      </Box>
    );
  };

  useEffect(() => {
    run();
  }, [account]);

  return (
    <>
      <Container>
        {/* <Box>
          <ImageConatiner>
            <img src={NFT} width="100%"></img>
          </ImageConatiner>
          <Title>JorrVichar Karvanu Ne MojMa Revanu</Title>
          <Button>Opensea</Button>
        </Box> */}
        {listCards}
      </Container>
    </>
  );
};

export default MyNFTs;
