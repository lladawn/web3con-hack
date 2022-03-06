import axios from "axios";
import React, { useState, useEffect } from "react";
import Post from "../components/Post-Image";
import PostV from "../components/Post-Video";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;
`;

const Segment = ({ segment }) => {
  const [contents, setcontents] = useState([]);
  const fetchContents = async () => {
    const url = `https://buildit-tier.kraznikunderverse.com/api/${segment}`;
    const options = {
      validate: "alpha romeo tango",
    };
    const { data } = await axios.post(url, options);
    console.log(data.data);
    setcontents(data.data);
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return (
    <Container>
      {contents
        .map((content, index) => {
          if (index == contents.length - 1) {
            return (
              <PostV
                key={index}
                content={content}
                segment={segment}
                index={index}
              />
            );
          }
          if (content.img !== "") {
            return (
              <Post
                key={index}
                content={content}
                video={false}
                segment={segment}
                index={index}
              />
            );
          } else if (content.video !== "") {
            return (
              <Post
                key={index}
                content={content}
                video={true}
                segment={segment}
                index={index}
              />
            );
          }
        })
        .reverse()}
    </Container>
  );
};

export default Segment;
