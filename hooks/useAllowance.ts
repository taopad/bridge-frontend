import { useAccount, useContractRead } from "wagmi";
import { getTokenContract, getOftContract } from "@/config/contracts";
import { useSourceChainId } from "./useSourceChainId";

export function useAllowance() {
    const sourceChainId = useSourceChainId()
    const { isConnected, address } = useAccount()

    const oft = getOftContract(sourceChainId)
    const token = getTokenContract(sourceChainId)

    return useContractRead({
        ...token,
        functionName: "allowance",
        args: [address ?? "0x", oft.address ?? "0x"],
        scopeKey: address,
        enabled: isConnected && sourceChainId != undefined,
    })
}
