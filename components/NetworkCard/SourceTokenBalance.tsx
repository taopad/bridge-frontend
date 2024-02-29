"use client"

import { formatUnits } from "viem"
import { useHasMounted } from "@/hooks/useHasMounted"
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"

export function SourceTokenBalance() {
    const hasMounted = useHasMounted()
    const balance = useSourceTokenBalance()

    if (!hasMounted || !balance.isSuccess || balance.data === undefined) {
        return <span>-</span>
    }

    return <span>{formatUnits(balance.data.value, balance.data.decimals)} ${balance.data.symbol}</span>
}
