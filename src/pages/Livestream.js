import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../App.scss";
import Background from "../assets/images/Background.png"; 
import { GamingChat } from "../components/Livechat/GamingChat/GamingChat";
import Livepeer from "../components/Livepeer";

const ImageBg = styled.div`
background-image: url(${Background});
background-color:black;

`;



const Livestream = ({ stream }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [popUpText, setPopUpText] = useState("");
  const [showMembers, setShowMembers] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const popUpTimer = () => {
      setTimeout(() => {
        setShowPopUp(false);
        setPopUpText("");
      }, 3000);
    };
    if (showPopUp) popUpTimer();
  }, [showPopUp]);

  const Live = styled.div`
    background-color:grey;
    padding:20px;
    width: 923.5px;
    margin: 0 0 0px -450px;  
    height: 600px;
    background: #BFBFBF;
    border-radius: 45px;
  `
  const Chat = styled.div`
    height:960px; !important

    
    
  `

  return (
<ImageBg>
<main>

<Live>
<div style={{ width: "100%" }}>
   <Livepeer stream={stream} />
</div>
</Live>

<Chat>
<GamingChat
  style={{ width: "30%" }}
  setIsFullScreen={setIsFullScreen}
  setPopUpText={setPopUpText}
  setShowMembers={setShowMembers}
  setShowPopUp={setShowPopUp}
  setShowUpgrade={setShowUpgrade}
  showMembers={showMembers}
  showUpgrade={showUpgrade}
/>

</Chat>

</main>
</ImageBg>

  );
};

export default Livestream;
