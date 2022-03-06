import axios from "axios";
import React, { useState, useEffect } from "react";
import Videopage from "../components/VideoPage";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ErrorPage from "../components/ErrorPage";

const Container = styled.div`
  display: grid;
  margin: 50px;
`;

const ContentPage = ({ segment, account }) => {
  const [contents, setcontents] = useState(null);
  const { id } = useParams();

  const fetchContents = async () => {
    const url = `https://buildit-tier.kraznikunderverse.com/api/${segment}`;
    const options = {
      validate: "alpha romeo tango",
    };
    const { data } = await axios.post(url, options);
    console.log(data.data);
    setcontents(data.data);
    // console.log(contents[id.toString()]);
    console.log(id);
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return (
    <Container>
      {contents ? (
        contents[id.toString()] ? (
          <Videopage
            content={contents[id.toString()]}
            segment={segment}
            account={account}
          />
        ) : // <ErrorPage text={"404 NOT FOUND"} />
        null
      ) : // <ErrorPage text={"404 NOT FOUND"} />
      null}
    </Container>
  );
};

export default ContentPage;
