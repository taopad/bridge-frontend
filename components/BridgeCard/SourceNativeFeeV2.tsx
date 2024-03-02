"use client"

import { formatAmount } from "@/utils/formatAmount"
import { useEstimateSendFeeV2 } from "@/hooks/useEstimateSendFeeV2"
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"

export function SourceNativeFeeV2({ amount }: { amount: bigint }) {
    const fee = useEstimateSendFeeV2(amount)
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
