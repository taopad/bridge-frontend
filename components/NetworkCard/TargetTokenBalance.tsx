"use client"

import { formatUnits } from "viem"
import { useHasMounted } from "@/hooks/useHasMounted"
import { useTargetTokenBalance } from "@/hooks/useTargetTokenBalance"

export function TargetTokenBalance() {
    const hasMounted = useHasMounted()
    const balance = useTargetTokenBalance()

    if (!hasMounted || !balance.isSuccess || balance.data === undefined) {
        return <span>-</span>
    }

    return <span>{formatUnits(balance.data.value, balance.data.decimals)} ${balance.data.symbol}</span>
}
