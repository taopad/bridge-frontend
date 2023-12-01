import { useContractRead } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";

export function useCollectedTax() {
    return useContractRead({
        ...NativeTokenContract,
        functionName: "balanceOf",
        args: [NativeTokenContract.address],
        watch: true,
    })
}
