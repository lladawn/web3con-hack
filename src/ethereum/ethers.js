const web3 = require("./web3");

var ethers = require("ethers");
var provider = new ethers.providers.Web3Provider(web3.currentProvider);

module.exports = provider;
