import React from "react";
import MyNFTs from "../components/MyNFTs";

const Home = ({ account, listCards }) => {
  return (
    <>
      <div>Owned NFTs</div>
      <MyNFTs account={account} listCards={listCards} />
    </>
  );
};

export default Home;
