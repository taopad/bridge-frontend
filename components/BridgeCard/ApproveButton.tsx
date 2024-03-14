import { erc20Abi } from "viem"
import { useAccount, useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useAllowance } from "@/hooks/useAllowance"
import { useTokenConfig } from "@/hooks/useTokenConfig"
import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"

function useSimulateApprove(amount: bigint) {
    const { address } = useAccount()
    const { sourceToken } = useTokenConfig()

    const sourceTokenAddress = sourceToken?.token
    const sourceTokenChainId = sourceToken?.chain.id

    const sourceOftAddress = sourceToken?.oft ?? "0x"

    const enabled = amount > 0

    return useSimulateContract({
        abi: erc20Abi,
        address: sourceTokenAddress,
        chainId: sourceTokenChainId,
        functionName: "approve",
        args: [sourceOftAddress, amount],
        account: address,
        query: { enabled },
    })
}

export function ApproveButton({ amount }: { amount: bigint }) {
    const allowance = useAllowance()
    const { sourceToken } = useTokenConfig()

    const chainId = sourceToken?.chain.id

    const { data, isLoading } = useSimulateApprove(amount)
    const { data: hash, isPending, writeContract } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash, chainId, confirmations: 1 })

    const loading = isLoading || isPending || isConfirming
    const disabled = loading || !Boolean(data?.request)

    return (
        <Button
            type="button"
            variant="secondary"
            className="w-full lg:w-48"
            disabled={disabled}
            onClick={() => writeContract(data!.request, {
                onSuccess: () => { allowance.refetch() }
            })}
        >
            <Spinner loading={loading} /> <span>Approve</span>
        </Button>
    )
}
