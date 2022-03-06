import React from "react";

const Huddle = ({ roomId }) => {
  return (
    <>
      <iframe
        allow="camera; microphone; fullscreen; display-capture; autoplay"
        src={`https://app.huddle01.com/room?roomId=${roomId}`}
        style={{ height: "80vh", width: "100%", border: "0px" }}
      ></iframe>
    </>
  );
};

export default Huddle;
