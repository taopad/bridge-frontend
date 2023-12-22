"use client";

import { useHasMounted } from "@/hooks/useHasMounted";
import { useSourceChainInfo } from "@/hooks/useSourceChainInfo";

export function SourceChainName() {
    const { info } = useSourceChainInfo()
    const hasMounted = useHasMounted()

    if (hasMounted && info) {
        return <span>{info.name}</span>
    }

    return <span>-</span>
}
