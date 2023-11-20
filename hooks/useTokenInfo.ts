import { useContractReads } from "wagmi";
import { NativeTokenContract, RewardTokenContract } from "@/config/contract";

export function useTokenInfo() {
    return useContractReads({
        contracts: [
            {
                ...NativeTokenContract,
                functionName: "symbol",
            },
            {
                ...NativeTokenContract,
                functionName: "decimals",
            },
            {
                ...RewardTokenContract,
                functionName: "symbol",
            },
            {
                ...RewardTokenContract,
                functionName: "decimals",
            },
        ],
        select: (data) => ({
            native: {
                symbol: data[0],
                decimals: data[1],
            },
            reward: {
                symbol: data[2],
                decimals: data[3],
            },
        })
    })
}
