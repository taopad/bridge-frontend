"use client";

import { formatUnits } from "viem";
import { useAppStatic } from "@/hooks/useAppStatic";
import { useUserWatch } from "@/hooks/useUserWatch";
import { useHasMounted } from "@/hooks/useHasMounted";
import { formatAmount } from "@/utils/formatAmount";

export function NativeTokenBalance() {
    const appStatic = useAppStatic()
    const userWatch = useUserWatch()
    const hasMounted = useHasMounted()

    const decimals = appStatic.data?.tokens.native.decimals.result ?? 0
    const balance = userWatch.data?.balance.result ?? 0n
    const units = formatUnits(balance, decimals);

    if (hasMounted) {
        return <span title={units}>{formatAmount(units)}</span>
    }

    return null
}
