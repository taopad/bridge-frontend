import { useContext } from "react";
import { useAccount, useBalance } from "wagmi";
import { TokenContracts } from "@/config/contracts";
import { TargetChainContext } from "@/components/TargetChainProvider";

export function useTargetBalance() {
    const { isConnected, address } = useAccount()
    const { targetChainId: chainId } = useContext(TargetChainContext)

    const token = chainId ? TokenContracts[chainId].address : undefined

    const enabled = isConnected && chainId != undefined

    return useBalance({ chainId, address, token, enabled, scopeKey: address });
}
