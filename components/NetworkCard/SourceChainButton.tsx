"use client"

import Image from "next/image"

import { useAccount } from "wagmi"
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit"
import { useTokenConfig } from "@/hooks/useTokenConfig"
import { Button } from "@/components/ui/button"

export function SourceChainButton() {
    const { isConnected } = useAccount()
    const { sourceToken } = useTokenConfig()
    const { openChainModal } = useChainModal()
    const { openConnectModal } = useConnectModal()

    if (!isConnected) {
        return (
            <Button className="w-full" onClick={openConnectModal}>
                Connect wallet
            </Button>
        )
    }

    if (sourceToken === undefined) {
        return (
            <Button className="w-full" variant="destructive" onClick={openChainModal}>
                Unsupported chain
            </Button>
        )
    }

    return (
        <Button onClick={openChainModal}>
            <Image
                className="h-6 w-6"
                width={1}
                height={1}
                src={`/logos/${sourceToken.logo}`}
                alt={sourceToken.chain.name}
            />
            <div className="flex-1">{sourceToken.chain.name}</div>
        </Button>
    )
}
