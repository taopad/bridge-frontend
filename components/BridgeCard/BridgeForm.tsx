"use client"

import Link from "next/link"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useAllowance } from "@/hooks/useAllowance"
import { useHasMounted } from "@/hooks/useHasMounted"
import { useBigintInput } from "@/hooks/useBigintInput"
import { useEstimateSendFeeV1 } from "@/hooks/useEstimateSendFeeV1"
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MaxButton } from "./MaxButton"
import { ApproveButton } from "./ApproveButton"
import { SourceNativeFeeV1 } from "./SourceNativeFeeV1"
import { SourceNativeBalance } from "./SourceNativeBalance"
import { BridgeButtonV1 } from "./BridgeButtonV1"

type LzVersion = "v1" | "v2"

const layerzeroscan = "https://layerzeroscan.com/tx"

export function BridgeForm({ version }: { version: LzVersion }) {
    const [hash, setHash] = useState<`0x${string}`>()
    const sourceTokenBalance = useSourceTokenBalance()

    const decimals = sourceTokenBalance.data?.decimals ?? 0

    const amount = useBigintInput(0n, decimals)

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
                <div>
                    <SubmitButton
                        version={version}
                        amount={amount.value}
                        setHash={setHash}
                        reset={amount.reset}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 justify-between lg:flex-row">
                <span>Native token balance: <SourceNativeBalance /></span>
                <span>Bridge fee: <SourceNativeFee version={version} amount={amount.value} /></span>
            </div>
            {hash && (
                <div>
                    See tx on explorer:{" "}
                    <Link href={`${layerzeroscan}/${hash}`} target="_blank">
                        {hash}
                    </Link>
                </div>
            )}
        </div>
    )
}

function SourceNativeFee({ version, amount }: { version: LzVersion, amount: bigint }) {
    if (version === "v1") {
        return <SourceNativeFeeV1 amount={amount} />
    }

    if (version === "v2") {
        return <SourceNativeFeeV1 amount={amount} />
    }
}

function SubmitButton({ version, amount, setHash, reset }: {
    version: LzVersion
    amount: bigint
    setHash: (hash: `0x${string}` | undefined) => void
    reset: () => void
}) {
    const hasMounted = useHasMounted()
    const { isConnected } = useAccount()

    const hooks = {
        fee: useEstimateSendFeeV1(amount),
        allowance: useAllowance(),
        sourceTokenBalance: useSourceTokenBalance(),
        sourceNativeBalance: useSourceNativeBalance(),
    }

    const fee = hooks.fee.data ?? 0n
    const allowance = hooks.allowance.data ?? 0n
    const sourceTokenBalance = hooks.sourceTokenBalance.data?.value ?? 0n
    const sourceNativeBalance = hooks.sourceNativeBalance.data?.value ?? 0n
    const insufficientTokenBalance = amount > sourceTokenBalance
    const insufficientNativeBalance = fee > sourceNativeBalance
    const insufficientAllowance = amount > allowance

    const loaded =
        hasMounted &&
        isConnected &&
        hooks.fee.isSuccess &&
        hooks.allowance.isSuccess &&
        hooks.sourceTokenBalance.isSuccess &&
        hooks.sourceNativeBalance.isSuccess &&
        amount > 0

    if (!loaded) {
        return (
            <Button disabled variant="secondary" className="w-full">
                Bridge
            </Button>
        )
    }

    if (insufficientTokenBalance) {
        return (
            <Button variant="secondary" className="w-full" disabled>
                Ins. balance
            </Button>
        )
    }

    if (insufficientNativeBalance) {
        return (
            <Button variant="secondary" className="w-full" disabled>
                Ins. balance
            </Button>
        )
    }

    if (insufficientAllowance) {
        return <ApproveButton />
    }

    if (version === "v1") {
        return <BridgeButtonV1 amount={amount} setHash={setHash} reset={reset} />
    }

    if (version === "v2") {
        return <BridgeButtonV1 amount={amount} setHash={setHash} reset={reset} />
    }
}
