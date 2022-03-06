import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Web3Modal from "web3modal";
import web3 from "./ethereum/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Home from "./pages/Home";
import Header from "./components/Header";
import Livestream from "./pages/Livestream";
import Segment from "./pages/Segment";
import ContentPage from "./pages/ContentPage";
import ErrorPage from "./components/ErrorPage";

import { Box, ImageConatiner, Title, Button } from "./components/MyNFTs";

import axios from "axios";
import Landing from "./pages/Landing";
import BouncrToken from "./ethereum/BouncrToken";
import ProtectedRoute from "./utils/ProtectedRoute";

const infuraId =
  "https://mainnet.infura.io/v3/97c2d52095a84da7a0b710a8daa16acf";
// "https://rinkeby.infura.io/v3/97c2d52095a84da7a0b710a8daa16acf";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: infuraId, // required
    },
  },
};

const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions, // required
});

let provider;

const changeNetwork = async () => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    // console.log("switch network:", { chainId: "0x1" });
    await window.ethereum.request({
      // method: "wallet_addEthereumChain",
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: `0x${Number(4).toString(16)}`, // mumbai = 80001 // polygon = 137 // rinkeby = 4
        },
      ],
    });
  } catch (err) {
    if (err) console.log(err.message);
  }
};

const App = () => {
  const [account, setaccount] = useState("");
  const [chainId, setChainId] = useState();
  const [gold, setGold] = useState(false);
  const [silver, setSilver] = useState(false);
  const [bronze, setBronze] = useState(false);
  const [haveTokens, setHaveTokens] = useState(false);
  const [listCards, setListCards] = useState([]);

  const [sessions, setSessions] = useState([]);
  const [stream, setStream] = useState({ isActive: false });

  const networkChanged = (chainId) => {
    console.log({ chainId });
    setChainId(chainId);
  };

  useEffect(() => {
    try {
      window.ethereum.on("chainChanged", networkChanged);
    } catch (err) {
      if (err) console.log(err);
    }

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  useEffect(() => {
    changeNetwork();
  }, [chainId]);

  const fetchSessions = async () => {
    try {
      const url = `https://livepeer.com/api/stream/${process.env.REACT_APP_STREAM_ID}/sessions`;
      const options = {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      const { data } = await axios.get(url, options);
      console.log(data);
      setSessions(data);
    } catch (err) {
      if (err) console.log(err);
    }
  };

  React.useEffect(() => {
    fetchSessions();
  }, []);

  const fetchPlaybackId = async () => {
    console.log("stream id: ", process.env.REACT_APP_STREAM_ID);
    console.log("api key: ", process.env.REACT_APP_API_KEY);
    try {
      const url = `https://livepeer.com/api/stream/${process.env.REACT_APP_STREAM_ID}`;
      const options = {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      const { data } = await axios.get(url, options);
      console.log(data);
      setStream(data);
    } catch (err) {
      if (err) console.log(err);
    }
  };

  useEffect(() => {
    fetchPlaybackId();
  }, []);

  const onConnectWallet = async () => {
    console.log("connecting wallet...");
    console.log("cached provider", web3Modal.cachedProvider);
    try {
      provider = await web3Modal.connect();
    } catch (err) {
      console.log("Could not get a wallet connection", err);
      return;
    }
    web3.setProvider(provider);
    const accounts = await web3.eth.getAccounts();
    setaccount(accounts[0]);
  };

  const onDisconnect = async (e) => {
    e.preventDefault();

    console.log(
      "cached provider before provider.close(): ",
      web3Modal.cachedProvider
    );
    console.log("Killing the session", web3.currentProvider);
    console.log("web3.givenProvider", web3.givenProvider);

    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }

    console.log(
      "cached provider after provider.close(): ",
      web3Modal.cachedProvider
    );
    web3Modal.clearCachedProvider();
    console.log("cached provider after clear: ", web3Modal.cachedProvider);
    provider = null;
    setaccount("");
    setGold(false);
    setSilver(false);
    setBronze(false);
    setHaveTokens(false);
    window.location.reload();
  };

  useEffect(() => {
    async function listenMMAccount() {
      try {
        window.ethereum.on("accountsChanged", async function () {
          // Time to reload your interface with accounts[0]!
          const accounts = await web3.eth.getAccounts();
          setaccount(accounts[0]);
          console.log(accounts);
          setGold(false);
          setSilver(false);
          setBronze(false);
          window.location.reload();
        });
      } catch (err) {
        console.log("Browser wallet not installed!");
      }
    }

    listenMMAccount();
  }, []);

  useEffect(() => {
    // alert("Connect to the Rinkeby testnet!");
    onConnectWallet();
  }, []);

  const run = async () => {
    try {
      setGold(false);
      setSilver(false);
      setBronze(false);
      const userAddress = account;
      console.log("user address: ", userAddress);
      const balance = await BouncrToken.methods
        .balanceOf(
          userAddress.toString()
          // "0x66Dc3BFCD29E24fDDeE7f405c705220E6142e4cD"
        )
        .call();

      console.log("Bouncr token balance: ", balance);

      if (balance > 0) setHaveTokens(true);

      for (let i = 0; i < balance; i++) {
        const tokenId = await BouncrToken.methods
          .tokenOfOwnerByIndex(userAddress, i)
          .call();

        const tokenUri = await BouncrToken.methods.tokenURI(tokenId).call();
        console.log(tokenUri);

        const url = tokenUri;

        // const url = `https://rinkeby-api.opensea.io/api/v1/asset/0xe8b533C9936eF21850B0Fa8C8F1114b164540039/${tokenId}/`;

        const { data } = await axios.get(url);

        await data.traits;

        await data.traits.map((trait) => {
          //   console.log(trait);
          if (trait.trait_type === "Level") {
            console.log(trait.value);
            if (trait.value === "Gold") {
              setGold(true);
              setSilver(true);
              setBronze(true);
            } else if (trait.value === "Silver") {
              setSilver(true);
              setBronze(true);
            } else if (trait.value === "Bronze") setBronze(true);
          }
          return 0;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    run();
  }, [account, chainId]);

  const listOwnedNFTs = async () => {
    try {
      const userAddress = account;
      console.log("user address: ", userAddress);
      const balance = await BouncrToken.methods
        .balanceOf(userAddress.toString())
        .call();

      console.log("Jor token balance: ", balance);

      let listOfCards = [];

      for (let i = 0; i < balance; i++) {
        const tokenId = await BouncrToken.methods
          .tokenOfOwnerByIndex(userAddress, i)
          .call();

        const tokenUri = await BouncrToken.methods.tokenURI(tokenId).call();
        console.log(tokenUri);

        const url = tokenUri;

        // const url =
        //   // `https://api.opensea.io/api/v1/asset/0x2E9983b023934e72e1E115Ab6AEbB3636f1C4Cbe/${tokenId}/`;
        //   `https://rinkeby-api.opensea.io/api/v1/asset/0xe8b533C9936eF21850B0Fa8C8F1114b164540039/${tokenId}/`;
        const { data } = await axios.get(url);
        console.log(data.image);

        let card = renderCard(
          `Bouncr#${tokenId}`,
          `https://testnets.opensea.io/assets/0xe8b533c9936ef21850b0fa8c8f1114b164540039/${tokenId}`,
          data.image
        );
        listOfCards.push(card);
      }
      setListCards(listOfCards);
    } catch (err) {
      console.log(err);
    }
  };

  const renderCard = (name, permalink, image) => {
    return (
      <Box key={permalink}>
        <ImageConatiner>
          <img src={image} width="100%"></img>
        </ImageConatiner>
        <div style={{ display: "flex" }}>
          <Title>{name}</Title>
          <Button>
            <a href={permalink} target="_blank">
              Opensea
            </a>
          </Button>
        </div>
      </Box>
    );
  };

  useEffect(() => {
    listOwnedNFTs();
  }, [account]);

  return (
    <div className="App">
      <Header
        account={account}
        onConnectWallet={onConnectWallet}
        onDisconnect={onDisconnect}
        level={{ gold: gold, silver: silver, bronze: bronze }}
        haveTokens={haveTokens}
      />
      <Switch>
        <ProtectedRoute
          exact
          level={haveTokens}
          path="/home"
          component={() => <Home account={account} listCards={listCards} />}
        />
        <Route exact path="/" component={() => <Landing />} />
        <ProtectedRoute
          exact
          level={haveTokens}
          path="/live"
          component={() => <Livestream account={account} stream={stream} />}
        />
        <ProtectedRoute
          level={gold}
          exact
          path="/Gold"
          component={() => <Segment segment="Gold" />}
        />
        <ProtectedRoute
          level={gold}
          exact
          path="/Gold/:id"
          component={() => <ContentPage segment="Gold" account={account} />}
        />
        <ProtectedRoute
          level={silver}
          exact
          path="/Silver"
          component={() => <Segment segment="Silver" />}
        />
        <ProtectedRoute
          level={silver}
          exact
          path="/Silver/:id"
          component={() => <ContentPage segment="Silver" account={account} />}
        />
        <ProtectedRoute
          level={bronze}
          exact
          path="/Bronze"
          component={() => <Segment segment="Bronze" />}
        />
        <ProtectedRoute
          level={bronze}
          exact
          path="/Bronze/:id"
          component={() => <ContentPage segment="Bronze" account={account} />}
        />
        <Route
          path="*"
          component={() => <ErrorPage text={"404 NOT FOUND"} />}
        />
      </Switch>
    </div>
  );
};

export default App;
