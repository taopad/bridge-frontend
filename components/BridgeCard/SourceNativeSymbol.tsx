"use client"

import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"

export function SourceNativeSymbol() {
    const sourceNativeBalance = useSourceNativeBalance()

    const symbol = sourceNativeBalance.data?.symbol ?? ""

    if (!sourceNativeBalance.isSuccess) {
        return null
    }

    return <span>${symbol}</span>
}
