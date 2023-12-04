"use client";

import { formatUnits } from "viem";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useRewardInfo } from "@/hooks/useRewardInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function TotalShares() {
    const tokenInfo = useTokenInfo()
    const rewardInfo = useRewardInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess

    const decimals = tokenInfo.data?.native.decimals.result ?? 0
    const totalShares = rewardInfo.data?.totalShares.result ?? 0n
    const units = formatUnits(totalShares, decimals);

    if (loaded) {
        return <span title={units}>{parseFloat(units).toFixed(2)}</span>
    }

    return null
}
