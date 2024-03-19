import { Button } from "@/components/ui/button"
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"
import { convertToSharedDecimals } from "@/lib/utils"

export function MaxButton({ setAmount }: { setAmount: (amount: bigint) => void }) {
    const sourceTokenBalance = useSourceTokenBalance()

    const balance = sourceTokenBalance.data?.value ?? 0n
    const decimals = sourceTokenBalance.data?.decimals ?? 0
    const sharedDecimals = sourceTokenBalance.data?.sharedDecimals ?? 0

    const convertedBalance = convertToSharedDecimals(balance, decimals, sharedDecimals)

    const disabled = !sourceTokenBalance.isSuccess

    return (
        <Button
            type="button"
            variant="secondary"
            className="w-16"
            disabled={disabled}
            onClick={() => setAmount(convertedBalance)}
        >
            Max
        </Button>
    )
}
