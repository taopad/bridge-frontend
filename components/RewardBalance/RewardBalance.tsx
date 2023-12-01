"use client";

import { formatUnits } from "viem";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useRewardBalance } from "@/hooks/useRewardBalance";

export function RewardBalance() {
    const tokenInfo = useTokenInfo()
    const hasMounted = useHasMounted()
    const rewardBalance = useRewardBalance()

    const loaded = hasMounted && tokenInfo.isSuccess && rewardBalance.isSuccess

    const decimals = tokenInfo.data?.native.decimals.result ?? 0
    const balance = rewardBalance.data?.rewardBalance.result ?? 0n

    return (
        <span>
            {loaded ? formatUnits(balance, decimals) : '-'}
        </span>
    )
}
