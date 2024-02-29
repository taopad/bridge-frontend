"use client"

import { useHasMounted } from "@/hooks/useHasMounted"
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"
import { formatAmount } from "@/utils/formatAmount"

export function SourceNativeBalance() {
    const hasMounted = useHasMounted()
    const balance = useSourceNativeBalance()

    if (!hasMounted || !balance.isSuccess || balance.data === undefined) {
        return <span>-</span>
    }

    return <span>{formatAmount(balance.data.value, balance.data.decimals)} ${balance.data.symbol}</span>
}
