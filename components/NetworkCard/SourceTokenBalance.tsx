"use client";

import { useHasMounted } from "@/hooks/useHasMounted";
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance";

export function SourceTokenBalance() {
    const balance = useSourceTokenBalance()
    const hasMounted = useHasMounted()

    if (!hasMounted) return <span>-</span>

    if (balance.isSuccess && balance.data) {
        return <span>{balance.data.formatted} ${balance.data.symbol}</span>
    }

    return <span>Connect to source chain</span>
}
