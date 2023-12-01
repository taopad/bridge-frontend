"use client";

import { formatUnits } from "viem";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useRewardBalance } from "@/hooks/useRewardBalance";
import { formatAmount } from "@/utils/formatAmount";

export function RewardBalance() {
    const tokenInfo = useTokenInfo()
    const hasMounted = useHasMounted()
    const rewardBalance = useRewardBalance()

    const loaded = hasMounted && tokenInfo.isSuccess && rewardBalance.isSuccess

    const decimals = tokenInfo.data?.native.decimals.result ?? 0
    const balance = rewardBalance.data ?? 0n
    const units = formatUnits(balance, decimals)

    if (loaded) {
        return <span title={units}>{formatAmount(units)}</span>
    }

    return null
}
