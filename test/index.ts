import { callable } from "../assembly/index.ts";

@callable
interface IStaking {
  address(): callable.Address;
}

export function _start(): void {
  const staking = new IStaking("bc1address");
  console.log(staking.address());
}
