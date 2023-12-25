import { useAccount, useBalance } from "wagmi";
import { getTokenContract } from "@/config/contracts";
import { useSourceChainId } from "./useSourceChainId";

export function useSourceTokenBalance() {
    const chainId = useSourceChainId()
    const { isConnected, address } = useAccount()

    const contract = getTokenContract(chainId)

    const token = contract.address ?? "0x0"

    const enabled = isConnected && chainId != undefined

    return useBalance({ chainId, address, token, enabled, scopeKey: address });
}
