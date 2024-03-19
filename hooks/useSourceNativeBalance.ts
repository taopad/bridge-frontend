import { useEffect } from "react"
import { useAccount, useBlockNumber, useBalance } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"

export function useSourceNativeBalance() {
    const { address } = useAccount()
    const { sourceToken } = useTokenConfig()

    const chainId = sourceToken?.chain.id

    const hook = useBalance({ chainId, address })

    const { data: blockNumber } = useBlockNumber({ chainId, watch: true })

    useEffect(() => { hook.refetch() }, [blockNumber])

    return hook
}
