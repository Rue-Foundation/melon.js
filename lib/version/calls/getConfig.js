import cacheAwait from "../../utils/cacheAwait";
import getVersionContract from "../contracts/getVersionContract";
import getSphereContract from "../../sphere/contracts/getSphereContract";
import getDataFeedContract from "../../datafeeds/contracts/getDataFeedContract";

import getSymbol from "../../assets/utils/getSymbol";
import addresses from "@melonproject/protocol/address-book.json";
import setup from "../../utils/setup";

const getConfig = async () => {
  const config = {
    versionAddress: addresses.kovan.Version,
  };

  const sphereContract = await getSphereContract();
  // config.sphereAddress = sphereContract.methods.address;
  config.dataFeedAddress = await sphereContract.methods.getDataFeed().call();
  config.exchangeAddress = await sphereContract.methods.getExchange().call();

  const datafeedContract = await getDataFeedContract();
  const referenceAssetAddress = await datafeedContract.methods
    .getQuoteAsset()
    .call();
  config.referenceAsset = getSymbol(referenceAssetAddress);
  const numOfRegisteredAssets = await datafeedContract.methods
    .numRegisteredAssets()
    .call();
  const assets = new Array(numOfRegisteredAssets).fill({});

  config.assets = await Promise.all(
    assets.map(async (asset, i) => {
      const address = await datafeedContract.methods
        .getRegisteredAssetAt(i)
        .call();
      const assetData = await datafeedContract.methods
        .information(address)
        .call();
      return {
        address,
        symbol: assetData[0],
        name: assetData[1],
        decimal: assetData[2],
        url: assetData[3],
      };
    }),
  );

  return config;
};

export default cacheAwait(getConfig);
