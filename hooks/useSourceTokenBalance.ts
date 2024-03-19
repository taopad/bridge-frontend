import { erc20Abi } from "viem"
import { useEffect } from "react"
import { useAccount, useBlockNumber, useReadContracts } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"
import OftSharedAbi from "@/config/abi/OftShared"

export function useSourceTokenBalance() {
    const { sourceToken } = useTokenConfig()
    const { isConnected, address } = useAccount()

    const sourceTokenAddress = sourceToken?.token
    const sourceTokenChainId = sourceToken?.chain.id

    const userAddress = address ?? "0x"
    const sourceOftAddress = sourceToken?.oft ?? "0x"

    const enabled = isConnected && address !== undefined

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
            {
                abi: erc20Abi,
                address: sourceTokenAddress,
                chainId: sourceTokenChainId,
                functionName: "allowance",
                args: [userAddress, sourceOftAddress],
            },
        ],
        query: {
            enabled,
            select: (data) => ({
                symbol: data[0],
                decimals: data[1],
                sharedDecimals: data[2],
                value: data[3],
                allowance: data[4],
            })
        },
    })

    const { data: blockNumber } = useBlockNumber({
        chainId: sourceTokenChainId,
        watch: true,
    })

    useEffect(() => { hook.refetch() }, [blockNumber])

    return hook
}
