"use client";

import { formatUnits } from "viem";
import { useAppWatch } from "@/hooks/useAppWatch";
import { useAppStatic } from "@/hooks/useAppStatic";
import { useHasMounted } from "@/hooks/useHasMounted";

export function TotalShares() {
    const appWatch = useAppWatch()
    const appStatic = useAppStatic()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && appStatic.isSuccess

    const decimals = appStatic.data?.tokens.native.decimals.result ?? 0
    const totalShares = appWatch.data?.totalShares.result ?? 0n
    const units = formatUnits(totalShares, decimals);

    if (loaded) {
        return <span title={units}>{parseFloat(units).toFixed(2)}</span>
    }

    return null
}
