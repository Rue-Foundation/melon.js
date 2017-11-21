// @flow
import ensure from "./ensure";
import ethers from "ethers";

/**
 * Searches the log of the `receipt` for a given event `nameOrIndex`
 * Possibility to add custom error `message` if event not found
 * @throws {EnsureError}
 * @returns found event
 */
const findEventInLog = (
  nameOrIndex: string | number,
  receipt: Object,
  message: string = "No transaction logs found in receipt",
): any => {
  const utf8Bytes = ethers.utils.toUtf8Bytes(nameOrIndex);
  const keccakedEventSignature = ethers.utils.keccak256(utf8Bytes);

  ensure(
    !!(receipt && receipt.logs && receipt.logs.length),
    "Transaction has no logs at all.",
    {
      nameOrIndex,
      receipt,
    },
  );

  const log =
    typeof nameOrIndex === "string"
      ? receipt.logs.find(l => l.topics[0] === keccakedEventSignature)
      : receipt.logs[nameOrIndex];

  ensure(!!log, message, {
    nameOrIndex,
    receipt,
  });

  return log;
};

export default findEventInLog;
