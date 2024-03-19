import { erc20Abi } from "viem"
import { useEffect } from "react"
import { useAccount, useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useTokenConfig } from "@/hooks/useTokenConfig"
import { useSourceTokenBalance } from "@/hooks/useSourceTokenBalance"
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
    const { sourceToken } = useTokenConfig()
    const { isConnected, chain } = useAccount()

    const sourceTokenBalance = useSourceTokenBalance()

    const chainId = sourceToken?.chain.id
    const balance = sourceTokenBalance.data?.value ?? 0n
    const allowance = sourceTokenBalance.data?.allowance ?? 0n

    const { data, isLoading } = useSimulateApprove(amount)
    const { data: hash, isPending, writeContract, reset } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash, chainId, confirmations: 1 })

    useEffect(() => { reset() }, [reset, chainId])

    const loading = isLoading || isPending || isConfirming

    const disabled = !isConnected
        || chain === undefined
        || chain.id !== chainId
        || amount === 0n
        || amount > balance
        || amount <= allowance
        || loading
        || !Boolean(data?.request)

    return (
        <Button
            type="button"
            variant="secondary"
            className="flex gap-2 w-full lg:w-48"
            disabled={disabled}
            onClick={() => writeContract(data!.request)}
        >
            <Spinner loading={loading} /> Approve
        </Button>
    )
}
