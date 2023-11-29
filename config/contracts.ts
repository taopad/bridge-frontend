import NativeTokenAbi from "./abi/ERC20Rewards";
import RewardTokenAbi from "./abi/IERC20Metadata";
import CompounderAbi from "./abi/ERC20RewardsCompounder";
import IUniswapV2RouterAbi from "./abi/IUniswapV2Router02";

if (!process.env.NEXT_PUBLIC_ROUTER_ADDRESS) throw Error("NEXT_PUBLIC_ROUTER_ADDRESS env variable must be set");
if (!process.env.NEXT_PUBLIC_NATIVE_TOKEN_ADDRESS) throw Error("NEXT_PUBLIC_NATIVE_TOKEN_ADDRESS env variable must be set");
if (!process.env.NEXT_PUBLIC_REWARD_TOKEN_ADDRESS) throw Error("NEXT_PUBLIC_REWARD_TOKEN_ADDRESS env variable must be set");
if (!process.env.NEXT_PUBLIC_COMPOUNDER_ADDRESS) throw Error("NEXT_PUBLIC_COMPOUNDER_ADDRESS env variable must be set");

export const RouterContract = {
    abi: IUniswapV2RouterAbi,
    address: process.env.NEXT_PUBLIC_ROUTER_ADDRESS as `0x${string}`,
}

export const NativeTokenContract = {
    abi: NativeTokenAbi,
    address: process.env.NEXT_PUBLIC_NATIVE_TOKEN_ADDRESS as `0x${string}`,
}

export const RewardTokenContract = {
    abi: RewardTokenAbi,
    address: process.env.NEXT_PUBLIC_REWARD_TOKEN_ADDRESS as `0x${string}`,
}

export const CompounderContract = {
    abi: CompounderAbi,
    address: process.env.NEXT_PUBLIC_COMPOUNDER_ADDRESS as `0x${string}`,
}
