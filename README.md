# web3-mulitcall

A library to do multiple calls via a single `eth_call` using [web3](https://github.com/ChainSafe/web3.js).

## Usage

### Basic

```js
import Multicall from 'web3-multicall';

import erc20Abi from './abi/erc20.json';

const dpxAddress = '0xeec2be5c91ae7f8a338e1e5f3b5de49d07afdc81';

async function main() {
  const web3 = new Web3(provider /* Your Web3 HTTP provider here */);

  const multicall = new Multicall({
    chainId: 1,
    provider: 'Your Web3 HTTP provider here',
  });

  const dpxContract = new web3.eth.Contract(dpxAddress, erc20Abi);

  const balances = await multicall.aggregate([
    dpxContract.methods.balanceOf('Address 1'),
    dpxContract.methods.balanceOf('Address 2'),
    dpxContract.methods.balanceOf('Address 3'),
  ]);

  console.log('DPX balance of Address 1', balances[0]);
  console.log('DPX balance of Address 2', balances[1]);
  console.log('DPX balance of Address 3', balances[2]);
}

main();
```
