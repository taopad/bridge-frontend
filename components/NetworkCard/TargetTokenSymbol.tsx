"use client"

import { useAccount } from "wagmi"
import { useTargetTokenBalance } from "@/hooks/useTargetTokenBalance"

export function TargetTokenSymbol() {
    const { isConnected } = useAccount()
    const targetTokenBalance = useTargetTokenBalance()

    const symbol = targetTokenBalance.data?.symbol ?? ""

    if (!isConnected || !targetTokenBalance.isSuccess) {
        return null
    }

    return <span>${symbol}</span>
}
