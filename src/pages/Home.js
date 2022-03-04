import React from "react";
import MyNFTs from "../components/MyNFTs";

const Home = ({ account }) => {
  return (
    <>
      <div>Owned NFTs</div>
      <MyNFTs account={account} />
    </>
  );
};

export default Home;
