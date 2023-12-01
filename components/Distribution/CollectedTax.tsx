"use client";

import { formatUnits } from "viem";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useCollectedTax } from "@/hooks/useCollectedTax";
import { formatAmount } from "@/utils/formatAmount";

export function CollectedTax() {
    const tokenInfo = useTokenInfo()
    const hasMounted = useHasMounted()
    const collectedTax = useCollectedTax()

    const loaded = hasMounted && tokenInfo.isSuccess && collectedTax.isSuccess

    const amount = collectedTax.data ?? 0n
    const decimals = tokenInfo.data?.native.decimals.result ?? 0
    const units = formatUnits(amount, decimals)

    if (loaded) {
        return <span title={units}>{formatAmount(units)}</span>
    }

    return null
}
