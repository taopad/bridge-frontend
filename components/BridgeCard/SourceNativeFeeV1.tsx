"use client"

import { formatUnits } from "viem"
import { formatAmount } from "@/lib/utils"
import { useEstimateSendFeeV1 } from "@/hooks/useEstimateSendFeeV1"
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"

export function SourceNativeFeeV1({ amount }: { amount: bigint }) {
    const estimateSendFee = useEstimateSendFeeV1(amount)
    const sourceNativeBalance = useSourceNativeBalance()

    const fee = estimateSendFee.data ?? 0n
    const balance = sourceNativeBalance.data?.value ?? 0n
    const decimals = sourceNativeBalance.data?.decimals ?? 0

    if (!sourceNativeBalance.isSuccess || !estimateSendFee.isSuccess) {
        return <span>-</span>
    }

    const className = balance < fee ? "text-red-900" : ""

    return (
        <span className={className} title={formatUnits(fee, decimals)}>
            {formatAmount(fee, decimals, 6)}
        </span>
    )
}
