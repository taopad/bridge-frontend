import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"
import { Button } from "@/components/ui/button"

export function MaxButton({ setAmount }: { setAmount: (amount: bigint) => void }) {
    const sourceTokenBalance = useSourceTokenBalance()

    const balance = sourceTokenBalance.data?.value ?? 0n

    const disabled = !sourceTokenBalance.isSuccess

    return (
        <Button
            type="button"
            variant="secondary"
            disabled={disabled}
            onClick={() => setAmount(balance)}
            className="w-16"
        >
            Max
        </Button>
    )
}
