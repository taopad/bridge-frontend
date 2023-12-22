import { useNetwork, useAccount, useBalance } from "wagmi";
import { TokenContracts } from "@/config/contracts";
import { SupportedChainId } from "@/config/chains";

export function useSourceBalance() {
    const { chain } = useNetwork()
    const { isConnected, address } = useAccount()

    const chainId = chain && !chain.unsupported ? chain.id as SupportedChainId : undefined

    const token = chainId ? TokenContracts[chainId].address : undefined

    const enabled = isConnected && chainId != undefined

    return useBalance({ chainId, address, token, enabled, scopeKey: address });
}
