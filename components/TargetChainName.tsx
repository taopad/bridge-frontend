"use client";

import { useHasMounted } from "@/hooks/useHasMounted";
import { useTargetChainInfo } from "@/hooks/useTargetChainInfo";

export function TargetChainName() {
    const { info } = useTargetChainInfo()
    const hasMounted = useHasMounted()

    if (hasMounted && info) {
        return <span>{info.name}</span>
    }

    return <span>-</span>
}
