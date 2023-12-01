import { useAccount, useContractReads } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";

export function useUserInfo() {
    const { isConnected, address } = useAccount()

    return useContractReads({
        contracts: [
            {
                ...NativeTokenContract,
                functionName: "balanceOf",
                args: [address ?? "0x"],
            },
            {
                ...NativeTokenContract,
                functionName: "pendingRewards",
                args: [address ?? "0x"],
            },
            {
                ...NativeTokenContract,
                functionName: "lastUpdateBlock",
                args: [address ?? "0x"],
            },
        ],
        watch: true,
        scopeKey: address,
        enabled: isConnected,
        select: (data) => ({
            balance: data[0],
            rewards: data[1],
            lastUpdateBlock: data[2],
        })
    })
}
