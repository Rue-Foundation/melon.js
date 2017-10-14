import fs from "fs";
import getConfig from "../../version/calls/getConfig";
import setup from "../../utils/setup";

const getSimpleMarketContract = async () => {
  const config = await getConfig();
  const exchangeAddress = config.exchangeAddress;
  const SimpleMarket = await new setup.web3.eth.Contract(
    JSON.parse(
      fs.readFileSync(
        "node_modules/@melonproject/protocol/out/simpleMarket.abi",
      ),
    ),
    exchangeAddress,
  );
  return SimpleMarket;
};

export default getSimpleMarketContract;
