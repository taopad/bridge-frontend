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
    const { address } = useAccount()
    const { sourceToken, targetToken } = useTokenConfig()

    const hooks = {
        fee: useEstimateSendFeeV1(amount),
        allowance: useAllowance(),
        sourceTokenBalance: useSourceTokenBalance(),
        sourceNativeBalance: useSourceNativeBalance(),
    }

    const sourceOftAddress = sourceToken?.oft
    const sourceOftChainId = sourceToken?.chain.id

    const targetLzId = targetToken?.lzId ?? 0
    const userAddress = address ?? "0x"
    const adapterParams = targetToken?.adapterParams ?? "0x"
    const address32Bytes = address ? pad(address) : pad("0x0")
    const fee = hooks.fee.data ?? 0n
    const allowance = hooks.allowance.data ?? 0n
    const sourceTokenBalance = hooks.sourceTokenBalance.data?.value ?? 0n
    const sourceNativeBalance = hooks.sourceNativeBalance.data?.value ?? 0n

    const enabled = targetToken !== undefined
        && hooks.fee.isSuccess
        && hooks.allowance.isSuccess
        && hooks.sourceTokenBalance.isSuccess
        && hooks.sourceNativeBalance.isSuccess
        && !hooks.fee.isFetching
        && !hooks.allowance.isRefetching
        && !hooks.sourceTokenBalance.isRefetching
        && !hooks.sourceNativeBalance.isRefetching
        && amount > 0
        && amount <= allowance
        && amount <= sourceTokenBalance
        && sourceNativeBalance >= fee

    return useSimulateContract({
        abi: OftV1Abi,
        address: sourceOftAddress,
        chainId: sourceOftChainId,
        functionName: "sendFrom",
        args: [userAddress, targetLzId, address32Bytes, amount, {
            refundAddress: userAddress,
            zroPaymentAddress: nullAddress,
            adapterParams: adapterParams,
        }],
        value: fee,
        account: address,
        query: { enabled },
    })
}

export function BridgeButtonV1({ amount, addHash, onSuccess }: {
    amount: bigint
    addHash: (hash: `0x${string}` | undefined) => void
    onSuccess: () => void
}) {
    const { isConnected } = useAccount()
    const { sourceToken } = useTokenConfig()

    const hooks = {
        fee: useEstimateSendFeeV1(amount),
        allowance: useAllowance(),
        sourceTokenBalance: useSourceTokenBalance(),
        sourceNativeBalance: useSourceNativeBalance(),
    }

    const chainId = sourceToken?.chain.id

    const fee = hooks.fee.data ?? 0n
    const allowance = hooks.allowance.data ?? 0n
    const zeroAmount = amount === 0n
    const sourceTokenBalance = hooks.sourceTokenBalance.data?.value ?? 0n
    const sourceNativeBalance = hooks.sourceNativeBalance.data?.value ?? 0n
    const insufficientTokenBalance = amount > sourceTokenBalance
    const insufficientNativeBalance = fee > sourceNativeBalance
    const insufficientAllowance = amount > allowance

    const { data, isLoading } = useSimulateBridge(amount)
    const { data: hash, isPending, writeContract, reset: resetWriteData } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash, chainId, confirmations: 1 })

    useEffect(() => { resetWriteData() }, [resetWriteData, chainId])

    const loaded = isConnected
        && hooks.fee.isSuccess
        && hooks.allowance.isSuccess
        && hooks.sourceTokenBalance.isSuccess
        && hooks.sourceNativeBalance.isSuccess

    const loading = isLoading || isPending || isConfirming
    const disabled = !loaded || loading || !Boolean(data?.request)

    if (!loaded) {
        return (
            <Button type="button" variant="secondary" className="w-full lg:w-48" disabled>
                <Spinner loading={loading} /> <span>Bridge</span>
            </Button>
        )
    }

    if (zeroAmount) {
        return (
            <Button type="button" variant="secondary" className="w-full lg:w-48" disabled>
                Bridge
            </Button>
        )
    }

    if (insufficientNativeBalance) {
        return (
            <Button type="button" variant="secondary" className="w-full lg:w-48" disabled>
                Ins. balance
            </Button>
        )
    }

    if (insufficientTokenBalance) {
        return (
            <Button type="button" variant="secondary" className="w-full lg:w-48" disabled>
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
            className="w-full lg:w-48"
            disabled={disabled}
            onClick={() => writeContract(data!.request, {
                onSuccess: (hash) => {
                    onSuccess()
                    addHash(hash)
                    hooks.allowance.refetch()
                    hooks.sourceTokenBalance.refetch()
                    hooks.sourceNativeBalance.refetch()
                }
            })}
        >
            <Spinner loading={loading} /> <span>Bridge</span>
        </Button>
    )
}
