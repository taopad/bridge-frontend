"use client"

import Link from "next/link"

import { erc20Abi, pad } from "viem"
import { useState, useEffect } from "react"
import { useAccount, useSimulateContract, useWriteContract } from "wagmi"
import { useAllowance } from "@/hooks/useAllowance"
import { useHasMounted } from "@/hooks/useHasMounted"
import { useBigintInput } from "@/hooks/useBigintInput"
import { useTokenConfig } from "@/hooks/useTokenConfig"
import { useEstimateSendFeeV1 } from "@/hooks/useEstimateSendFeeV1"
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"
import { Spinner } from "@/components/Spinner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SourceNativeFeeV1 } from "./SourceNativeFeeV1"
import { SourceNativeBalance } from "./SourceNativeBalance"
import OftV1Abi from "@/config/abi/OftV1"

const nullAddress = "0x0000000000000000000000000000000000000000"
const layerzeroscan = "https://layerzeroscan.com/tx"

function useSimulateApprove() {
    const { sourceToken } = useTokenConfig()
    const { isConnected, address } = useAccount()

    const sourceOftAddress = sourceToken?.oft ?? "0x"
    const sourceTokenAddress = sourceToken?.token ?? "0x"

    return useSimulateContract({
        abi: erc20Abi,
        address: sourceTokenAddress,
        functionName: "approve",
        args: [sourceOftAddress, BigInt(2 ** (256 - 1))],
        account: address,
        scopeKey: address,
        query: {
            enabled: isConnected && sourceToken != undefined,
        },
    })
}

function useSimulateBridge(amount: bigint) {
    const { isConnected, address } = useAccount()
    const { sourceToken, targetToken } = useTokenConfig()

    const hooks = {
        fee: useEstimateSendFeeV1(amount),
        allowance: useAllowance(),
        sourceTokenBalance: useSourceTokenBalance(),
        sourceNativeBalance: useSourceNativeBalance(),
    }

    const lzId = targetToken?.info.lzId ?? 0
    const adapterParams = targetToken?.adapterParams ?? "0x"
    const address32Bytes = address ? pad(address) : "0x"
    const sourceOftAddress = sourceToken?.oft ?? "0x"
    const fee = hooks.fee.data ?? 0n
    const allowance = hooks.allowance.data ?? 0n
    const sourceTokenBalance = hooks.sourceTokenBalance.data?.value ?? 0n
    const sourceNativeBalance = hooks.sourceNativeBalance.data?.value ?? 0n

    return useSimulateContract({
        abi: OftV1Abi,
        address: sourceOftAddress,
        functionName: "sendFrom",
        args: [address ?? "0x", lzId, address32Bytes, amount, {
            refundAddress: address ?? "0x",
            zroPaymentAddress: nullAddress,
            adapterParams: adapterParams,
        }],
        value: fee,
        account: address,
        scopeKey: address,
        query: {
            enabled: isConnected &&
                sourceToken != undefined &&
                targetToken != undefined &&
                hooks.fee.isSuccess &&
                hooks.allowance.isSuccess &&
                hooks.sourceTokenBalance.isSuccess &&
                hooks.sourceNativeBalance.isSuccess &&
                amount > 0 &&
                amount <= allowance &&
                amount <= sourceTokenBalance &&
                sourceNativeBalance >= fee,
        },
    })
}

export function BridgeFormV1() {
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
                        amount={amount.value}
                        setHash={setHash}
                        reset={amount.reset}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 justify-between lg:flex-row">
                <span>Native token balance: <SourceNativeBalance /></span>
                <span>Bridge fee: <SourceNativeFeeV1 amount={amount.value} /></span>
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

function MaxButton({ setAmount }: { setAmount: (amount: bigint) => void }) {
    const hasMounted = useHasMounted()
    const sourceTokenBalance = useSourceTokenBalance()

    const balance = sourceTokenBalance.data?.value ?? 0n

    const disabled = !hasMounted || !sourceTokenBalance.isSuccess

    return (
        <Button
            variant="secondary"
            disabled={disabled}
            onClick={() => setAmount(balance)}
            className="w-16"
        >
            Max
        </Button>
    )
}

function SubmitButton({ amount, setHash, reset }: {
    amount: bigint
    setHash: (hash: `0x${string}` | undefined) => void
    reset: () => void
}) {
    const hasMounted = useHasMounted()
    const { isConnected, address } = useAccount()

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

    return <BridgeButton amount={amount} setHash={setHash} reset={reset} />
}

function ApproveButton() {
    const allowance = useAllowance()

    const { data, isLoading } = useSimulateApprove()

    const { writeContract, isPending } = useWriteContract({
        mutation: {
            onSuccess: () => {
                allowance.refetch()
            }
        }
    })

    const loading = isLoading || isPending
    const disabled = loading || !Boolean(data?.request)

    return (
        <Button
            variant="secondary"
            className="w-full"
            disabled={disabled}
            onClick={() => writeContract(data!.request)}
        >
            <Spinner loading={loading} /> <span>Approve</span>
        </Button>
    )
}

function BridgeButton({ amount, setHash, reset }: {
    amount: bigint
    setHash: (hash: `0x${string}` | undefined) => void
    reset: () => void
}) {
    const { data, isLoading } = useSimulateBridge(amount)

    const { writeContract, isPending, data: hash } = useWriteContract({
        mutation: {
            onSuccess: () => {
                reset()
            }
        }
    })

    const loading = isLoading || isPending
    const disabled = loading || !Boolean(data?.request)

    useEffect(() => { setHash(hash) }, [setHash, hash])

    return (
        <Button
            variant="secondary"
            className="w-full"
            disabled={disabled}
            onClick={() => writeContract(data!.request)}
        >
            <Spinner loading={loading} /> <span>Bridge</span>
        </Button>
    )
}
