"use client";

import { formatUnits } from "viem";
import { useAppWatch } from "@/hooks/useAppWatch";
import { useAppStatic } from "@/hooks/useAppStatic";
import { useHasMounted } from "@/hooks/useHasMounted";
import { formatAmount } from "@/utils/formatAmount";

export function TotalShares() {
    const appWatch = useAppWatch()
    const appStatic = useAppStatic()
    const hasMounted = useHasMounted()

    const decimals = appStatic.data?.tokens.native.decimals.result ?? 0
    const totalShares = appWatch.data?.totalShares.result ?? 0n
    const units = formatUnits(totalShares, decimals);

    if (hasMounted) {
        return <span title={units}>{formatAmount(units)}</span>
    }

    return null
}
