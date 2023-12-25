import { useAccount, useContractRead } from "wagmi";
import { getOftContract } from "@/config/contracts";
import { useSourceChainId } from "./useSourceChainId";
import { useTargetChainInfo } from "./useTargetChainInfo";
import { pad } from "viem";

export function useEstimateSendFee(amount: bigint) {
    const sourceChainId = useSourceChainId()
    const { info: targetChainInfo } = useTargetChainInfo()
    const { address } = useAccount()

    const targetLzId = targetChainInfo ? targetChainInfo.lzId : 0

    const sourceContract = getOftContract(sourceChainId)

    const address32Bytes = address ? pad(address) : "0x";

    return useContractRead({
        ...sourceContract,
        functionName: "estimateSendFee",
        args: [targetLzId, address32Bytes, amount, false, "0x"],
        scopeKey: address,
        enabled: sourceChainId != undefined
            && targetChainInfo != undefined
            && amount > 0,
        select: (data) => data[0],
    })
}
