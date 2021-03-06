// @flow
import BigNumber from "bignumber.js";
import pify from "pify";
import setup from "../../utils/setup";
import getSimpleMarketContract from "../contracts/getSimpleMarketContract";
import toReadable from "../../assets/utils/toReadable";
import getDecimals from "../../assets/utils/getDecimals";
import getSymbol from "../../assets/utils/getSymbol";

import type { Address } from "../../assets/schemas/Address";
import type { TokenSymbol } from "../../assets/schemas/TokenSymbol";

/**
 * @deprecated should be same as Trade
 */
type FundTrade = {
  maker: Address,
  taker: Address,
  timeStamp: Date,
  sellQuantity: BigNumber,
  buyQuantity: BigNumber,
  sellToken: TokenSymbol,
  buyToken: TokenSymbol,
};

/**
 * Get recent trades for `fundAddress` `inlastXdays`.
 */
const getFundRecentTrades = async (
  fundAddress: Address,
  inlastXdays: number = 1,
): Promise<[FundTrade]> => {
  const simpleMarketContract = await getSimpleMarketContract();
  const blocksPerDay = 21600;
  const numberOfDays = inlastXdays;

  const blockNumber: number = await pify(setup.web3.eth.getBlockNumber)();

  const tradeEvent = simpleMarketContract.LogTake(
    {},
    {
      fromBlock: blockNumber - blocksPerDay * numberOfDays,
      toBlock: "latest",
    },
  );

  const tradeEventsPromise = new Promise((resolve, reject) => {
    tradeEvent.get((error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });

  const recentTrades = await tradeEventsPromise;
  let trade;

  return recentTrades
    .map(event => {
      if (
        event.args.maker === fundAddress ||
        event.args.taker === fundAddress
      ) {
        const buySymbol = getSymbol(event.args.pay_gem.toLowerCase());
        const sellSymbol = getSymbol(event.args.buy_gem.toLowerCase());

        trade = {
          maker: event.args.maker,
          taker: event.args.taker,
          timeStamp: new Date(event.args.timestamp.times(1000).toNumber()),
          sellQuantity: event.args.give_amt,
          buyQuantity: event.args.take_amt,
          sellToken: sellSymbol,
          buyToken: buySymbol,
        };

        // case BUY ORDER
        if (sellSymbol === "MLN-T") {
          const decimalDifference =
            getDecimals(sellSymbol) - getDecimals(buySymbol);

          if (getDecimals(buySymbol) !== 18) {
            trade.price = new BigNumber(event.args.give_amt)
              .div(event.args.take_amt)
              .div(10 ** decimalDifference);
          } else {
            trade.price = new BigNumber(event.args.give_amt).div(
              event.args.take_amt,
            );
          }
          trade.type = "buy";
          trade.quantity = toReadable(event.args.take_amt, buySymbol);
        } else if (buySymbol === "MLN-T") {
          const decimalDifference =
            getDecimals(buySymbol) - getDecimals(sellSymbol);

          if (getDecimals(sellSymbol) !== 18) {
            trade.price = new BigNumber(event.args.take_amt)
              .div(event.args.give_amt)
              .div(10 ** decimalDifference);
          } else {
            trade.price = new BigNumber(event.args.take_amt).div(
              event.args.give_amt,
            );
          }
          trade.type = "sell";
          trade.quantity = toReadable(event.args.give_amt, sellSymbol);
        } else {
          return null;
        }
      }
      return trade;
    })
    .filter(o => !!o);
};

export default getFundRecentTrades;
