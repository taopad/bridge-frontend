"use client"

import { formatUnits } from "viem"
import { formatAmount } from "@/lib/utils"
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"

export function SourceNativeBalance() {
    const sourceNativeBalance = useSourceNativeBalance()

    const balance = sourceNativeBalance.data?.value ?? 0n
    const decimals = sourceNativeBalance.data?.decimals ?? 0

    if (!sourceNativeBalance.isSuccess) {
        return <span>-</span>
    }

    return (
        <span title={formatUnits(balance, decimals)}>
            {formatAmount(balance, decimals)}
        </span>
    )
}
