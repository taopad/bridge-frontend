"use client"

import { useHasMounted } from "@/hooks/useHasMounted"
import { useTokenConfig } from "@/hooks/useTokenConfig"

export function TargetChainName() {
    const hasMounted = useHasMounted()
    const { targetToken } = useTokenConfig()

    if (!hasMounted || targetToken === undefined) {
        return <span>-</span>
    }

    return <span>{targetToken.info.chain.name}</span>
}
