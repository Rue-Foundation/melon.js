// @flow
import type { Address } from "../assets/schemas/Address";

/**
 * Setup object
 */
export type Setup = {
  provider: any,
  currentProvider: any,
  networkId: number,
  defaultAccount: Address,
  daemonAddress: Address,
  tracer: Function,
  init: Function,
};

/**
 * Globally setup melon.js
 * @param setup
 * @param setup.provider connected provider instance
 * @param setup.daemonAddress the address of the liquidity provider
 * @param setup.defaultAccount the default from address
 * @param tracer helper function to trace internals of melon.js
 */
const setup: Setup = {
  init({ provider, daemonAddress, defaultAccount, tracer = () => {} }: Setup) {
    this.provider = provider;
    this.currentProvider = provider;
    this.networkId = provider.chainId;
    this.defaultAccount = defaultAccount;
    this.daemonAddress = daemonAddress;
    this.tracer = tracer || console.log;
  },
};

export default setup;
