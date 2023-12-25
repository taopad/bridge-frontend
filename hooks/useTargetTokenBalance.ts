import { useAccount, useBalance } from "wagmi";
import { getTokenContract } from "@/config/contracts";
import { useTargetChainId } from "./useTargetChainId";

export function useTargetTokenBalance() {
    const chainId = useTargetChainId()
    const { isConnected, address } = useAccount()

    const contract = getTokenContract(chainId)

    const token = contract.address ?? "0x0"

    const enabled = isConnected && chainId != undefined

    return useBalance({ chainId, address, token, enabled, scopeKey: address });
}
