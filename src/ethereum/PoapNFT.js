import web3 from "./web3";
import abi from "./build/PoapNFT.json";

const PoapNFT = new web3.eth.Contract(
  abi,
  // "0xA3ED43F1D33ebFA24ca77a3149F5B6CA9c811F34"
  "0x21E8c23C3EE37D054d36f80F3459F283F3EfE97D" // rinkeby
);

export default PoapNFT;
