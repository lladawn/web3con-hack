import React from "react";
import {
  MaxContainer,
  Container,
  ImgWrapper,
  Img,
  WatchNow,
  Title,
  Description,
  TextWrapper,
} from "./elements";
import { Button } from "react-bootstrap";

import "./style.css";


var Video = "https://player.vimeo.com/video/578227462?h=a04379fb42";

const PostV = ({ content, segment, index }) => {
  return (
    <MaxContainer>
      <Container>
        <TextWrapper>
          <Title> {content.title} </Title>
          <Description>{content.description}</Description>
          <WatchNow to={`${segment}/${index}`}>Watch Now</WatchNow>

          {/* <Button className="button"> Book a Call </Button> */}
        </TextWrapper>
        <ImgWrapper>
          <iframe
            title="vimeo-player"
            src={content.video}
            width="500"
            height="500"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </ImgWrapper>
      </Container>
    </MaxContainer>
  );
};

export default PostV;
