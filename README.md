# web3-multicall

[![npm version](https://badge.fury.io/js/%40dopex-io%2Fweb3-multicall.svg)](https://badge.fury.io/js/%40dopex-io%2Fweb3-multicall)

A library to do multiple calls via a single `eth_call` using [web3](https://github.com/ChainSafe/web3.js).

## Installation

- via yarn

```bash
yarn add @dopex-io/web3-multicall
```

- via npm

```bash
npm i @dopex-io/web3-multicall
```

## Usage

> [Contract Reference](/src/contract/Multicall.sol)

[Default Supported Networks](./SUPPORTED_NETWORKS.md)

### Constructing

- With `chainId`

  ```js
  import Multicall from '@dopex-io/web3-multicall';

  import erc20Abi from './abi/erc20.json';

  async function main() {
    const web3 = new Web3(provider /* Your Web3 provider here */);

    const multicall = new Multicall({
      chainId: 1,
      provider: 'Your Web3 provider here',
    });

    ...
  }

  main()
  ```

- With custom Multicall address

  ```js
  import Multicall from '@dopex-io/web3-multicall';

  import erc20Abi from './abi/erc20.json';

  async function main() {
    const web3 = new Web3(provider /* Your Web3 provider here */);

    const multicall = new Multicall({
      multicallAddress: "The address of the deployed multicall contract",
      provider: 'Your Web3 provider here',
    });

    ...
  }

  main();
  ```

### Aggregating

```js
const dpxContract = new web3.eth.Contract(dpxAddress, erc20Abi);

const balances = await multicall.aggregate([
  dpxContract.methods.balanceOf('Address 1'),
  dpxContract.methods.balanceOf('Address 2'),
  multicall.getEthBalance('Address 3'),
]);

console.log('DPX balance of Address 1', balances[0]);
console.log('DPX balance of Address 2', balances[1]);
console.log('ETH balance of Address 3', balances[2]);
```

### Helper Functions

- `getEthBalance`
  Gets the ETH balance of an address

  ```js
  const ethBalance = multicall.getEthBalance('address');
  ```

- `getBlockHash`
  Gets the block hash

  ```js
  const blockHash = multicall.getBlockHash(blockNumber);
  ```

- `getLastBlockHash`
  Gets the last blocks hash

  ```js
  const lastBlockHash = multicall.getLastBlockHash();
  ```

- `getCurrentBlockTimestamp`
  Gets the current block timestamp

  ```js
  const currentBlockTimestamp = multicall.getCurrentBlockTimestamp();
  ```

- `getCurrentBlockDifficulty`
  Gets the current block difficulty

  ```js
  const currentBlockDifficulty = multicall.getCurrentBlockDifficulty();
  ```

- `getCurrentBlockGasLimit`
  Gets the current block gas limit

  ```js
  const currentBlockGasLimit = multicall.getCurrentBlockGasLimit();
  ```

- `getCurrentBlockCoinbase`
  Gets the current block coinbase

  ```js
  const currentBlockCoinbase = multicall.getCurrentBlockCoinbase();
  ```

## License

This project is licensed under the MIT License - Copyright (c) 2021 Dopex
