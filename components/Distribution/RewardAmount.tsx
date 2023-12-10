"use client";

import { formatUnits } from "viem";
import { useAppStatic } from "@/hooks/useAppStatic";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useRewards } from "@/hooks/useRewards";
import { formatAmount } from "@/utils/formatAmount";

export function RewardAmount() {
    const rewards = useRewards()
    const appStatic = useAppStatic()
    const hasMounted = useHasMounted()

    const totalRewards = rewards.data?.total ?? 0n
    const decimals = appStatic.data?.tokens.reward.decimals.result ?? 0
    const units = formatUnits(totalRewards, decimals)

    if (hasMounted) {
        return <span title={units}>{formatAmount(units)}</span>
    }

    return null
}
