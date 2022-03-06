import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import provider from "../ethereum/ethers";
import makeBlockie from "ethereum-blockies-base64";
import axios from "axios";
import Background from "../assets/images/Background.png";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-image: url(${Background});
  height: fit-content;
  padding: 12px;
  background-color: black;
  margin: 0 0 -100px 0;
  top: 0;
  position: sticky;
  z-index: 100;
`;

const Logo = styled.div`
  top: 0;
  left: 0;
  /* position: absolute; */
  padding: 0px 10px;
  font-weight: bold;
  color: white;
`;

const HeaderFields = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 15px;
  padding: 0px 10px;
  margin: 0 0 0 150px;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  height: 40px;
  width: 100px;
  border-radius: 50px;
  color: white;

  border: 1px solid white;
  display: grid;
  align-content: center;
  justify-content: space-around;
  margin: 0px 0px;
  transition: 0.3s ease-in;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
    background-color: #25b04a;
  }

  &.selected {
    background-color: #25b04a;
    transform: scale(1.1);
  }
`;

const Wallet = styled.div`
  height: 50px;
  min-width: 200px;
  border-radius: 50px;
  color: white;

  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  transition: 0.7s ease-in-out;
  gap: 15px;

  top: 0;
  right: 10;
  position: inherit;
  padding: 0px 15px;
  margin-right: 50px;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
    background-color: #25b04a;
  }
`;

const Disconnect = styled(Wallet)`
  &:hover h3 span {
    display: none;
  }
  &:hover img {
    display: none;
  }
  &:hover h3:after {
    content: "Disconnect";
    justify-self: center;
  }
`;

const BlockieIcon = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 30px;
`;

const Header = ({
  account,
  onConnectWallet,
  onDisconnect,
  haveTokens,
  level,
}) => {
  const [ensName, setEnsName] = useState();
  const [icon, setIcon] = useState();

  const userAddress = account
    ? account.slice(0, 6) + "...." + account.slice(-4)
    : null;

  const createBlockies = async () => {
    if (account) {
      var icon = makeBlockie(account);
      if (ensName) {
        let url = `https://metadata.ens.domains/mainnet/avatar/${ensName}`;
        const { data } = await axios.get(url);
        if (data.message === "There is no avatar set under given address") {
          setIcon(icon);
        } else {
          setIcon(url);
        }
      } else {
        setIcon(icon);
      }
    }
  };

  useEffect(() => {
    const fetchEnsName = async () => {
      if (account) {
        try {
          var name = await provider.lookupAddress(account);
          console.log(name);
          //   name = "brantly.eth";
          // name = "vitalik.eth";
          // name = "thedogepound.eth";
          setEnsName(name);
        } catch (err) {
          if (err) console.error(err);
        }
      }
    };

    fetchEnsName();
  }, [account]);

  useEffect(() => {
    createBlockies();
  }, [account, ensName]);

  return (
    <>
      <HeaderContainer>
        <Logo>
          <NavLink
            exact
            to="/"
            style={{ color: "white", textDecoration: "none" }}
          >
            <h2>Bouncr</h2>
          </NavLink>
        </Logo>
        <HeaderFields>
          {haveTokens ? (
            <>
              <Item exact to="/home" activeClassName="selected">
                <h4>Home</h4>
              </Item>
              <Item exact to="/live" activeClassName="selected">
                <h4>Livestream</h4>
              </Item>
            </>
          ) : null}
          {level.gold ? (
            <Item exact to="/Gold" activeClassName="selected">
              <h4>Gold</h4>
            </Item>
          ) : null}
          {level.silver ? (
            <Item exact to="/Silver" activeClassName="selected">
              <h4>Silver</h4>
            </Item>
          ) : null}
          {level.bronze ? (
            <Item exact to="/Bronze" activeClassName="selected">
              <h4>Bronze</h4>
            </Item>
          ) : null}
        </HeaderFields>
        {account === "" || typeof account === "undefined" ? (
          <Wallet onClick={onConnectWallet}>
            <h3>Connect Wallet</h3>
          </Wallet>
        ) : (
          <Disconnect onClick={onDisconnect}>
            <BlockieIcon src={icon ? icon : ""} alt="" />
            <h3>
              <span>{ensName ? ensName : userAddress}</span>
            </h3>
          </Disconnect>
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;
