"use client";

import { formatUnits } from "viem";
import { useAppWatch } from "@/hooks/useAppWatch";
import { useAppStatic } from "@/hooks/useAppStatic";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useExpectedRewards } from "@/hooks/useExpectedRewards";
import { formatAmount } from "@/utils/formatAmount";

export function RewardAmount() {
    const appWatch = useAppWatch()
    const appStatic = useAppStatic()
    const expectedRewards = useExpectedRewards()
    const hasMounted = useHasMounted()

    const expected = expectedRewards.data ?? 0n
    const donations = appWatch.data?.donations.result ?? 0n
    const decimals = appStatic.data?.tokens.reward.decimals.result ?? 0
    const units = formatUnits(expected + donations, decimals)

    if (hasMounted) {
        return <span title={units}>{formatAmount(units)}</span>
    }

    return null
}
