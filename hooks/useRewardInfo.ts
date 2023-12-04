import { useContractReads } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";

export function useRewardInfo() {
    return useContractReads({
        contracts: [
            {
                ...NativeTokenContract,
                functionName: "balanceOf",
                args: [NativeTokenContract.address],
            },
            {
                ...NativeTokenContract,
                functionName: "amountToSwapETH",
            },
            {
                ...NativeTokenContract,
                functionName: "rewardBalance",
            }
        ],
        watch: true,
        select: (data) => ({
            collectedTax: data[0],
            amountToSwapETH: data[1],
            donations: data[2],
        }),
    })
}
