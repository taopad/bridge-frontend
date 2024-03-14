import { useAccount, useBalance } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"

export function useSourceNativeBalance() {
    const { address } = useAccount()
    const { sourceToken } = useTokenConfig()

    const chainId = sourceToken?.chain.id

    return useBalance({ chainId, address })
}
