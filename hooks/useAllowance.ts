import { erc20Abi } from "viem"
import { useAccount, useReadContract } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"

export function useAllowance() {
    const { sourceToken } = useTokenConfig()
    const { isConnected, address } = useAccount()

    const sourceTokenAddress = sourceToken?.token
    const sourceTokenChainId = sourceToken?.chain.id

    const userAddress = address ?? "0x"
    const sourceOftAddress = sourceToken?.oft ?? "0x"

    return useReadContract({
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
}
