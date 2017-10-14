import fs from "fs";
import setup from "../../utils/setup";
import getAddress from "../utils/getAddress";

const getTokenContract = async symbol => {
  const tokenAddress = getAddress(symbol);
  const Token = await new setup.web3.eth.Contract(
    JSON.parse(
      fs.readFileSync("node_modules/@melonproject/protocol/out/ERC20.abi"),
    ),
    tokenAddress,
  );
  return Token;
};

export default getTokenContract;
