"use client";

import { useHasMounted } from "@/hooks/useHasMounted";
import { useTargetBalance } from "@/hooks/useTargetBalance";
import { useTargetChainInfo } from "@/hooks/useTargetChainInfo";
import { SupportedChainId } from "@/config/chains";

export function TargetBalance({ chainId }: { chainId: SupportedChainId | undefined }) {
    const chain = useTargetChainInfo(chainId)
    const balance = useTargetBalance(chainId)
    const hasMounted = useHasMounted()

    if (hasMounted && balance.isSuccess && balance.data && chain.info) {
        return <span>{balance.data.formatted} ${balance.data.symbol} on {chain.info.name}</span>
    }

    return null
}
