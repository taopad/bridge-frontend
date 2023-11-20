import { useContractReads } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";

export function useTokenInfo() {
    return useContractReads({
        contracts: [
            {
                ...NativeTokenContract,
                functionName: "symbol",
            },
            {
                ...NativeTokenContract,
                functionName: "decimals",
            },
        ],
        select: (data) => ({
            native: {
                symbol: data[0],
                decimals: data[1],
            },
            reward: {
                symbol: { result: "ETH" },
                decimals: { result: 18 },
            },
        })
    })
}
