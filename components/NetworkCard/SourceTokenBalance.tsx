"use client"

import { useAccount } from "wagmi"
import { formatUnits } from "viem"
import { useHasMounted } from "@/hooks/useHasMounted"
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"

export function SourceTokenBalance({ children }: { children: string }) {
    const hasMounted = useHasMounted()
    const balance = useSourceTokenBalance()
    const { isConnected } = useAccount()

    if (!hasMounted || !isConnected) {
        return <span>-</span>
    }

    if (!balance.isSuccess || balance.data === undefined) {
        return <span>{children}</span>
    }

    return <span>{formatUnits(balance.data.value, balance.data.decimals)} ${balance.data.symbol}</span>
}
