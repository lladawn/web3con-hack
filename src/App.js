import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Web3Modal from "web3modal";
import web3 from "./ethereum/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Home from "./pages/Home";
import Header from "./components/Header";
import Livestream from "./pages/Livestream";

import axios from "axios";
import Landing from "./pages/Landing";

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
    // setGold(false);
    // setSilver(false);
    // setBronze(false);
    // setHaveTokens(false);
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
          // setGold(false);
          // setSilver(false);
          // setBronze(false);
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

  return (
    <div className="App">
      <Header
        account={account}
        onConnectWallet={onConnectWallet}
        onDisconnect={onDisconnect}
      />
      <Switch>
        <Route exact path="/" component={() => <Home account={account} />} />
        <Route exact path="/landing" component={() => <Landing />} />
        <Route
          exact
          path="/live"
          component={() => <Livestream account={account} stream={stream} />}
        />
      </Switch>
      
    </div>
  );
};

export default App;
