"use client";

import Image from "next/image"

import { useAccount, useNetwork } from "wagmi";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useHasMounted } from "@/hooks/useHasMounted";
import { SupportedChainId, info } from "@/config/chains"

export function SourceChainButton() {
    const { chain } = useNetwork()
    const { isConnected } = useAccount()
    const { openChainModal } = useChainModal()
    const { openConnectModal } = useConnectModal()
    const hasMounted = useHasMounted()

    if (!hasMounted) return <FallbackButton />

    if (!isConnected || !chain) return (
        <button
            className="btn-chain"
            onClick={openConnectModal}
        >
            Connect wallet
        </button>
    )

    if (chain.unsupported) return (
        <button className="btn-chain bg-red-900" onClick={openChainModal}>
            Unsupported chain
        </button>
    )

    const { name, logo } = info[chain.id as SupportedChainId]

    return (
        <button className="btn-chain flex items-center" onClick={openChainModal}>
            <Image className="h-6 w-6" src={`/logos/${logo}.svg`} alt={name} />
            <div className="flex-1">{name}</div>
        </button>
    )
}

function FallbackButton() {
    return (
        <button className="btn-chain" disabled={true}>
            <div className="h-6">&nbsp;</div>
        </button>
    )
}
