"use client";

import { formatUnits } from "viem";
import { useAppWatch } from "@/hooks/useAppWatch";
import { useAppStatic } from "@/hooks/useAppStatic";
import { useHasMounted } from "@/hooks/useHasMounted";
import { formatAmount } from "@/utils/formatAmount";

export function TotalRewardDistributed() {
    const appWatch = useAppWatch()
    const appStatic = useAppStatic()
    const hasMounted = useHasMounted()

    const decimals = appStatic.data?.tokens.reward.decimals.result ?? 0
    const totalRewardDistributed = appWatch.data?.totalRewardDistributed.result ?? 0n
    const units = formatUnits(totalRewardDistributed, decimals);

    if (hasMounted) {
        return <span title={units}>{formatAmount(units)}</span>
    }

    return null
}
