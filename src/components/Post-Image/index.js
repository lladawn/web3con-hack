import React from "react";
import {
  Container,
  ImgWrapper,
  Img,
  Video,
  Title,
  Description,
  TextWrapper,
  OuterContainer,
} from "./elements";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./style.css";


const Post = ({ content, video, segment, index }) => {
  return (
    <>
      {video ? (
        <Link to={`/${segment}/${index}`}>
          <Container>
            {video ? (
              <ImgWrapper className="video">
                <Video
                  title="vimeo-player"
                  src={content.video}
                  // width="500"
                  // height="500"
                  frameBorder="0"
                  allowFullScreen
                ></Video>
              </ImgWrapper>
            ) : (
              <ImgWrapper>
                <Img src={content.img}></Img>
              </ImgWrapper>
            )}

            <TextWrapper>
              <Title>{content.title} </Title>
              <Description>{content.description}</Description>
            </TextWrapper>
            {/* <Button className="button"> Book a Call </Button> */}
          </Container>
        </Link>
      ) : null}
    </>
  );
};

export default Post;
