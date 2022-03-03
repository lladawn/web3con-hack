import React, { useState, useEffect } from "react";
import styled from "styled-components";
import VideoJS from "../VideoJS"; // point to where the functional component is stored
import axios from "axios";

const Container = styled.div`
  display: grid;
  max-height: 80vh !important;
`;

const Title = styled.div`
  font-size: 25px;
  text-align: center;
  margin: 15px;
`;

const Livepeer = ({ stream }) => {
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [playbackId, setPlaybackId] = useState("");

  const playerRef = React.useRef(null);

  const fetchPlaybackId = async () => {
    try {
      const url = `https://livepeer.com/api/stream/e42bd9b4-3d01-4a93-bce6-92c54cdb22e1`;
      const options = {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      };
      const { data } = await axios.get(url, options);
      console.log(data);
      setIsStreamActive(data.isActive);
      setPlaybackId(data.playbackId);
    } catch (err) {
      if (err) console.log(err);
    }
  };

  useEffect(() => {
    fetchPlaybackId();
  }, []);

  const videoJsOptions = {
    // lookup the options in the docs for more options
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    height: 10,
    width: 10,
    sources: [
      {
        // src: stream
        //   ? stream.isActive
        //     ? `https://cdn.livepeer.com/hls/${stream.playbackId}/index.m3u8`
        //     : null
        //   : null,
        // src: "https://cdn.livepeer.com/hls/0b5881im2l3kb68f/index.m3u8",
        src: "https://cdn.livepeer.com/recordings/e42bd945-bfa4-4320-a769-da5010368ac4/index.m3u8",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <Container>
      <Title>AMA Session</Title>
      {/* {stream.isActive ? (
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      ) : (
        <Title>No live session going on...</Title>
      )} */}
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </Container>
  );
};

export default Livepeer;
