import { erc20Abi } from "viem"
import { useAccount, useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useAllowance } from "@/hooks/useAllowance"
import { useTokenConfig } from "@/hooks/useTokenConfig"
import { useSourceNativeBalance } from "@/hooks/useSourceNativeBalance"
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
    const sourceNativeBalance = useSourceNativeBalance()
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
            className="flex gap-2 w-full lg:w-48"
            disabled={disabled}
            onClick={() => writeContract(data!.request, {
                onSuccess: () => {
                    allowance.refetch()
                    sourceNativeBalance.refetch()
                }
            })}
        >
            <Spinner loading={loading} /> Approve
        </Button>
    )
}
