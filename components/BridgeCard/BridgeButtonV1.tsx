import { pad } from "viem"
import { useEffect } from "react"
import { useAccount, useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useAllowance } from "@/hooks/useAllowance"
import { useTokenConfig } from "@/hooks/useTokenConfig"
import { useEstimateSendFeeV1 } from "@/hooks/useEstimateSendFeeV1"
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"
import { ApproveButton } from "./ApproveButton"
import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import OftV1Abi from "@/config/abi/OftV1"

const nullAddress = "0x0000000000000000000000000000000000000000"

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
    const sourceOftChainId = sourceToken?.info.chain.id ?? 0
    const fee = hooks.fee.data ?? 0n
    const allowance = hooks.allowance.data ?? 0n
    const sourceTokenBalance = hooks.sourceTokenBalance.data?.value ?? 0n
    const sourceNativeBalance = hooks.sourceNativeBalance.data?.value ?? 0n

    return useSimulateContract({
        abi: OftV1Abi,
        address: sourceOftAddress,
        chainId: sourceOftChainId,
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

export function BridgeButtonV1({ amount, setHash, reset }: {
    amount: bigint
    setHash: (hash: `0x${string}` | undefined) => void
    reset: () => void
}) {
    const { isConnected } = useAccount()
    const { sourceToken } = useTokenConfig()

    const hooks = {
        fee: useEstimateSendFeeV1(amount),
        allowance: useAllowance(),
        sourceTokenBalance: useSourceTokenBalance(),
        sourceNativeBalance: useSourceNativeBalance(),
    }

    const fee = hooks.fee.data ?? 0n
    const allowance = hooks.allowance.data ?? 0n
    const sourceTokenChainId = sourceToken?.info.chain.id ?? 0
    const sourceTokenBalance = hooks.sourceTokenBalance.data?.value ?? 0n
    const sourceNativeBalance = hooks.sourceNativeBalance.data?.value ?? 0n
    const insufficientTokenBalance = amount > sourceTokenBalance
    const insufficientNativeBalance = fee > sourceNativeBalance
    const insufficientAllowance = amount > allowance

    const { data, isLoading } = useSimulateBridge(amount)
    const { data: hash, isPending, writeContract } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash, chainId: sourceTokenChainId, confirmations: 1 })

    useEffect(() => { setHash(hash) }, [setHash, hash])

    const loaded = isConnected
        && hooks.fee.isSuccess
        && hooks.allowance.isSuccess
        && hooks.sourceTokenBalance.isSuccess
        && hooks.sourceNativeBalance.isSuccess
        && amount > 0

    const loading = isLoading || isPending || isConfirming
    const disabled = !loaded || loading || !Boolean(data?.request)

    if (!loaded) {
        return (
            <Button type="button" variant="secondary" className="w-48" disabled>
                <Spinner loading={loading} /> <span>Bridge</span>
            </Button>
        )
    }

    if (insufficientNativeBalance) {
        return (
            <Button type="button" variant="secondary" className="w-48" disabled>
                Ins. balance
            </Button>
        )
    }

    if (insufficientTokenBalance) {
        return (
            <Button type="button" variant="secondary" className="w-48" disabled>
                Ins. balance
            </Button>
        )
    }

    if (insufficientAllowance) {
        return <ApproveButton amount={amount} />
    }

    return (
        <Button
            type="button"
            variant="secondary"
            className="w-48"
            disabled={disabled}
            onClick={() => writeContract(data!.request, {
                onSuccess: () => {
                    reset()
                    hooks.sourceTokenBalance.refetch()
                }
            })}
        >
            <Spinner loading={loading} /> <span>Bridge</span>
        </Button>
    )
}
