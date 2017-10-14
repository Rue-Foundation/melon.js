import addresses from "@melonproject/protocol/address-book.json";
import fs from "fs";
import setup from "../../utils/setup";

const getExchangeAdapterContract = async () => {
  const ExchangeAdapter = await new setup.web3.eth.Contract(
    JSON.parse(
      fs.readFileSync(
        "node_modules/@melonproject/protocol/out/simpleAdapter.abi",
      ),
    ),
    addresses.kovan.simpleAdapter,
  );
  return ExchangeAdapter;
};

export default getExchangeAdapterContract;
