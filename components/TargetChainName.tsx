"use client"

import { useTokenConfig } from "@/hooks/useTokenConfig"

export function TargetChainName() {
    const { targetToken } = useTokenConfig()

    if (targetToken === undefined) {
        return null
    }

    return <span>{targetToken.chain.name}</span>
}
