import { pad } from "viem"
import { useAccount, useReadContract } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"
import OftV1Abi from "@/config/abi/OftV1"

export function useEstimateSendFeeV1(amount: bigint) {
    const { isConnected, address } = useAccount()
    const { sourceToken, targetToken } = useTokenConfig()

    const targetLzId = targetToken?.info.lzId ?? 0
    const adapterParams = targetToken?.adapterParams ?? "0x"
    const address32Bytes = address ? pad(address) : "0x"
    const sourceOftAddress = sourceToken?.oft ?? "0x"
    const sourceTokenChainId = sourceToken?.info.chain.id

    return useReadContract({
        abi: OftV1Abi,
        address: sourceOftAddress,
        chainId: sourceTokenChainId,
        functionName: "estimateSendFee",
        args: [targetLzId, address32Bytes, amount, false, adapterParams],
        scopeKey: address,
        query: {
            enabled: isConnected
                && sourceToken != undefined
                && targetToken != undefined
                && amount > 0,
            select: (data) => data[0], // estimateSendFee() returns an array
        },
    })
}
