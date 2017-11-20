import fs from "fs";
import ethers from "ethers";
import addressBook from "@melonproject/protocol/address-book.json";

/**
 * Get deployed version contract instance
 */
const getVersionContract = async walletOrProvider => {
  const abi = JSON.parse(
    fs.readFileSync(
      "node_modules/@melonproject/protocol/out/version/Version.abi",
    ),
  );

  return new ethers.Contract(addressBook.kovan.Version, abi, walletOrProvider);
};

export default getVersionContract;
