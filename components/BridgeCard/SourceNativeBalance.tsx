"use client"

import { formatUnits } from "viem"
import { formatAmount } from "@/lib/utils"
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"

export function SourceNativeBalance() {
    const sourceNativeTokenBalance = useSourceNativeBalance()

    const balance = sourceNativeTokenBalance.data?.value ?? 0n
    const decimals = sourceNativeTokenBalance.data?.decimals ?? 0

    if (!sourceNativeTokenBalance.isSuccess) {
        return <span>-</span>
    }

    return (
        <span title={formatUnits(balance, decimals)}>
            {formatAmount(balance, decimals)}
        </span>
    )
}
