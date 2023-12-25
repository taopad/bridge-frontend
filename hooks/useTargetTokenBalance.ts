import { useContext } from "react";
import { useAccount, useBalance } from "wagmi";
import { TokenContracts } from "@/config/contracts";
import { TargetChainContext } from "@/components/TargetChainProvider";

export function useTargetTokenBalance() {
    const { isConnected, address } = useAccount()
    const { targetChainId: chainId } = useContext(TargetChainContext)

    const token = chainId ? TokenContracts[chainId].address : "0x0"

    const enabled = isConnected && chainId != undefined

    return useBalance({ chainId, address, token, enabled, scopeKey: address });
}
