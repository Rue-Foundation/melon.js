import addresses from "@melonproject/protocol/address-book.json";
import setup from "../../utils/setup";
import fs from "fs";

const getDataFeedContract = async () => {
  const dataFeedAddress = addresses.kovan.DataFeed; // hack: should be from sphere
  const DataFeed = await new setup.web3.eth.Contract(
    JSON.parse(
      fs.readFileSync("node_modules/@melonproject/protocol/out/DataFeed.abi"),
    ),
    dataFeedAddress,
  );
  return DataFeed;
};

export default getDataFeedContract;
