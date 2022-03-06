import React, { useState, useEffect } from "react";
import {
  Container,
  VideoWrapper,
  Title,
  Description,
  TextWrapper,
  BackLink,
  MintPoap,
  PoapMinted,
} from "./videopageelements";
// import axios from "axios";
import PoapNFT from "../../ethereum/PoapNFT";

const Videopage = ({ content, segment, account }) => {
  const [videoURL, setvideoURL] = React.useState(content.v);
  const [address, setAddress] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [watchedVideo, setwatchedVideo] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [name, setName] = React.useState("");
  const [minted, setMinted] = React.useState(false);
  const [poapMinted, setPoapMinted] = useState(false);

  let videolength = 0;
  let watchLength = 0;

  // function myfetch(url, options, timeout = 7000) {
  //   return Promise.race([
  //     fetch(url, options),
  //     new Promise((_, reject) =>
  //       setTimeout(() => reject(new Error("timeout")), timeout)
  //     ),
  //   ]);
  // }

  async function mintNFT() {
    setMinted(true);
    setLoading(true);

    console.log("Minting");
    await PoapNFT.methods.mintPoap().send({ from: account, gas: "210000" });
    setPoapMinted(true);
  }

  var player;
  function onYouTubeIframeAPIReady() {
    player = new window.YT.Player("player", {
      height: "390",
      width: "640",
      videoId: segment === "Silver" ? "5xYDXp7fkY4" : content.video.slice(30),
      // videoId: "5xYDXp7fkY4",
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  function onPlayerReady(event) {
    var total_time = player.getDuration();
    const title = player.getVideoData().title;
    setName(title);
    videolength = parseInt(total_time);
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    const current_time = player.getCurrentTime();
    // console.log(videolength, current_time, watchLength);
    if (current_time - watchLength > 10) {
      player.seekTo(watchLength, true);
      setTimeout(() => {
        onPlayerStateChange();
      }, 200);
    } else if (videolength - current_time < 2) {
      setwatchedVideo(true);
      watchLength = current_time;
      console.log("Video watched");
      setTimeout(stopVideo, 500);
    } else if (current_time - watchLength < 10) {
      //   console.log("less than 10");
      watchLength = current_time;
      setTimeout(() => {
        onPlayerStateChange();
      }, 200);
    }
  }

  function stopVideo() {
    player.stopVideo();
  }

  React.useEffect(() => {
    try {
      window.YT.ready(onYouTubeIframeAPIReady);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchPoapBalance = async () => {
    const poapBalance = await PoapNFT.methods
      .balanceOf(account.toString())
      .call();
    // console.log("poap balance: ", poapBalance);
    if (poapBalance > 0) setPoapMinted(true);
    // console.log("poap minted: ", poapMinted);
  };

  useEffect(() => {
    fetchPoapBalance();
  }, []);

  return (
    <div>
      <Container>
        <VideoWrapper>
          <div className="mt-10" id="player"></div>
          {watchedVideo ? (
            !poapMinted ? (
              <MintPoap onClick={mintNFT}>Claim POAP</MintPoap>
            ) : (
              <PoapMinted>POAP has been claimed! Hurrah ;)</PoapMinted>
            )
          ) : null}
        </VideoWrapper>
        <TextWrapper>
          <Description>
            <BackLink to={`/${segment}`}>← Back to Episodes</BackLink>
          </Description>
          <Title> {content.title} </Title>
          <Description>{content.description}</Description>
        </TextWrapper>
      </Container>
    </div>
  );
};

export default Videopage;
