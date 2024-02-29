"use client"

import { useHasMounted } from "@/hooks/useHasMounted"
import { useEstimateSendFee } from "@/hooks/useEstimateSendFee"
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"
import { formatAmount } from "@/utils/formatAmount"

export function SourceNativeFee({ amount }: { amount: bigint }) {
    const fee = useEstimateSendFee(amount)
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
