"use client";

import { pad } from "viem";
import { useAllowance } from "@/hooks/useAllowance";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useBigintInput } from "@/hooks/useBigintInput";
import { useSourceChainId } from "@/hooks/useSourceChainId";
import { useEstimateSendFee } from "@/hooks/useEstimateSendFee";
import { useTargetChainInfo } from "@/hooks/useTargetChainInfo";
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance";
import { useTargetTokenBalance } from "@/hooks/useTargetTokenBalance";
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance";
import { useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { getTokenContract, getOftContract } from "@/config/contracts";
import { Spinner } from "@/components/Spinner";
import { SourceNativeFee } from "./SourceNativeFee";
import { SourceNativeBalance } from "./SourceNativeBalance";

const nullAddress = "0x0000000000000000000000000000000000000000"

function useApprove() {
    const allowance = useAllowance()
    const sourceChainId = useSourceChainId()
    const { isConnected, address } = useAccount()

    const oft = getOftContract(sourceChainId)
    const token = getTokenContract(sourceChainId)

    const prepare = usePrepareContractWrite({
        ...token,
        functionName: "approve",
        args: [oft.address ?? "0x", BigInt(2 ** (256 - 1))],
        scopeKey: address,
        enabled: isConnected && sourceChainId != undefined
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({
        hash: action.data?.hash, onSuccess() {
            allowance.refetch()
        }
    })

    return { prepare, action, wait }
}

function useBridge(amount: bigint, reset: () => void) {
    const allowance = useAllowance()
    const sourceChainId = useSourceChainId()
    const { info: targetChainInfo } = useTargetChainInfo()
    const { isConnected, address } = useAccount()

    const fee = useEstimateSendFee(amount)
    const sourceTokenBalance = useSourceTokenBalance()
    const targetTokenBalance = useTargetTokenBalance()
    const sourceNativeBalance = useSourceNativeBalance()

    const address32Bytes = address ? pad(address) : "0x";
    const targetLzId = targetChainInfo ? targetChainInfo.lzId : 0
    const adapterParams = targetChainInfo ? targetChainInfo.adapterParams : "0x"

    const oft = getOftContract(sourceChainId)

    const prepare = usePrepareContractWrite({
        ...oft,
        functionName: "sendFrom",
        args: [address ?? "0x", targetLzId, address32Bytes, amount, {
            refundAddress: address ?? "0x",
            zroPaymentAddress: nullAddress,
            adapterParams: adapterParams,
        }],
        value: fee.data ?? 0n,
        scopeKey: address,
        enabled: isConnected
            && allowance.isSuccess
            && sourceTokenBalance.isSuccess
            && sourceNativeBalance.isSuccess
            && fee.isSuccess
            && sourceChainId != undefined
            && targetChainInfo != undefined
            && (sourceNativeBalance.data?.value ?? 0n) > (fee.data ?? 0n)
            && amount > 0
            && amount <= (sourceTokenBalance.data?.value ?? 0n)
            && amount <= (allowance.data ?? 0n),
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({
        hash: action.data?.hash, onSuccess() {
            reset()
            sourceTokenBalance.refetch()
            targetTokenBalance.refetch()
            sourceNativeBalance.refetch()
        }
    })

    return { prepare, action, wait }
}

export function BridgeForm() {
    const { data } = useSourceTokenBalance()

    const amount = useBigintInput(0n, data?.decimals ?? 0)

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row">
                <div className="form-control flex-1">
                    <div className="flex gap-1">
                        <input
                            type="text"
                            className="px-6 py-4 text-lg text-black w-full rounded-lg"
                            value={amount.valueStr}
                            onChange={e => amount.setValueStr(e.target.value.trim())}
                        />
                        <MaxButton setAmount={amount.setValue} />
                    </div>
                </div>
                <div>
                    <SubmitButton amount={amount.value} reset={amount.reset} />
                </div>
            </div>
            <div className="flex flex-col gap-4 justify-between lg:flex-row">
                <SourceNativeBalance />
                <SourceNativeFee amount={amount.value} />
            </div>
        </div>
    )
}

function MaxButton({ setAmount }: { setAmount: (amount: bigint) => void }) {
    const hasMounted = useHasMounted()
    const { data, isSuccess } = useSourceTokenBalance()

    const balance = data?.value ?? 0n

    const disabled = !hasMounted || !isSuccess;

    return (
        <button disabled={disabled} onClick={() => setAmount(balance)} className="card-button w-16">
            Max
        </button>
    )
}

function SubmitButton({ amount, reset }: { amount: bigint, reset: () => void }) {
    const allowance = useAllowance()
    const hasMounted = useHasMounted()
    const fee = useEstimateSendFee(amount)
    const sourceTokenBalance = useSourceTokenBalance()
    const sourceNativeBalance = useSourceNativeBalance()

    const insufficientTokenBalance = amount > (sourceTokenBalance.data?.value ?? 0n)
    const insufficientNativeBalance = (fee.data ?? 0n) >= (sourceNativeBalance.data?.value ?? 0n)
    const insufficientAllowance = amount > (allowance.data ?? 0n)

    const loaded = hasMounted
        && fee.isSuccess
        && sourceTokenBalance.isSuccess
        && sourceNativeBalance.isSuccess
        && amount > 0

    if (!loaded) {
        return (
            <button disabled className="card-button w-full h-full lg:w-48">
                Bridge
            </button>
        )
    }

    if (insufficientTokenBalance) {
        return (
            <button disabled className="card-button w-full h-full lg:w-48">
                Ins. balance
            </button>
        )
    }

    if (insufficientNativeBalance) {
        return (
            <button disabled className="card-button w-full h-full lg:w-48">
                Ins. balance
            </button>
        )
    }

    if (insufficientAllowance) {
        return <ApproveButton />
    }

    return <BridgeButton amount={amount} reset={reset} />
}

function ApproveButton() {
    const { prepare, action, wait } = useApprove()

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = preparing || sending

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="card-button w-full h-full lg:w-48">
            {sending ? <Spinner /> : <span>Approve</span>}
        </button>
    )
}

function BridgeButton({ amount, reset }: { amount: bigint, reset: () => void }) {
    const { prepare, action, wait } = useBridge(amount, reset)

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = preparing || sending

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="card-button w-full h-full lg:w-48">
            {sending ? <Spinner /> : <span>Bridge</span>}
        </button>
    )
}
