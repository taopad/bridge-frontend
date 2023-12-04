"use client";

import { formatUnits } from "viem";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useRewardInfo } from "@/hooks/useRewardInfo";
import { useExpectedRewards } from "@/hooks/useExpectedRewards";
import { formatAmount } from "@/utils/formatAmount";

export function RewardAmount() {
    const tokenInfo = useTokenInfo()
    const hasMounted = useHasMounted()
    const rewardInfo = useRewardInfo()
    const expectedRewards = useExpectedRewards()

    const loaded = hasMounted && tokenInfo.isSuccess && rewardInfo.isSuccess && expectedRewards.isSuccess

    const expected = expectedRewards.data ?? 0n
    const donations = rewardInfo.data?.donations.result ?? 0n
    const decimals = tokenInfo.data?.reward.decimals.result ?? 0
    const units = formatUnits(expected + donations, decimals)

    if (loaded) {
        return <span title={units}>{formatAmount(units)}</span>
    }

    return 0
}
