import { useNetwork, useAccount, useBalance } from "wagmi";
import { SupportedChainId } from "@/config/chains";

export function useSourceNativeBalance() {
    const { chain } = useNetwork()
    const { isConnected, address } = useAccount()

    const chainId = chain && !chain.unsupported ? chain.id as SupportedChainId : undefined

    const enabled = isConnected && chainId != undefined

    return useBalance({ chainId, address, enabled, scopeKey: address });
}
