import { useContractRead } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";

export function useRewardBalance() {
    return useContractRead({
        ...NativeTokenContract,
        functionName: "balanceOf",
        args: [NativeTokenContract.address],
        watch: true,
    })
}
