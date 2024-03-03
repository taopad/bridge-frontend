import { erc20Abi } from "viem"
import { useEffect } from "react"
import { useAccount, useBlockNumber, useReadContract } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"

export function useAllowance() {
    const { sourceToken } = useTokenConfig()
    const { isConnected, address } = useAccount()

    const sourceTokenAddress = sourceToken?.token
    const sourceTokenChainId = sourceToken?.chain.id

    const userAddress = address ?? "0x"
    const sourceOftAddress = sourceToken?.oft ?? "0x"

    const { data: blockNumber } = useBlockNumber({
        chainId: sourceTokenChainId,
        watch: true,
    })

    const hook = useReadContract({
        abi: erc20Abi,
        address: sourceTokenAddress,
        chainId: sourceTokenChainId,
        functionName: "allowance",
        args: [userAddress, sourceOftAddress],
        scopeKey: address,
        query: {
            enabled: isConnected && sourceToken != undefined,
        },
    })

    useEffect(() => { hook.refetch() }, [blockNumber])

    return hook
}
