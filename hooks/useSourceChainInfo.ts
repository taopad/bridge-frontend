import { useNetwork, useAccount } from "wagmi";
import { SupportedChainId, info } from "@/config/chains";

export function useSourceChainInfo() {
    const { chain } = useNetwork()
    const { isConnected } = useAccount()

    const id = isConnected && chain && !chain.unsupported ? chain.id as SupportedChainId : undefined
    const selected = id ? info[id] : undefined

    return { id, info: selected }
}
