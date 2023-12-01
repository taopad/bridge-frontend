"use client";

import { useAppInfo } from "@/hooks/useAppInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function SellTotalFee() {
    const appInfo = useAppInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && appInfo.isSuccess

    const sellTotalFee = appInfo.data?.sellTotalFee.result ?? 0n
    const feeDenominator = appInfo.data?.feeDenominator.result ?? 0n

    return (
        <span>
            {loaded ? ((100n * sellTotalFee) / feeDenominator).toString() : '-'}
        </span>
    )
}
