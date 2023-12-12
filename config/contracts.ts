import NativeTokenAbi from "./abi/NativeToken";
import RewardTokenAbi from "./abi/IERC20Metadata";
import IUniswapV2RouterAbi from "./abi/IUniswapV2Router02";
import IQuoterAbi from "./abi/IQuoter";

if (!process.env.NEXT_PUBLIC_ROUTER_ADDRESS) throw Error("NEXT_PUBLIC_ROUTER_ADDRESS env variable must be set");
if (!process.env.NEXT_PUBLIC_QUOTER_ADDRESS) throw Error("NEXT_PUBLIC_QUOTER_ADDRESS env variable must be set");
if (!process.env.NEXT_PUBLIC_NATIVE_TOKEN_ADDRESS) throw Error("NEXT_PUBLIC_NATIVE_TOKEN_ADDRESS env variable must be set");
if (!process.env.NEXT_PUBLIC_REWARD_TOKEN_ADDRESS) throw Error("NEXT_PUBLIC_REWARD_TOKEN_ADDRESS env variable must be set");

export const RouterContract = {
    abi: IUniswapV2RouterAbi,
    address: process.env.NEXT_PUBLIC_ROUTER_ADDRESS as `0x${string}`,
}

export const QuoterContract = {
    abi: IQuoterAbi,
    address: process.env.NEXT_PUBLIC_QUOTER_ADDRESS as `0x${string}`,
}

export const NativeTokenContract = {
    abi: NativeTokenAbi,
    address: process.env.NEXT_PUBLIC_NATIVE_TOKEN_ADDRESS as `0x${string}`,
}

export const RewardTokenContract = {
    abi: RewardTokenAbi,
    address: process.env.NEXT_PUBLIC_REWARD_TOKEN_ADDRESS as `0x${string}`,
}
