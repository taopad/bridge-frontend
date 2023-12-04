"use client";

import { useAppStatic } from "@/hooks/useAppStatic";
import { useHasMounted } from "@/hooks/useHasMounted";

export function SellFee() {
    const appStatic = useAppStatic()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && appStatic.isSuccess

    const sellFee = appStatic.data?.sellFee.result ?? 0
    const feeDenominator = appStatic.data?.feeDenominator.result ?? 0

    return (
        <span>
            {loaded ? ((100 * sellFee) / feeDenominator).toString() : '-'}
        </span>
    )
}
