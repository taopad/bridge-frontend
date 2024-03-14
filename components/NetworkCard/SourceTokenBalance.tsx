"use client"

import { formatUnits } from "viem"
import { formatAmount } from "@/lib/utils"
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"

export function SourceTokenBalance() {
    const sourceTokenBalance = useSourceTokenBalance()

    const balance = sourceTokenBalance.data?.value ?? 0n
    const decimals = sourceTokenBalance.data?.decimals ?? 0

    if (!sourceTokenBalance.isSuccess) {
        return null
    }

    return (
        <span title={formatUnits(balance, decimals)}>
            {formatAmount(balance, decimals)}
        </span>
    )
}
