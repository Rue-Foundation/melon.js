import contract from "truffle-contract";
import setup from "../../utils/setup";
import fs from "fs";

const getFundContract = async address => {
  const Fund = await new setup.web3.eth.Contract(
    JSON.parse(
      fs.readFileSync("node_modules/@melonproject/protocol/out/Fund.abi"),
    ),
  );
  return Fund;
};

export default getFundContract;
