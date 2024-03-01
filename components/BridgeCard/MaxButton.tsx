import { useHasMounted } from "@/hooks/useHasMounted"
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"
import { Button } from "@/components/ui/button"

export function MaxButton({ setAmount }: { setAmount: (amount: bigint) => void }) {
    const hasMounted = useHasMounted()
    const sourceTokenBalance = useSourceTokenBalance()

    const balance = sourceTokenBalance.data?.value ?? 0n

    const disabled = !hasMounted || !sourceTokenBalance.isSuccess

    return (
        <Button
            variant="secondary"
            disabled={disabled}
            onClick={() => setAmount(balance)}
            className="w-16"
        >
            Max
        </Button>
    )
}
