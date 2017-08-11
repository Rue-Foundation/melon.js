import BigNumber from "bignumber.js";
import contract from "truffle-contract";

import approve from "../../../../lib/assets/transactions/approve";

// eslint-disable-next-line global-require
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));

test("approve", async () => {
  const result = await approve("0xToken", "0x1", "0x2", new BigNumber(4));

  expect(result).toBeTruthy();
  expect(result.to === "0x2").toBeTruthy();
  expect(result.amountApproved.eq(4)).toBeTruthy();
  expect(result.approved.eq(4)).toBeTruthy();
  expect(contract).toHaveBeenCalledTimes(1);
  expect(contract().setProvider).toHaveBeenCalledTimes(1);
  expect(contract().at).toHaveBeenCalledWith("0xToken");
  expect(
    contract.mockInspect.instance.approve,
  ).toHaveBeenCalledWith("0x2", new BigNumber(4), { from: "0x1" });
});