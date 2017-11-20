// import BigNumber from "bignumber.js";
import ethers from "ethers";
import fs from "fs";

import setup from "../../../../lib/utils/setup";
// import getConfig from "../../../../lib/version/calls/getConfig";
// import trace from "../../../../lib/utils/trace";
// import getBalance from "../../../../lib/assets/calls/getBalance";
// import setupFund from "../../../../lib/version/transactions/setupFund";
// import getFundForManager from "../../../../lib/version/calls/getFundForManager";
// import getParticipation from "../../../../lib/participation/calls/getParticipation";
// import subscribe from "../../../../lib/participation/transactions/subscribe";
// import executeRequest from "../../../../lib/participation/transactions/executeRequest";
// import awaitDataFeedUpdates from "../../../../lib/datafeeds/events/awaitDataFeedUpdates";
// import makeOrderFromFund from "../../../../lib/fund/transactions/makeOrderFromFund";
// import toggleSubscription from "../../../../lib/fund/transactions/toggleSubscription";
// import toggleRedemption from "../../../../lib/fund/transactions/toggleRedemption";
// import getParticipationAuthorizations from "../../../../lib/fund/calls/getParticipationAuthorizations";
// import makeOrder from "../../../../lib/exchange/transactions/makeOrder";
// import getOrderbook from "../../../../lib/exchange/calls/getOrderbook";
// import takeOrderFromFund from "../../../../lib/fund/transactions/takeOrderFromFund";
// import performCalculations from "../../../../lib/fund/calls/performCalculations";
// import redeem from "../../../../lib/participation/transactions/redeem";
// import getRecentTrades from "../../../../lib/exchange/calls/getRecentTrades";
// import getFundRecentTrades from "../../../../lib/exchange/calls/getFundRecentTrades";
import getVersionContract from "../../../../lib/version/contracts/getVersionContract";
import encryptedWallet from "../../../../encryptedWallet.json";
import password from "../../../../password";

const INITIAL_SUBSCRIBE_QUANTITY = 20;
const REDEEM_QUANTITY = 5;

const shared = { etherBalance: {}, participation: {}, melonBalance: {} };

const randomString = (length = 4) =>
  Math.random().toString(36).substr(2, length);

