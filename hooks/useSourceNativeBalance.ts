import { useAccount, useBalance } from "wagmi";
import { SupportedChainId } from "@/config/chains";
import { useSourceChainId } from "./useSourceChainId";

export function useSourceNativeBalance() {
    const chainId = useSourceChainId()
    const { isConnected, address } = useAccount()

    const enabled = isConnected && chainId != undefined

    return useBalance({ chainId, address, enabled, scopeKey: address });
}
