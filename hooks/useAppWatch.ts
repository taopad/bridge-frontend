import { useContractReads } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";

export function useAppWatch() {
    return useContractReads({
        contracts: [
            {
                ...NativeTokenContract,
                functionName: "totalShares",
            },
            {
                ...NativeTokenContract,
                functionName: "totalRewardDistributed",
            },
            {
                ...NativeTokenContract,
                functionName: "amountToSwapETH",
            },
            {
                ...NativeTokenContract,
                functionName: "rewardBalance",
            },
        ],
        watch: true,
        select: (data) => ({
            totalShares: data[0],
            totalRewardDistributed: data[1],
            collectedTax: data[2],
            donations: data[3],
        }),
    })
}