fit(
  "Create fund, invest, take order, redeem",
  async () => {
    console.log("\n");
    // expect(setup.web3.eth.syncing).toBeFalsy();

    // shared.etherBalance.initial = setup.web3.fromWei(
    //   setup.web3.eth.getBalance(setup.defaultAccount),
    // );
    // expect(shared.etherBalance.initial.toFixed()).toBeGreaterThan(
    //   INITIAL_SUBSCRIBE_QUANTITY,
    // );
    // trace({
    //   message: `Start walkthrough with defaultAccount: ${setup.defaultAccount}`,
    //   data: setup,
    // });
    // trace({ message: `Etherbalance: Ξ${shared.etherBalance.initial} ` });
    // shared.melonBalance.initial = await getBalance("MLN-T");
    // trace({ message: `Melon Balance: Ⓜ  ${shared.melonBalance.initial} ` });

    const Wallet = ethers.Wallet;
    const jsonWallet = JSON.stringify(encryptedWallet);
    const wallet = await Wallet.fromEncryptedWallet(jsonWallet, password.kovan);
    wallet.provider = setup.provider;

    const versionContract = await getVersionContract(wallet);

    const estimateGas = await versionContract.estimate.setupFund(
      "TEST",
      "0x2a20ff70596e431ab26C2365acab1b988DA8eCCF",
      0,
      0,
      "0xA0b22dD03cfc475068B1d77a17ced0E72c3e0cE9",
      "0x3953E95217c1CE1ba1c9f0398FDeDAE5C9B5659A",
      "0xd1C83Df96f180a5A42d7Ca169f932Aa62342BcF1",
    );
    console.log(
      "Current gas estimation to deploy a fund: ",
      estimateGas.toString(),
    );

    const transaction = await versionContract.setupFund(
      "TEST",
      "0x2a20ff70596e431ab26C2365acab1b988DA8eCCF",
      0,
      0,
      "0xA0b22dD03cfc475068B1d77a17ced0E72c3e0cE9",
      "0x3953E95217c1CE1ba1c9f0398FDeDAE5C9B5659A",
      "0xd1C83Df96f180a5A42d7Ca169f932Aa62342BcF1",
      { gasLimit: estimateGas },
    );

    await setup.provider.waitForTransaction(transaction.hash);
    console.log(await setup.provider.waitForTransaction(transaction.hash));
    const receipt = await setup.provider.getTransactionReceipt(
      transaction.hash,
    );
    console.log("Receipt ", receipt);

    versionContract.onfundupdated = function(id) {
      console.log("ID ", id);
    };

    versionContract.onfundupdated();

    // / FAILED ATTEMPS
    // const Interface = ethers.Interface;
    // const abi = JSON.parse(
    //   fs.readFileSync(
    //     "node_modules/@melonproject/protocol/out/version/Version.abi",
    //   ),
    // );
    // const iface = new Interface(abi);
    // const fundUpdatedInfo = iface.events.FundUpdated();

    // const result = fundUpdatedInfo.parse(transaction.data);
    // console.log(result);

    // const RLP = require("ethers-utils/rlp");
    // const decoded = RLP.decode(receipt.logs[0].topics);
    // console.log("------- ", decoded);

    // / LEGACY
    // shared.config = await getConfig();
    // trace({
    //   message: `Got config w exchange at ${shared.config
    //     .exchangeAddress},and datafeed at ${shared.config.dataFeedAddress}`,
    //   data: shared.config,
    // });

    // shared.vaultName = `test-${randomString()}`;
    // shared.vault = await setupFund(shared.vaultName);
    // expect(shared.vault.name).toBe(shared.vaultName);
    // expect(shared.vault.id).toBeGreaterThanOrEqual(0);
    // expect(shared.vault.address).toBeTruthy();
    // expect(shared.vault.timestamp instanceof Date).toBeTruthy();
    // trace({
    //   message: `vaultCreated: ${shared.vault.name} (${shared.vault
    //     .id}) at ${shared.vault.address}`,
    //   data: shared,
    // });

    // const fundCreatedByManager = await getFundForManager(setup.defaultAccount);
    // expect(fundCreatedByManager).toBe(shared.vault.address);

    // shared.participation.initial = await getParticipation(
    //   shared.vault.address,
    //   setup.defaultAccount,
    // );
    // expect(shared.participation.initial.personalStake.toNumber()).toBe(0);
    // expect(shared.participation.initial.totalSupply.toNumber()).toBe(0);

    // shared.initialCalculations = await performCalculations(
    //   shared.vault.address,
    // );

    // trace({
    //   message: `Initial calculations- GAV: ${shared.initialCalculations
    //     .gav}, NAV: ${shared.initialCalculations.nav}, Share Price: ${shared
    //     .initialCalculations.sharePrice}, totalSupply: ${shared
    //     .initialCalculations.totalSupply}`,
    //   data: shared,
    // });
    // expect(shared.initialCalculations.sharePrice.toNumber()).toBe(1);
    // expect(shared.initialCalculations.gav.toNumber()).toBe(0);

    // shared.subscriptionRequest = await subscribe(
    //   shared.vault.address,
    //   // "0x4c476a34a92cda676654b43c5d5d42879d45e38b",
    //   new BigNumber(INITIAL_SUBSCRIBE_QUANTITY),
    //   new BigNumber(INITIAL_SUBSCRIBE_QUANTITY),
    // );

    // trace({
    //   message: `Subscribe requested. shares: ${shared.subscriptionRequest
    //     .numShares}`,
    //   data: shared,
    // });

    // // await awaitDataFeedUpdates(2);

    // // trace("Awaited two data feed updates");

    // shared.executedSubscriptionRequest = await executeRequest(
    //   shared.subscriptionRequest.id,
    //   shared.vault.address,
    //   // "0x1787a2242cbb8ac2d755568f99a4314309637493",
    // );

    // trace(`executedSubscriptionRequest ${shared.executedSubscriptionRequest}`);

    // shared.participation.invested = await getParticipation(
    //   // "0x1787a2242cbb8ac2d755568f99a4314309637493",
    //   shared.vault.address,
    //   setup.defaultAccount,
    // );

    // expect(shared.participation.invested.personalStake.toNumber()).toBe(
    //   INITIAL_SUBSCRIBE_QUANTITY,
    // );
    // expect(shared.participation.invested.totalSupply.toNumber()).toBe(
    //   INITIAL_SUBSCRIBE_QUANTITY,
    // );

    // trace({
    //   message: `Subscribe request executed. Personal stake: ${shared
    //     .participation.invested.personalStake}`,
    // });

    // shared.midCalculations = await performCalculations(shared.vault.address);

    // trace({
    //   message: `Mid calculations- GAV: ${shared.midCalculations
    //     .gav}, NAV: ${shared.midCalculations.nav}, Share Price: ${shared
    //     .midCalculations.sharePrice}, totalSupply: ${shared.midCalculations
    //     .totalSupply}`,
    //   data: shared,
    // });

    // shared.redemptionRequest = await redeem(
    //   // "0xcce976f728a0d260e45b63f2e65545338db05a84",
    //   shared.vault.address,
    //   REDEEM_QUANTITY,
    //   REDEEM_QUANTITY,
    // );

    // trace({
    //   message: `Redeem requested. shares: ${shared.redemptionRequest
    //     .numShares}`,
    //   data: shared,
    // });

    // await awaitDataFeedUpdates(2);

    // shared.executedRedeemRequest = await executeRequest(
    //   shared.redemptionRequest.id,
    //   // "0xcce976f728a0d260e45b63f2e65545338db05a84",
    //   shared.vault.address,
    // );

    // shared.participation.invested = await getParticipation(
    //   shared.vault.address,
    //   // "0xcce976f728a0d260e45b63f2e65545338db05a84",
    //   setup.defaultAccount,
    // );

    // expect(shared.participation.invested.personalStake.toNumber()).toBe(
    //   INITIAL_SUBSCRIBE_QUANTITY - REDEEM_QUANTITY,
    // );
    // expect(shared.participation.invested.totalSupply.toNumber()).toBe(
    //   INITIAL_SUBSCRIBE_QUANTITY - REDEEM_QUANTITY,
    // );

    // trace({
    //   message: `Redeem request executed. Personal stake: ${shared.participation
    //     .invested.personalStake}`,
    // });

    // shared.simpleOrder = await makeOrder({
    //   sell: {
    //     howMuch: new BigNumber(1),
    //     symbol: "ETH-T",
    //   },
    //   buy: {
    //     howMuch: new BigNumber(4),
    //     symbol: "MLN-T",
    //   },
    // });

    // trace({
    //   message: `Regular account made order with id: ${shared.simpleOrder.id}`,
    // });

    // shared.orderFromFund = await makeOrderFromFund(
    //   shared.vault.address,
    //   // "0xada9810b566a62912feba9c7fa55c85e65083f84",
    //   "MLN-T",
    //   "ETH-T",
    //   new BigNumber(1),
    //   new BigNumber(1),
    // );

    // trace({
    //   message: `Fund placed an order with id: ${shared.orderFromFund.id.toNumber()}`,
    // });

    // shared.orderBook = await getOrderbook("MLN-T", "ETH-T");

    // trace({
    //   message: `Got orderbook for MLN-T/ETH-T with length: ${shared.orderBook
    //     .length}`,
    //   data: shared,
    // });

    // shared.takenOrder = await takeOrderFromFund(
    //   shared.simpleOrder.id,
    //   shared.vault.address,
    //   // "0xbe7edc252e1395a6c1b34387968931a177022d89",
    //   new BigNumber(1.5),
    // );

    // trace({
    //   message: `Fund took order; executed quantity: ${shared.takenOrder
    //     .executedQuantity}`,
    //   data: shared,
    // });

    // shared.endCalculations = await performCalculations(shared.vault.address);

    // trace({
    //   message: `End calculations- GAV: ${shared.endCalculations
    //     .gav}\n NAV: ${shared.endCalculations.nav}, Share Price: ${shared
    //     .endCalculations.sharePrice}, totalSupply: ${shared.endCalculations
    //     .totalSupply}`,
    //   data: shared,
    // });

    // shared.recentTrades = await getRecentTrades("BTC-T", "MLN-T");
    // expect(shared.recentTrades.length).toBeGreaterThanOrEqual(0);

    // shared.fundRecentTrades = await getFundRecentTrades(shared.vault.address);
    // expect(shared.fundRecentTrades.length).toEqual(1);
    // expect(shared.fundRecentTrades[0].taker).toEqual(shared.vault.address);

    // shared.orderbook = await getOrderbook("MLN-T", "ETH-T");

    // shared.toggledSubscription = await toggleSubscription(
    //   shared.vault.address,
    //   setup.defaultAccount,
    // );

    // expect(shared.toggledSubscription).toBe(false);

    // shared.toggledSubscription = await toggleSubscription(
    //   shared.vault.address,
    //   setup.defaultAccount,
    // );

    // expect(shared.toggledSubscription).toBe(true);

    // shared.toggledRedemption = await toggleRedemption(
    //   shared.vault.address,
    //   setup.defaultAccount,
    // );

    // expect(shared.toggledRedemption).toBe(false);
    // shared.toggledRedemption = await toggleRedemption(
    //   shared.vault.address,
    //   setup.defaultAccount,
    // );
    // expect(shared.toggledRedemption).toBe(true);

    // shared.participationAuthorizations = await getParticipationAuthorizations(
    //   shared.vault.address,
    // );
    // console.log(shared.participationAuthorizations);
  },
  10 * 60 * 1000,
);
