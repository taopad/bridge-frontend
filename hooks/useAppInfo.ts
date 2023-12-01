import { useContractReads } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";

export function useAppInfo() {
    return useContractReads({
        contracts: [
            {
                ...NativeTokenContract,
                functionName: "buyTotalFee",
            },
            {
                ...NativeTokenContract,
                functionName: "sellTotalFee",
            },
            {
                ...NativeTokenContract,
                functionName: "feeDenominator",
            },
            {
                ...NativeTokenContract,
                functionName: "poolFee",
            },
        ],
        select: (data) => ({
            buyTotalFee: data[0],
            sellTotalFee: data[1],
            feeDenominator: data[2],
            poolFee: data[3],
        })
    })
}
