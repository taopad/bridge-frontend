"use client";

import { chains } from "@/config/wallet";
import { SupportedChainId, info } from "@/config/chains";

export function TargetChainSelector() {
    return (
        <select className="btn-chain text-center">
            <option selected>Select target chain</option>
            {chains.map(chain => <Option key={chain.id} chainId={chain.id} />)}
        </select>
    )
}

function Option({ chainId }: { chainId: SupportedChainId }) {
    const { name } = info[chainId]

    return (
        <option>{name}</option>
    )
}
