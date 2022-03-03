import React, { useEffect, useState } from "react";

import "../App.scss";

import { GamingChat } from "../components/Livechat/GamingChat/GamingChat";
import Livepeer from "../components/Livepeer";

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

  return (
    <main>
      <div style={{ display: "flex", height: "100vh", width: "100%" }}>
        <div style={{ width: "75%" }}>
          <Livepeer stream={stream} />
        </div>
        <GamingChat
          style={{ width: "30%" }}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
          setPopUpText={setPopUpText}
          setShowMembers={setShowMembers}
          setShowPopUp={setShowPopUp}
          setShowUpgrade={setShowUpgrade}
          showMembers={showMembers}
          showUpgrade={showUpgrade}
        />
      </div>
    </main>
  );
};

export default Livestream;
