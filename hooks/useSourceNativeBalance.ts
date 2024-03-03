import { useEffect } from "react"
import { useAccount, useBlockNumber, useBalance } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"

export function useSourceNativeBalance() {
    const { address } = useAccount()
    const { sourceToken } = useTokenConfig()

    const sourceTokenChainId = sourceToken?.chain.id

    const { data: blockNumber } = useBlockNumber({
        chainId: sourceTokenChainId,
        watch: true,
    })

    const hook = useBalance({ address })

    useEffect(() => { hook.refetch() }, [blockNumber])

    return hook
}
