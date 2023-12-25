import { useNetwork, useAccount, useBalance } from "wagmi";
import { TokenContracts } from "@/config/contracts";
import { SupportedChainId } from "@/config/chains";

export function useSourceTokenBalance() {
    const { chain } = useNetwork()
    const { isConnected, address } = useAccount()

    const chainId = chain && !chain.unsupported ? chain.id as SupportedChainId : undefined

    const token = chainId ? TokenContracts[chainId].address : "0x0"

    const enabled = isConnected && chainId != undefined

    return useBalance({ chainId, address, token, enabled, scopeKey: address });
}
