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

interface AngelaListInterface extends ethers.utils.Interface {
  functions: {
    "initialize(bytes32)": FunctionFragment;
    "merkleRoot()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateMerkleRoot(bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "initialize",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "merkleRoot",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateMerkleRoot",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "merkleRoot", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateMerkleRoot",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "merkleRootUpdated(bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "merkleRootUpdated"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type merkleRootUpdatedEvent = TypedEvent<
  [string] & { _merkleRoot: string }
>;

export class AngelaList extends BaseContract {
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

  interface: AngelaListInterface;

  functions: {
    initialize(
      _merkleRoot: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    merkleRoot(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateMerkleRoot(
      _newRoot: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  initialize(
    _merkleRoot: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  merkleRoot(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateMerkleRoot(
    _newRoot: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    initialize(
      _merkleRoot: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    merkleRoot(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateMerkleRoot(
      _newRoot: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    "merkleRootUpdated(bytes32)"(
      _merkleRoot?: null
    ): TypedEventFilter<[string], { _merkleRoot: string }>;

    merkleRootUpdated(
      _merkleRoot?: null
    ): TypedEventFilter<[string], { _merkleRoot: string }>;
  };

  estimateGas: {
    initialize(
      _merkleRoot: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    merkleRoot(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateMerkleRoot(
      _newRoot: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    initialize(
      _merkleRoot: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    merkleRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateMerkleRoot(
      _newRoot: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
