"use client"

import { formatUnits } from "viem"
import { formatAmount } from "@/lib/utils"
import { useTargetTokenBalance } from "@/hooks/useTargetTokenBalance"

export function TargetTokenBalance() {
    const targetTokenBalance = useTargetTokenBalance()

    const balance = targetTokenBalance.data?.value ?? 0n
    const decimals = targetTokenBalance.data?.decimals ?? 0

    if (!targetTokenBalance.isSuccess) {
        return null
    }

    return (
        <span title={formatUnits(balance, decimals)}>
            {formatAmount(balance, decimals)}
        </span>
    )
}
