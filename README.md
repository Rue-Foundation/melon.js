Melon.js
========

JS API for the Melon Protocol

## Folder structure

The folder structure is based on the structure of the 
[protocol contract]. That said, the melon.js has a different
goal: Making interaction with the protocol as developer friendly as possible.
Whereas the protocol needs to be efficient on the blockchain and secure.


### `/`
The shape of this repository is inspired by [this blogpost][hacker noon react lib].
On the root level, there are the common configuration files like `package.json`,
`.eslintrc`, ...

And three important folders:

- `lib/`: The ES6/7 source code
- `build/`: The transpiled ES5 code (ignored in git)
- `test/`: Integration tests, unit tests, mocks, common fixtures and package 
  wide test helpers


### `lib/`
This is probably the most interesting folder. Here is the actual code. The structure
mirrors the [protocol contract] (i.e. `assets/`, `exchange/`, ...), adding only `utils/` for common utility functions.

### `lib/[contract]`
Each of these contract folders can have the following subfolders:

- `calls/`: Actual interactions with the blockchain free of gas.
  So called constant-methods.
- `transactions/`: Actual interactions with the blockchain that cost gase. 
  So called non-constant-methods.
- `utils/`: Utility functions to interact with the data
- `queries/`: Sort and filter functions to insert into JS own `.sort(fn)`,
  `.filter(fn)`.

Note: Some calls & transactions are more or less a simple JS-wrapper on the
contract, where others do more complex stuff and even combine multiple calls
to the contracts. But you can be certain: Transactions are free.

## `testing`

By interacting with the smart contracts, we have 3 levels of testing:

- `tests/unit/` Unit-tests: Each function as isolated as possible with mocks.
  We are not super strict here and allow that one unit depends on another as
  long as the interaction with the smart contracts is mocked.
- `tests/integration/` Integration tests: Interact with real smart contracts.
  Be careful with those: They try to connect to a real node that you need to
  provide.


[protocol contract]: https://github.com/melonproject/protocol/tree/master/contracts
[hacker noon react lib]: https://hackernoon.com/building-a-react-component-library-part-1-d8a1e248fe6c
