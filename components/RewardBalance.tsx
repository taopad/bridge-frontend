"use client";

import { formatUnits } from "viem";
import { useAppInfo } from "@/hooks/useAppInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function RewardBalance() {
    const appInfo = useAppInfo()
    const tokenInfo = useTokenInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess && appInfo.isSuccess

    const decimals = tokenInfo.data?.native.decimals.result ?? 0
    const balance = appInfo.data?.rewardBalance.result ?? 0n

    return (
        <span>
            {loaded ? formatUnits(balance, decimals) : '-'}
        </span>
    )
}
