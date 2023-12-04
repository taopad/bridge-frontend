"use client";

import { formatUnits } from "viem";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useRewardInfo } from "@/hooks/useRewardInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function TotalRewardDistributed() {
    const tokenInfo = useTokenInfo()
    const rewardInfo = useRewardInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess

    const decimals = tokenInfo.data?.reward.decimals.result ?? 0
    const totalRewardDistributed = rewardInfo.data?.totalRewardDistributed.result ?? 0n
    const units = formatUnits(totalRewardDistributed, decimals);

    if (loaded) {
        return <span title={units}>{parseFloat(units).toFixed(2)}</span>
    }

    return null
}
