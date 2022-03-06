import React from "react";
import styled from "styled-components"; 
import Background from "../../assets/images/Background.png";
const Container = styled.div`
  background-image: url(${Background});
  background-color:black;
  padding:0px 50px 50px 50px ;
  height:930px;
  margin:px 0 0 0;
`

const Huddle = ({ roomId }) => {
  return (
    <>
    <Container>
    <iframe
        allow="camera; microphone; fullscreen; display-capture; autoplay"
        src={`https://app.huddle01.com/room?roomId=${roomId}`}
        style={{ height: "80vh", width: "100%", border: "0px" }}
      ></iframe>
    </Container>

    </>
  );
};

export default Huddle;
