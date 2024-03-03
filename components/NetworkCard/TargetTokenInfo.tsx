"use client"

import { useAccount } from "wagmi"
import { useTokenConfig } from "@/hooks/useTokenConfig"
import { TargetTokenSymbol } from "./TargetTokenSymbol"
import { TargetTokenBalance } from "./TargetTokenBalance"

export function TargetTokenInfo() {
    const { isConnected } = useAccount()
    const { targetToken } = useTokenConfig()

    if (!isConnected || targetToken === undefined) {
        return <span>-</span>
    }

    return <span><TargetTokenBalance /> <TargetTokenSymbol /></span>
}
