"use client";

import { useAppInfo } from "@/hooks/useAppInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function SellFee() {
    const appInfo = useAppInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && appInfo.isSuccess

    const sellFee = appInfo.data?.sellFee.result ?? 0
    const feeDenominator = appInfo.data?.feeDenominator.result ?? 0

    return (
        <span>
            {loaded ? ((100 * sellFee) / feeDenominator).toString() : '-'}
        </span>
    )
}
