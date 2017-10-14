// import BigNumber from "bignumber.js";

// import setup from "../../../../lib/utils/setup";
// import trace from "../../../../lib/utils/trace";
// import makeOrder from "../../../../lib/exchange/transactions/makeOrder";
// import cancelOrder from "../../../../lib/exchange/transactions/cancelOrder";
// import getOrder from "../../../../lib/exchange/calls/getOrder";

// xit(
//   "make an order and cancel it",
//   async () => {
//     trace({
//       message: `Start make order and cancel with defaultAccount: ${setup.defaultAccount}`,
//       data: setup,
//     });

//     const order = await makeOrder({
//       sell: {
//         howMuch: new BigNumber(1),
//         symbol: "ETH-T",
//       },
//       buy: {
//         howMuch: new BigNumber(2),
//         symbol: "MLN-T",
//       },
//     });
//     trace({ message: `Made order with id: ${order.id}`, data: order });

//     const wasCancelled = await cancelOrder(order.id);
//     expect(!!wasCancelled).toBeTruthy();
//     trace({ message: `Order canceled: ${order.id}` });

//     const canceledOrder = await getOrder(order.id);
//     expect(canceledOrder.isActive === false).toBeTruthy();
//   },
//   10 * 60 * 1000,
// );
