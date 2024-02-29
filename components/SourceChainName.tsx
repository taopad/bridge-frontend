"use client"

import { useHasMounted } from "@/hooks/useHasMounted"
import { useTokenConfig } from "@/hooks/useTokenConfig"

export function SourceChainName() {
    const hasMounted = useHasMounted()
    const { sourceToken } = useTokenConfig()

    if (!hasMounted || sourceToken === undefined) {
        return <span>-</span>
    }

    return <span>{sourceToken.info.chain.name}</span>
}
