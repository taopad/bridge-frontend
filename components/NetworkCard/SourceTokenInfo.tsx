"use client"

import { useAccount } from "wagmi"
import { useTokenConfig } from "@/hooks/useTokenConfig"
import { SourceTokenSymbol } from "./SourceTokenSymbol"
import { SourceTokenBalance } from "./SourceTokenBalance"

export function SourceTokenInfo() {
    const { isConnected } = useAccount()
    const { sourceToken } = useTokenConfig()

    if (!isConnected || sourceToken === undefined) {
        return <span>-</span>
    }

    return <span><SourceTokenBalance /> <SourceTokenSymbol /></span>
}
