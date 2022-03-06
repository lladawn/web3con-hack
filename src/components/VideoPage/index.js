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
import axios from "axios";
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

  function myfetch(url, options, timeout = 7000) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeout)
      ),
    ]);
  }

  async function mintNFT() {
    setMinted(true);
    setLoading(true);
    // const data = JSON.stringify({
    //   name: name,
    //   address: address,
    //   url: "https://www.youtube.com/watch?v=5xYDXp7fkY4", //videoURL,
    // });

    // const url = `https://nft-yt-backend.prathamprasoon.repl.co/mint`;
    // const options = {
    //   // Adding method type
    //   method: "POST",
    //   // Adding body or contents to send
    //   body: data,
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // };
    // try {
    //   const res = await axios.post(url, options);
    //   console.log(res);
    //   if (res) {
    //     console.log("Minted");
    //     setLoading(false);
    //   }
    // } catch (err) {
    //   alert("Failing to fetch the api");
    // }
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
    // console.log(total_time);
    const title = player.getVideoData().title;
    // console.log("title", title);
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

  // function handleData(data) {
  //   if (data.length != 42) {
  //     window.alert("Please enter valid wallet address");
  //   } else {
  //     console.log("address: ", data);
  //     setAddress(data);
  //   }
  //   setMinted(false);
  // }

  React.useEffect(() => {
    window.YT.ready(onYouTubeIframeAPIReady);
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
          {/* <iframe
            title="vimeo-player"
            src={content ? content.video : null}
            width="1000"
            height="500"
            border-radius="20px"
            frameBorder="0"
            allowFullScreen
          ></iframe> */}
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
          <Description>
            {/* The stakes are higher as Ms. Stoner's ailments worsen and the cat's
            sentience fades. Fefe tries to get her paws on more Skunky Smoke
            while Baxter discovers a mysterious world and Dave meets a new
            friend.{" "} */}
            {content.description}
          </Description>
        </TextWrapper>
      </Container>
    </div>
  );
};

export default Videopage;
