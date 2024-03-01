import { erc20Abi } from "viem"
import { useAccount, useReadContract } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"

export function useAllowance() {
    const { sourceToken } = useTokenConfig()
    const { isConnected, address } = useAccount()

    const sourceOftAddress = sourceToken?.oft ?? "0x"
    const sourceTokenAddress = sourceToken?.token ?? "0x"
    const sourceTokenChainId = sourceToken?.info.chain.id

    return useReadContract({
        abi: erc20Abi,
        address: sourceTokenAddress,
        chainId: sourceTokenChainId,
        functionName: "allowance",
        args: [address ?? "0x", sourceOftAddress],
        scopeKey: address,
        query: {
            enabled: isConnected && sourceToken != undefined,
        },
    })
}
