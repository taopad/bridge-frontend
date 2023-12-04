import { useContractReads } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";

export function useAppInfo() {
    return useContractReads({
        contracts: [
            {
                ...NativeTokenContract,
                functionName: "buyFee",
            },
            {
                ...NativeTokenContract,
                functionName: "sellFee",
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
            buyFee: data[0],
            sellFee: data[1],
            feeDenominator: data[2],
            poolFee: data[3],
        })
    })
}
