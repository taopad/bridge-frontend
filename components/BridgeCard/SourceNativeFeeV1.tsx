"use client"

import { formatAmount } from "@/utils/formatAmount"
import { useEstimateSendFeeV1 } from "@/hooks/useEstimateSendFeeV1"
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"

export function SourceNativeFeeV1({ amount }: { amount: bigint }) {
    const fee = useEstimateSendFeeV1(amount)
    const balance = useSourceNativeBalance()

    if (!balance.isSuccess || !fee.isSuccess) {
        return <span>-</span>
    }

    const className = balance.data.value < fee.data ? "text-red-900" : ""

    return (
        <span className={className}>
            Fee: {formatAmount(fee.data, balance.data.decimals)} ${balance.data.symbol}
        </span>
    )
}
