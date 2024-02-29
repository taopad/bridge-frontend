import { useEffect } from "react"
import { useAccount, useBlockNumber, useBalance } from "wagmi"

export function useSourceNativeBalance() {
    const { address } = useAccount()
    const { data: blockNumber } = useBlockNumber({ watch: true })

    const hook = useBalance({ address })

    useEffect(() => { hook.refetch() }, [blockNumber])

    return hook
}
