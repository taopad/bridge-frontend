import { erc20Abi } from "viem"
import { useAccount, useSimulateContract, useWriteContract } from "wagmi"
import { useAllowance } from "@/hooks/useAllowance"
import { useTokenConfig } from "@/hooks/useTokenConfig"
import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"

function useSimulateApprove(amount: bigint) {
    const { sourceToken } = useTokenConfig()
    const { isConnected, address } = useAccount()

    const sourceOftAddress = sourceToken?.oft ?? "0x"
    const sourceTokenAddress = sourceToken?.token ?? "0x"

    return useSimulateContract({
        abi: erc20Abi,
        address: sourceTokenAddress,
        functionName: "approve",
        args: [sourceOftAddress, amount],
        account: address,
        scopeKey: address,
        query: {
            enabled: isConnected
                && sourceToken != undefined
                && amount > 0,
        },
    })
}

export function ApproveButton({ amount }: { amount: bigint }) {
    const allowance = useAllowance()

    const { data, isLoading } = useSimulateApprove(amount)
    const { writeContract, isPending } = useWriteContract()

    const loading = isLoading || isPending
    const disabled = loading || !Boolean(data?.request)

    return (
        <Button
            type="button"
            variant="secondary"
            className="w-48"
            disabled={disabled}
            onClick={() => writeContract(data!.request, {
                onSuccess: () => allowance.refetch()
            })}
        >
            <Spinner loading={loading} /> <span>Approve</span>
        </Button>
    )
}
