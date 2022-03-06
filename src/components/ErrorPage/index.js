import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Bouncers from "../../assets/images/Bouncer.png";
import Background from "../../assets/images/Background.png";
const Container = styled.div`
background-image: url(${Background});
height:max;
background-color:black;
margin: 0 0 0 0 ;
height: 880px;
padding: 100px 0 0 0 ;
`;

export const Text = styled.div`
display: inline-block;
margin: 100px 0 0 -900px;
position:fixed;

`; 

export const Description = styled.h3`
    color:white;
    font-size:50px;
    margin: -80px 0 0 0 ;
`; 


export const Bouncer = styled.div`
position:fixed;
display:inline;
margin: 75px 0 0 100px;

`; 
export const Title = styled.h1`
    color:white;
    font:roboto;
    font-size:150px;


`;

const Button = styled.button`
text-decoration: none;
height: 80px;
width: 300px;
border-radius: 50px;
color: black;
font-size:50px;

border: 1px solid white;
display: grid;
align-content: center;
margin: 0px 0px;
transition: 0.3s ease-in;
margin: 20px 0 0 300px;

&:hover {
  transform: scale(1.1);
  cursor: pointer;
  background-color: black;
  color:white;
}

&.selected {
  background-color: #25b04a;
  transform: scale(1.1);
}
`



const ErrorPage = ({ text }) => {
  return (
    <>
      <Container>
      <Text>
                    <Title> Don't Fool the <br></br> Bouncr</Title>
                    <Description> You need to be part of the cool club first </Description>
                    <Button><a href="https://testnets.opensea.io/collection/bouncrnft-v2?search[sortAscending]=true&search[sortBy]=PRICE&search[toggles][0]=BUY_NOW" target="_blank" rel="noopener noreferrer">OpenSea</a> </Button>
        </Text>
      <Bouncer src={Bouncers}>
                    
                    <img src={Bouncers} height="800px"  ></img>
                </Bouncer>
      </Container>
    </>
  );
};

export default ErrorPage;
