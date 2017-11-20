// @flow
import fs from "fs";
import ethers from "ethers";

import setup from "../../utils/setup";

import type { Address } from "../../assets/schemas/Address";

/**
 * Get the contract instance of fund at `fundAddress`
 */
const getFundContract = async (
  fundAddress: Address,
  walletOrProvider: any,
): Promise<any> => {
  const abi = await JSON.parse(
    fs.readFileSync("node_modules/@melonproject/protocol/out/Fund.abi"),
  );
  return new ethers.Contract(fundAddress, abi, walletOrProvider);
};

export default getFundContract;
