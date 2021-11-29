/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ICTestInterface extends ethers.utils.Interface {
  functions: {
    "burn(uint256)": FunctionFragment;
    "mintWithSig(address,string,string,address,address,uint16,(uint256,uint8,bytes32,bytes32))": FunctionFragment;
    "permit(address,uint256,(uint256,uint8,bytes32,bytes32))": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "mintWithSig",
    values: [
      string,
      string,
      string,
      string,
      string,
      BigNumberish,
      { deadline: BigNumberish; v: BigNumberish; r: BytesLike; s: BytesLike }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [
      string,
      BigNumberish,
      { deadline: BigNumberish; v: BigNumberish; r: BytesLike; s: BytesLike }
    ]
  ): string;

  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintWithSig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;

  events: {};
}

export class ICTest extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ICTestInterface;

  functions: {
    burn(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintWithSig(
      _to: string,
      _metadataURI: string,
      _contentURI: string,
      _creator: string,
      _royaltyPayoutAddress: string,
      _royaltyBPS: BigNumberish,
      _signature: {
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    permit(
      spender: string,
      _tokenId: BigNumberish,
      _signature: {
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  burn(
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintWithSig(
    _to: string,
    _metadataURI: string,
    _contentURI: string,
    _creator: string,
    _royaltyPayoutAddress: string,
    _royaltyBPS: BigNumberish,
    _signature: {
      deadline: BigNumberish;
      v: BigNumberish;
      r: BytesLike;
      s: BytesLike;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  permit(
    spender: string,
    _tokenId: BigNumberish,
    _signature: {
      deadline: BigNumberish;
      v: BigNumberish;
      r: BytesLike;
      s: BytesLike;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    burn(tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    mintWithSig(
      _to: string,
      _metadataURI: string,
      _contentURI: string,
      _creator: string,
      _royaltyPayoutAddress: string,
      _royaltyBPS: BigNumberish,
      _signature: {
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    permit(
      spender: string,
      _tokenId: BigNumberish,
      _signature: {
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    burn(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintWithSig(
      _to: string,
      _metadataURI: string,
      _contentURI: string,
      _creator: string,
      _royaltyPayoutAddress: string,
      _royaltyBPS: BigNumberish,
      _signature: {
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    permit(
      spender: string,
      _tokenId: BigNumberish,
      _signature: {
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    burn(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintWithSig(
      _to: string,
      _metadataURI: string,
      _contentURI: string,
      _creator: string,
      _royaltyPayoutAddress: string,
      _royaltyBPS: BigNumberish,
      _signature: {
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    permit(
      spender: string,
      _tokenId: BigNumberish,
      _signature: {
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
