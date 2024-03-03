import { Button } from "@/components/ui/button"
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"

export function MaxButton({ setAmount }: { setAmount: (amount: bigint) => void }) {
    const sourceTokenBalance = useSourceTokenBalance()

    const balance = sourceTokenBalance.data?.value ?? 0n

    const disabled = !sourceTokenBalance.isSuccess

    return (
        <Button
            type="button"
            variant="secondary"
            className="w-16"
            disabled={disabled}
            onClick={() => setAmount(balance)}
        >
            Max
        </Button>
    )
}
