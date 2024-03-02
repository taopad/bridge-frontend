"use client"

import { useTokenConfig } from "@/hooks/useTokenConfig"
import { SourceChainName } from "@/components/SourceChainName"
import { TargetChainName } from "@/components/TargetChainName"

export function TokenSelection({ name }: { name: string }) {
    const { sourceToken, targetToken } = useTokenConfig()

    if (sourceToken === undefined && targetToken === undefined) {
        return <span>Please select source and target chains.</span>
    }

    if (sourceToken === undefined) {
        return <span>Please select source chain.</span>
    }

    if (targetToken === undefined) {
        return <span>Please select target chain.</span>
    }

    return <span>Bridge ${name} from <SourceChainName /> to <TargetChainName /></span>
}
