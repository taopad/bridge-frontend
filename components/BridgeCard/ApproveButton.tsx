import { erc20Abi } from "viem"
import { useAccount, useSimulateContract, useWriteContract } from "wagmi"
import { useAllowance } from "@/hooks/useAllowance"
import { useTokenConfig } from "@/hooks/useTokenConfig"
import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"

function useSimulateApprove() {
    const { sourceToken } = useTokenConfig()
    const { isConnected, address } = useAccount()

    const sourceOftAddress = sourceToken?.oft ?? "0x"
    const sourceTokenAddress = sourceToken?.token ?? "0x"

    return useSimulateContract({
        abi: erc20Abi,
        address: sourceTokenAddress,
        functionName: "approve",
        args: [sourceOftAddress, BigInt(2 ** (256 - 1))],
        account: address,
        scopeKey: address,
        query: {
            enabled: isConnected && sourceToken != undefined,
        },
    })
}

export function ApproveButton() {
    const allowance = useAllowance()

    const { data, isLoading } = useSimulateApprove()

    const { writeContract, isPending } = useWriteContract({
        mutation: {
            onSuccess: () => {
                allowance.refetch()
            }
        }
    })

    const loading = isLoading || isPending
    const disabled = loading || !Boolean(data?.request)

    return (
        <Button
            variant="secondary"
            className="w-full"
            disabled={disabled}
            onClick={() => writeContract(data!.request)}
        >
            <Spinner loading={loading} /> <span>Approve</span>
        </Button>
    )
}
