// @flow
import pify from "pify";
import trace from "./trace";
import setup from "./setup";
import ensure from "./ensure";

/**
 * Takes a truffle-method (eg. myContract.myMethod) and estimates the gas
 * consumption and boosts this estimation by the multiplier.
 */
const gasBoost = async (
  method: Function,
  params: Array<any>,
  options: Object,
  multiplier: number = 1.2,
) => {
  const gasEstimation = await method.estimateGas(...params, options);

  const latestBlock = await pify(setup.web3.eth.getBlock)("latest");
  const gasLimit = Math.floor(latestBlock.gasLimit * 0.998);

  ensure(
    gasEstimation < latestBlock.gasLimit * 0.998,
    `Gas estimation ${gasEstimation} is above gas limit: ${gasLimit}`,
  );

  let multipliedGasEstimation = Math.ceil(gasEstimation * multiplier);

  if (multipliedGasEstimation > latestBlock.gasLimit) {
    const fallback = Math.ceil(gasLimit);
    trace.warn(
      `Boosted gas estimation (${multipliedGasEstimation +
        0}) would be over latestBlocks gasLimit (${gasLimit +
        0}). Falling back to ${fallback}`,
    );

    ensure(
      fallback >= gasEstimation,
      `Fallback (${fallback}) lower than gas estimation (${gasEstimation})`,
    );
    multipliedGasEstimation = fallback;
  }

  const enhancedOptions = {
    ...options,
    gas: multipliedGasEstimation,
  };

  trace(`Gas estimated ${method.name}: ${enhancedOptions.gas}`, {
    params,
    enhancedOptions,
  });

  return method(...params).send(enhancedOptions);
};

export default gasBoost;
