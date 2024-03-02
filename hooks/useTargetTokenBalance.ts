import { erc20Abi } from "viem"
import { useEffect } from "react"
import { useAccount, useBlockNumber, useReadContracts } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"

export function useTargetTokenBalance() {
    const { targetToken } = useTokenConfig()
    const { isConnected, address } = useAccount()
    const { data: blockNumber } = useBlockNumber({
        chainId: targetToken?.chain.id,
        watch: true,
    })

    const targetTokenAddress = targetToken?.token
    const targetTokenChainId = targetToken?.chain.id

    const userAddress = address ?? "0x"

    const hook = useReadContracts({
        allowFailure: false,
        contracts: [
            {
                abi: erc20Abi,
                address: targetTokenAddress,
                chainId: targetTokenChainId,
                functionName: "symbol",
            },
            {
                abi: erc20Abi,
                address: targetTokenAddress,
                chainId: targetTokenChainId,
                functionName: "decimals",
            },
            {
                abi: erc20Abi,
                address: targetTokenAddress,
                chainId: targetTokenChainId,
                functionName: "balanceOf",
                args: [userAddress],
            },
        ],
        query: {
            enabled: isConnected && targetToken !== undefined,
            select: (data) => ({
                symbol: data[0],
                decimals: data[1],
                value: data[2],
            })
        },
    })

    useEffect(() => { hook.refetch() }, [blockNumber])

    return hook
}
