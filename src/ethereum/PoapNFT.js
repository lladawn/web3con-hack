import web3 from "./web3";
import abi from "./build/PoapNFT.json";

const PoapNFT = new web3.eth.Contract(
  abi,
  //   "0x2E9983b023934e72e1E115Ab6AEbB3636f1C4Cbe" //mainnet
  // "0xF8b4B4F7629f4e101dF8C93f7D17205Fed476f43" //kovan
  // "0x002aF40A6eB3C688612184C51500b97C1b89dfFC" //rinkeby
  "0xA3ED43F1D33ebFA24ca77a3149F5B6CA9c811F34"
);

export default PoapNFT;
