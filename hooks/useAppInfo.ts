import { useContractReads } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";

export function useAppInfo() {
    return useContractReads({
        contracts: [
            {
                ...NativeTokenContract,
                functionName: "balanceOf",
                args: [NativeTokenContract.address],
            },
        ],
        watch: true,
        select: (data) => ({
            rewardBalance: data[0],
        })
    })
}
