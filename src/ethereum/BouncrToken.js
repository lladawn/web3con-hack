import web3 from "./web3";
import abi from "./build/BouncrTokenAbi.json";

const BouncrNFT = new web3.eth.Contract(
  abi,
  "0xe8b533C9936eF21850B0Fa8C8F1114b164540039" // rinkeby
);

export default BouncrNFT;
