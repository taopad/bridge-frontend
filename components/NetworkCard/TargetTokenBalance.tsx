"use client";

import { useAccount } from "wagmi";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useTargetTokenBalance } from "@/hooks/useTargetTokenBalance";

export function TargetTokenBalance() {
    const { isConnected } = useAccount()
    const balance = useTargetTokenBalance()
    const hasMounted = useHasMounted()

    if (!hasMounted) return <span>-</span>

    if (!isConnected) return <span>Wallet not connected</span>

    if (balance.isSuccess && balance.data) {
        return <span>{balance.data.formatted} ${balance.data.symbol}</span>
    }

    return <span>No target chain selected</span>
}
