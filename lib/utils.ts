import { formatUnits } from "viem"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatAmount(amount: bigint, decimals: number, maximumFractionDigits?: number) {
    return parseFloat(formatUnits(amount, decimals)).toLocaleString("en-US", {
        maximumFractionDigits: maximumFractionDigits ?? 3,
        useGrouping: false,
    })
}

export function convertToSharedDecimals(amount: bigint, decimals: number, sharedDecimals: number) {
    const decimalConvertionRate = 10n ** BigInt(decimals - sharedDecimals)

    return (amount / decimalConvertionRate) * decimalConvertionRate
}
