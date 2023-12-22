"use client";

import { useAccount } from "wagmi";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useTargetBalance } from "@/hooks/useTargetBalance";

export function TargetBalance() {
    const { isConnected } = useAccount()
    const balance = useTargetBalance()
    const hasMounted = useHasMounted()

    if (!hasMounted) return <span>-</span>

    if (!isConnected) return <span>Wallet not connected</span>

    if (balance.isSuccess && balance.data) {
        return <span>{balance.data.formatted} ${balance.data.symbol}</span>
    }

    return <span>No target chain selected</span>
}
