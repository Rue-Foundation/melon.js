import addresses from "@melonproject/protocol/address-book.json";
import fs from "fs";
import setup from "../../utils/setup";

const getParticipationContract = async () => {
  const Participation = await new setup.web3.eth.Contract(
    JSON.parse(
      fs.readFileSync(
        "node_modules/@melonproject/protocol/out/Participation.abi",
      ),
    ),
    addresses.Participation,
  );
  return Participation;
};

export default getParticipationContract;
