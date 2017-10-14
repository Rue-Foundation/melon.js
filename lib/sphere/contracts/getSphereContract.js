import addresses from "@melonproject/protocol/address-book.json";
import fs from "fs";
import setup from "../../utils/setup";

const getSphereContract = async () => {
  const Sphere = await new setup.web3.eth.Contract(
    JSON.parse(
      fs.readFileSync("node_modules/@melonproject/protocol/out/Sphere.abi"),
    ),
    addresses.kovan.Sphere,
  );
  return Sphere;
};

export default getSphereContract;
