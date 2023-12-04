"use client";

import { useAppStatic } from "@/hooks/useAppStatic";
import { useHasMounted } from "@/hooks/useHasMounted";

export function SellFee() {
    const appStatic = useAppStatic()
    const hasMounted = useHasMounted()

    const sellFee = appStatic.data?.sellFee.result ?? 0
    const feeDenominator = appStatic.data?.feeDenominator.result ?? 0

    if (hasMounted) {
        return <span>{(100 * sellFee) / feeDenominator}%</span>
    }

    return null
}
