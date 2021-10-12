import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { provider } from 'web3-core';

import { CHAIN_ID_TO_MULTICALL_ADDRESS } from './constants';
import mulitcallAbi from './abi/Multicall.json';

interface ConstructorArgs {
  chainId?: number;
  provider: provider;
  multicallAddress?: string;
}

export default class Multicall {
  web3: Web3;
  multicall: Contract;

  constructor({ chainId, provider, multicallAddress }: ConstructorArgs) {
    this.web3 = new Web3(provider);

    const _multicallAddress = multicallAddress
      ? multicallAddress
      : chainId
      ? CHAIN_ID_TO_MULTICALL_ADDRESS[chainId]
      : undefined;

    if (!_multicallAddress) {
      throw new Error(
        'No address found via chainId. Please specify multicallAddress.'
      );
    }

    this.multicall = new this.web3.eth.Contract(
      mulitcallAbi as AbiItem[],
      _multicallAddress
    );
  }

  async aggregate(calls: any[]) {
    const callRequests = calls.map((call) => {
      const callData = call.encodeABI();
      return {
        target: call._parent._address,
        callData,
      };
    });

    const { returnData } = await this.multicall.methods
      .aggregate(callRequests)
      .call();

    return returnData.map((hex: string, index: number) => {
      const types = calls[index]._method.outputs.map(
        (o: any) => ((o.internalType !== o.type) && (o.internalType !== undefined)) ? o : o.type
      );

      let result = this.web3.eth.abi.decodeParameters(types, hex);

      delete result.__length__;

      result = Object.values(result);

      return result.length === 1 ? result[0] : result;
    });
  }

  getEthBalance(address: string) {
    return this.multicall.methods.getEthBalance(address);
  }

  getBlockHash(blockNumber: string | number) {
    return this.multicall.methods.getBlockHash(blockNumber);
  }

  getLastBlockHash() {
    return this.multicall.methods.getLastBlockHash();
  }

  getCurrentBlockTimestamp() {
    return this.multicall.methods.getCurrentBlockTimestamp();
  }

  getCurrentBlockDifficulty() {
    return this.multicall.methods.getCurrentBlockDifficulty();
  }

  getCurrentBlockGasLimit() {
    return this.multicall.methods.getCurrentBlockGasLimit();
  }

  getCurrentBlockCoinbase() {
    return this.multicall.methods.getCurrentBlockCoinbase();
  }
}
