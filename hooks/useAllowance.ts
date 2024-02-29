import { erc20Abi } from "viem"
import { useAccount, useReadContract } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"

export function useAllowance() {
    const { isConnected, address } = useAccount()
    const { sourceToken, targetToken } = useTokenConfig()

    const sourceTokenChainId = sourceToken?.info.chain.id
    const sourceTokenAddress = sourceToken?.token ?? "0x"
    const targetTokenAddress = targetToken?.oft ?? "0x"

    return useReadContract({
        abi: erc20Abi,
        address: sourceTokenAddress,
        chainId: sourceTokenChainId,
        functionName: "allowance",
        args: [address ?? "0x", targetTokenAddress],
        scopeKey: address,
        query: {
            enabled: isConnected
                && sourceToken != undefined
                && targetToken !== undefined,
        },
    })
}
