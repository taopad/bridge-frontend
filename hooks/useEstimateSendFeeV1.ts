import { pad } from "viem"
import { useAccount, useReadContract } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"
import OftV1Abi from "@/config/abi/OftV1"

export function useEstimateSendFeeV1(amount: bigint) {
    const { isConnected, address } = useAccount()
    const { sourceToken, targetToken } = useTokenConfig()

    const sourceOftAddress = sourceToken?.oft
    const sourceTokenChainId = sourceToken?.chain.id

    const targetLzId = targetToken?.lzId ?? 0
    const adapterParams = targetToken?.adapterParams ?? "0x"
    const address32Bytes = address ? pad(address) : pad("0x0")

    const enabled = isConnected
        && address !== undefined
        && targetToken !== undefined
        && amount > 0

    return useReadContract({
        abi: OftV1Abi,
        address: sourceOftAddress,
        chainId: sourceTokenChainId,
        functionName: "estimateSendFee",
        args: [targetLzId, address32Bytes, amount, false, adapterParams],
        query: { enabled, select: (data) => data[0] }, // data[0] = native fee, data[1] = lz token fee
    })
}
