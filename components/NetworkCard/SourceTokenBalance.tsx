"use client"

import { useAccount } from "wagmi"
import { formatUnits } from "viem"
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"

export function SourceTokenBalance({ children }: { children: string }) {
    const { isConnected } = useAccount()
    const balance = useSourceTokenBalance()

    if (!isConnected) {
        return <span>-</span>
    }

    if (!balance.isSuccess || balance.data === undefined) {
        return <span>{children}</span>
    }

    return <span>{formatUnits(balance.data.value, balance.data.decimals)} ${balance.data.symbol}</span>
}
