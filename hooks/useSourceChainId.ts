import { useNetwork, useAccount } from "wagmi";
import { SupportedChainId } from "@/config/chains";

export function useSourceChainId() {
    const { chain } = useNetwork()
    const { isConnected } = useAccount()

    return isConnected && chain && !chain.unsupported ? chain.id as SupportedChainId : undefined
}
