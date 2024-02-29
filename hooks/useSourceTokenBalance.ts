import { erc20Abi } from "viem"
import { useEffect } from "react"
import { useAccount, useBlockNumber, useReadContracts } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"

export function useSourceTokenBalance() {
    const { sourceToken } = useTokenConfig()
    const { isConnected, address } = useAccount()
    const { data: blockNumber } = useBlockNumber({
        chainId: sourceToken?.info.chain.id,
        watch: true,
    })

    const sourceTokenChainId = sourceToken?.info.chain.id
    const sourceTokenAddress = sourceToken?.token ?? "0x"

    const hook = useReadContracts({
        allowFailure: false,
        contracts: [
            {
                abi: erc20Abi,
                address: sourceTokenAddress,
                chainId: sourceTokenChainId,
                functionName: "symbol",
            },
            {
                abi: erc20Abi,
                address: sourceTokenAddress,
                chainId: sourceTokenChainId,
                functionName: "decimals",
            },
            {
                abi: erc20Abi,
                address: sourceTokenAddress,
                chainId: sourceTokenChainId,
                functionName: "balanceOf",
                args: [address ?? "0x"],
            },
        ],
        query: {
            enabled: isConnected && sourceToken !== undefined,
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
