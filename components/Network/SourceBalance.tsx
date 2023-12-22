"use client";

import { useHasMounted } from "@/hooks/useHasMounted";
import { useSourceBalance } from "@/hooks/useSourceBalance";
import { useSourceChainInfo } from "@/hooks/useSourceChainInfo";

export function SourceBalance() {
    const chain = useSourceChainInfo()
    const balance = useSourceBalance()
    const hasMounted = useHasMounted()

    if (hasMounted && balance.isSuccess && balance.data && chain.info) {
        return <span>{balance.data.formatted} ${balance.data.symbol} on {chain.info.name}</span>
    }

    return null
}
