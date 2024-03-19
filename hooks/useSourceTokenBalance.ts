import { erc20Abi } from "viem"
import { useAccount, useReadContracts } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"
import OftSharedAbi from "@/config/abi/OftShared"

export function useSourceTokenBalance() {
    const { sourceToken } = useTokenConfig()
    const { isConnected, address } = useAccount()

    const sourceOftAddress = sourceToken?.oft
    const sourceTokenAddress = sourceToken?.token
    const sourceTokenChainId = sourceToken?.chain.id

    const userAddress = address ?? "0x"

    const enabled = isConnected && address !== undefined

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
                abi: OftSharedAbi,
                address: sourceOftAddress,
                chainId: sourceTokenChainId,
                functionName: "sharedDecimals",
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
            enabled,
            select: (data) => ({
                symbol: data[0],
                decimals: data[1],
                sharedDecimals: data[2],
                value: data[3],
            })
        },
    })
}
