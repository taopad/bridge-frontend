"use client"

import { formatAmount } from "@/utils/formatAmount"
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"

export function SourceNativeBalance() {
    const balance = useSourceNativeBalance()

    if (!balance.isSuccess || balance.data === undefined) {
        return <span>-</span>
    }

    return <span>{formatAmount(balance.data.value, balance.data.decimals)} ${balance.data.symbol}</span>
}
