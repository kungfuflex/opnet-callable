import { BytesWriter as _BytesWriter } from "@btc-vision/btc-runtime/runtime/buffer/BytesWriter";
import { BytesReader as _BytesReader } from "@btc-vision/btc-runtime/runtime/buffer/BytesReader";
import { Blockchain } from "@btc-vision/btc-runtime/runtime/env";
import { Address as _Address } from "@btc-vision/btc-runtime/runtime/types/Address";
import { encodeSelector as _encodeSelector, Selector } from "@btc-vision/btc-runtime/runtime/math/abi";

export namespace callable {
  export type BytesReader = _BytesReader;
  export type Address = _Address;
  interface Callable {
    _target: _Address;
  }
  export function BytesWriter(): _BytesWriter {
    return new _BytesWriter();
  }
  export function encodeSelector(v: string): Selector {
    return _encodeSelector(v);
  }
  function extcall(destinationContract: _Address, calldata: _BytesWriter): BytesReader {
    return Blockchain.call(destinationContract, calldata);
  }
}

