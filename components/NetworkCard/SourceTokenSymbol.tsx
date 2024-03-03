"use client"

import { useAccount } from "wagmi"
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"

export function SourceTokenSymbol() {
    const { isConnected } = useAccount()
    const sourceTokenBalance = useSourceTokenBalance()

    const symbol = sourceTokenBalance.data?.symbol ?? ""

    if (!isConnected || !sourceTokenBalance.isSuccess) {
        return null
    }

    return <span>${symbol}</span>
}
