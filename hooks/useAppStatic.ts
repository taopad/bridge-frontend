import { useContractReads } from "wagmi";
import { NativeTokenContract, RewardTokenContract } from "@/config/contracts";

export function useAppStatic() {
    return useContractReads({
        contracts: [
            {
                ...NativeTokenContract,
                functionName: "buyFee",
            },
            {
                ...NativeTokenContract,
                functionName: "sellFee",
            },
            {
                ...NativeTokenContract,
                functionName: "feeDenominator",
            },
            {
                ...NativeTokenContract,
                functionName: "poolFee",
            },
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
            {
                ...NativeTokenContract,
                functionName: "startBlock",
            },
        ],
        select: (data) => ({
            buyFee: data[0],
            sellFee: data[1],
            feeDenominator: data[2],
            poolFee: data[3],
            tokens: {
                native: {
                    symbol: data[4],
                    decimals: data[5],
                },
                reward: {
                    symbol: data[6],
                    decimals: data[7],
                },
            },
            startBlock: data[8],
        })
    })
}
