import { pad } from "viem"
import { useAccount, useReadContract } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"
import OftV2Abi from "@/config/abi/OftV2"

export function useEstimateSendFee(amount: bigint) {
    const { address } = useAccount()
    const { sourceToken, targetToken } = useTokenConfig()

    const targetLzId = targetToken?.info.lzId ?? 0
    const adapterParams = targetToken?.info.adapterParams ?? "0x"
    const address32Bytes = address ? pad(address) : "0x"
    const sourceOftAddress = sourceToken?.oft ?? "0x"
    const sourceTokenChainId = sourceToken?.info.chain.id

    return useReadContract({
        abi: OftV2Abi,
        address: sourceOftAddress,
        chainId: sourceTokenChainId,
        functionName: "estimateSendFee",
        args: [targetLzId, address32Bytes, amount, false, adapterParams],
        scopeKey: address,
        query: {
            enabled: targetToken != undefined && amount > 0,
            select: (data) => data[0],
        },
    })
}
