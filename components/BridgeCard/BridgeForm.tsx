"use client"

import Link from "next/link"

import { useState, useCallback } from "react"
import { RocketIcon } from "@radix-ui/react-icons"
import { useBigintInput } from "@/hooks/useBigintInput"
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"
import { Input } from "@/components/ui/input"
import { MaxButton } from "./MaxButton"
import { ApproveButton } from "./ApproveButton"
import { BridgeButtonV1 } from "./BridgeButtonV1"
import { BridgeButtonV2 } from "./BridgeButtonV2"
import { SourceNativeFeeV1 } from "./SourceNativeFeeV1"
import { SourceNativeFeeV2 } from "./SourceNativeFeeV2"
import { SourceNativeSymbol } from "./SourceNativeSymbol"
import { SourceNativeBalance } from "./SourceNativeBalance"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type LzVersion = "v1" | "v2"

const layerzeroscan = "https://layerzeroscan.com/tx"

export function BridgeForm({ version }: { version: LzVersion }) {
    const [hashes, setHashes] = useState<`0x${string}`[]>([])
    const sourceTokenBalance = useSourceTokenBalance()

    const decimals = sourceTokenBalance.data?.decimals ?? 0

    const amount = useBigintInput(0n, decimals)

    const addHash = useCallback((hash: `0x${string}` | undefined) => {
        if (hash !== undefined) {
            setHashes(hashes => [hash, ...hashes])
        }
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-2">
                <div className="form-control flex-1">
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            value={amount.valueStr}
                            onChange={(e) =>
                                amount.setValueStr(e.target.value.trim())
                            }
                        />
                        <MaxButton setAmount={amount.setValue} />
                    </div>
                </div>
                <ApproveButton amount={amount.value} />
                <BridgeButton
                    version={version}
                    amount={amount.value}
                    addHash={addHash}
                    onSuccess={amount.reset}
                />
            </div>
            <div className="flex flex-col gap-4 justify-between lg:flex-row">
                <div>
                    Native token balance: <SourceNativeBalance /> <SourceNativeSymbol />
                </div>
                <div className="flex gap-2">
                    <span>Bridge fee:</span>
                    <SourceNativeFee version={version} amount={amount.value} />
                    <SourceNativeSymbol />
                </div>
            </div>
            {hashes.map(hash => (
                <Alert key={hash}>
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>Transaction is sent</AlertTitle>
                    <AlertDescription>
                        <p className="truncate ...">
                            See tx on LayerZeroScan:{" "}
                            <Link href={`${layerzeroscan}/${hash}`} target="_blank">
                                {hash}
                            </Link>
                        </p>
                    </AlertDescription>
                </Alert>
            ))}
        </div>
    )
}

function SourceNativeFee({ version, amount }: { version: LzVersion, amount: bigint }) {
    if (version === "v1") {
        return <SourceNativeFeeV1 amount={amount} />
    }

    if (version === "v2") {
        return <SourceNativeFeeV2 amount={amount} />
    }
}

function BridgeButton({ version, amount, addHash, onSuccess }: {
    version: LzVersion
    amount: bigint
    addHash: (hash: `0x${string}` | undefined) => void
    onSuccess: () => void
}) {
    if (version === "v1") {
        return <BridgeButtonV1 amount={amount} addHash={addHash} onSuccess={onSuccess} />
    }

    if (version === "v2") {
        return <BridgeButtonV2 amount={amount} addHash={addHash} onSuccess={onSuccess} />
    }
}
