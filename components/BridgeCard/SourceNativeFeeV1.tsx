"use client"

import { useHasMounted } from "@/hooks/useHasMounted"
import { useEstimateSendFeeV1 } from "@/hooks/useEstimateSendFeeV1"
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"
import { formatAmount } from "@/utils/formatAmount"

export function SourceNativeFeeV1({ amount }: { amount: bigint }) {
    const fee = useEstimateSendFeeV1(amount)
    const balance = useSourceNativeBalance()
    const hasMounted = useHasMounted()

    if (!hasMounted || !balance.isSuccess || !fee.isSuccess) {
        return <span>-</span>
    }

    const className = balance.data.value < fee.data ? "text-red-900" : ""

    return (
        <span className={className}>
            Fee: {formatAmount(fee.data, balance.data.decimals)} ${balance.data.symbol}
        </span>
    )
}
