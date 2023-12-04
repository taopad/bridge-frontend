"use client";

import { useAppStatic } from "@/hooks/useAppStatic";
import { useHasMounted } from "@/hooks/useHasMounted";

export function BuyFee() {
    const appStatic = useAppStatic()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && appStatic.isSuccess

    const buyFee = appStatic.data?.buyFee.result ?? 0
    const feeDenominator = appStatic.data?.feeDenominator.result ?? 0

    return (
        <span>
            {loaded ? ((100 * buyFee) / feeDenominator).toString() : '-'}
        </span>
    )
}
