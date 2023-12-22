"use client";

import { useEffect } from "react";
import { chains } from "@/config/wallet";
import { SupportedChainId, info } from "@/config/chains";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useTargetChain } from "@/hooks/useTargetChain";
import { useSourceChainInfo } from "@/hooks/useSourceChainInfo";

export function TargetChainSelector() {
    const { id } = useSourceChainInfo()
    const { targetChainId, setTargetChainId } = useTargetChain()

    const value = targetChainId ?? "none"

    useEffect(() => {
        if (id === value) {
            setTargetChainId(undefined)
        }
    }, [id, value])

    return (
        <select
            className="btn-chain text-center"
            value={value}
            onChange={e => setTargetChainId(targetValueToChainId(e.target.value))}
        >
            <option value="none">Select target chain</option>
            {chains.map(chain => <Option key={chain.id} chainId={chain.id} />)}
        </select>
    )
}

function Option({ chainId }: { chainId: SupportedChainId }) {
    const { id } = useSourceChainInfo()
    const hasMounted = useHasMounted()

    if (!hasMounted) return null

    return (
        <option value={chainId} disabled={chainId === id}>
            {info[chainId].name}
        </option>
    )
}

function targetValueToChainId(value: string) {
    if (value == "none") return undefined

    const chainId = parseInt(value)

    if (isNaN(chainId)) return undefined

    return chainId as SupportedChainId
}
