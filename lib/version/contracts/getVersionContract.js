import addresses from "@melonproject/protocol/address-book.json";
import fs from "fs";
import setup from "../../utils/setup";

const getVersionContract = async () => {
  const Version = await new setup.web3.eth.Contract(
    JSON.parse(
      fs.readFileSync(
        "node_modules/@melonproject/protocol/out/version/Version.abi",
      ),
    ),
    addresses.kovan.Version,
  );
  return Version;
};

export default getVersionContract;
