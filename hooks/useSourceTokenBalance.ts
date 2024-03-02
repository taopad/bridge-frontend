import { erc20Abi } from "viem"
import { useAccount, useReadContracts } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"

export function useSourceTokenBalance() {
    const { sourceToken } = useTokenConfig()
    const { isConnected, address } = useAccount()

    const sourceTokenAddress = sourceToken?.token
    const sourceTokenChainId = sourceToken?.chain.id

    const userAddress = address ?? "0x"

    return useReadContracts({
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
                args: [userAddress],
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
}
