"use client";

import { useAppInfo } from "@/hooks/useAppInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function BuyTotalFee() {
    const appInfo = useAppInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && appInfo.isSuccess

    const buyTotalFee = appInfo.data?.buyTotalFee.result ?? 0n
    const feeDenominator = appInfo.data?.feeDenominator.result ?? 0n

    return (
        <span>
            {loaded ? ((100n * buyTotalFee) / feeDenominator).toString() : '-'}
        </span>
    )
}
