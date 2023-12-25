"use client";

import { formatUnits } from "viem";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance";
import { useEstimateSendFee } from "@/hooks/useEstimateSendFee";
import { formatAmount } from "@/utils/formatAmount";

export function SourceNativeFee({ amount }: { amount: bigint }) {
    const fee = useEstimateSendFee(amount)
    const balance = useSourceNativeBalance()
    const hasMounted = useHasMounted()

    if (!hasMounted) return <span>-</span>

    if (balance.isSuccess && balance.data && fee.isSuccess && fee.data) {
        const className = balance.data.value < fee.data ? "text-red-900" : ""

        return (
            <span className={className}>
                Fee: {formatAmount(formatUnits(fee.data, balance.data.decimals))} ${balance.data.symbol}
            </span>
        )
    }

    return <span>-</span>
}
