"use client";

import { useAppInfo } from "@/hooks/useAppInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function BuyFee() {
    const appInfo = useAppInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && appInfo.isSuccess

    const buyFee = appInfo.data?.buyFee.result ?? 0
    const feeDenominator = appInfo.data?.feeDenominator.result ?? 0

    return (
        <span>
            {loaded ? ((100 * buyFee) / feeDenominator).toString() : '-'}
        </span>
    )
}
