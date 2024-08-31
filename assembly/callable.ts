import { BytesWriter } from "@btc-vision/btc-runtime/runtime/buffer/BytesWriter";
import { BytesReader } from "@btc-vision/btc-runtime/runtime/buffer/BytesReader";
import { BlockchainEnvironment } from "@btc-vision/btc-runtime/runtime/env/BTCEnvironment";
import { Address } from "@btc-vision/btc-runtime/runtime/types/Address";
namespace callable {
  export BytesWriter;
  export BytesReader;
  export Address;
  interface Callable {
    static at<T extends Callable>(v: Address): T;
    address: Address;
  }
  function extcall(destinationContract: Address, calldata: BytesWriter): BytesReader {
    const blockchain = new BlockchainEnvironment();
    blockchain.__callee = "";
    return blockchain.call(destinationContract, calldata);
  }
}

