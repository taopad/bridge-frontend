"use client";

import { formatUnits } from "viem";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function PendingRewards() {
    const userInfo = useUserInfo()
    const tokenInfo = useTokenInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess && userInfo.isSuccess

    const decimals = tokenInfo.data?.reward.decimals.result ?? 0
    const balance = userInfo.data?.rewards.result ?? 0n

    return (
        <span>
            {loaded ? formatUnits(balance, decimals) : '-'}
        </span>
    )
}
