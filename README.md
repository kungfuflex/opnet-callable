# opnet-callable

AssemblyScript transform to enable `@callable` decorator for an interface. Interfaces decorated with `@callable` function similar to interface defitions in Solidity, where they can be constructed with an address argument and their methods called as functions which automatically ABI encode arguments and ABI decode result values.

## Installation

```sh
yarn add https://github.com/kungfuflex/opnet-callable
```

## Usage

```js
import { u256 } from "as-bignum/assembly";
import { callable } from "opnet-callable";

@callable
interface IStaking {
  totalValueLockedForAddress(user: callable.Address): u256;
}

function callStaking(): u256 {
  const result = new IStaking("bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297").totalValueLockedForAddress("bc1pkgdwl8qlcxxc06ezsqans2x379t7drqh8u95k8wax8wr6ww5d4ssxu04q2");
  result.toU32(); // consume u256 result

}
```

## Author

flex

## License

MIT
