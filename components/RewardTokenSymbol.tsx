"use client";

import { useAppStatic } from "@/hooks/useAppStatic";
import { useHasMounted } from "@/hooks/useHasMounted";

export function RewardTokenSymbol() {
    const appStatic = useAppStatic()
    const hasMounted = useHasMounted()

    const symbol = appStatic.data?.tokens.reward.symbol.result ?? ""

    if (hasMounted) {
        return <span>${symbol}</span>
    }

    return null
}
