import { pad } from "viem"
import { useAccount, useReadContract } from "wagmi"
import { useTokenConfig } from "./useTokenConfig"
import OftV2Abi from "@/config/abi/OftV2"

export function useEstimateSendFeeV2(amount: bigint) {
    const { isConnected, address } = useAccount()
    const { sourceToken, targetToken } = useTokenConfig()

    const sourceOftAddress = sourceToken?.oft
    const sourceTokenChainId = sourceToken?.chain.id

    const targetLzId = targetToken?.lzId ?? 0
    const adapterParams = targetToken?.adapterParams ?? "0x"
    const address32Bytes = address ? pad(address) : "0x"

    return useReadContract({
        abi: OftV2Abi,
        address: sourceOftAddress,
        chainId: sourceTokenChainId,
        functionName: "quoteSend",
        args: [{
            dstEid: targetLzId,
            to: address32Bytes,
            amountLD: amount,
            minAmountLD: amount,
            extraOptions: adapterParams,
            composeMsg: "0x",
            oftCmd: "0x",
        }, false],
        scopeKey: address,
        query: {
            enabled: isConnected
                && sourceToken != undefined
                && targetToken != undefined
                && amount > 0,
            select: (data) => data.nativeFee,
        },
    })
}
