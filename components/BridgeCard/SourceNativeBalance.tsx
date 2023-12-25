"use client";

import { useHasMounted } from "@/hooks/useHasMounted";
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance";
import { formatAmount } from "@/utils/formatAmount";

export function SourceNativeBalance() {
    const balance = useSourceNativeBalance()
    const hasMounted = useHasMounted()

    if (!hasMounted) return <span>-</span>

    if (balance.isSuccess && balance.data) {
        return <span>Native token balance: {formatAmount(balance.data.formatted)} ${balance.data.symbol}</span>
    }

    return <span>-</span>
}
