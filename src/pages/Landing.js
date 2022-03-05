import React from 'react'; 
import styled from "styled-components";

import Background from "../assets/images/Background.png"; 
import Bouncers from "../assets/images/Bouncer.png";

export const ImageBg = styled.div`
background-image: url(${Background});
height:max;
background-color:black;
margin: 0 0 0 0 ;
height: 880px;
padding: 100px 0 0 0 ;
`;
export const Text = styled.div`
display: inline-block;
margin: 100px 0 0 -600px;

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

const Landing = () => {
    return (
            <ImageBg>
                <Text>
                    <Title> bouncr</Title>
                    <Description>An exclusive social media <br></br> For members only. </Description>
                </Text>
                <Bouncer src={Bouncers}>
                    
                    <img src={Bouncers} height="800px"  ></img>
                </Bouncer>
            </ImageBg>
            
    )
}

export default Landing
