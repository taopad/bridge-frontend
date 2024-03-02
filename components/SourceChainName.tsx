"use client"

import { useTokenConfig } from "@/hooks/useTokenConfig"

export function SourceChainName() {
    const { sourceToken } = useTokenConfig()

    if (sourceToken === undefined) {
        return null
    }

    return <span>{sourceToken.info.chain.name}</span>
}
