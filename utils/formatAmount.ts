import { formatUnits } from "viem"

export function formatAmount(amount: bigint, decimals: number) {
    return parseFloat(formatUnits(amount, decimals)).toFixed(5).toString()
}
