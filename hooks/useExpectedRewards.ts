import { useContractRead } from "wagmi";
import { NativeTokenContract, RewardTokenContract, RouterContract, QuoterContract } from "@/config/contracts";
import { useAppInfo } from "./useAppInfo";
import { useCollectedTax } from "./useCollectedTax";

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

export function useExpectedRewards() {
    const appInfo = useAppInfo()
    const collectedTax = useCollectedTax()

    const poolFee = Number(appInfo.data?.poolFee.result ?? 0n)
    const taxAmount = collectedTax.data ?? 0n

    const taxAsEth = useContractRead({
        ...RouterContract,
        functionName: "getAmountsOut",
        args: [taxAmount, [NativeTokenContract.address, WETH]],
        watch: true,
        enabled: collectedTax.isSuccess && taxAmount > 0,
        select: (data) => (data[1] * 99n) / 100n, // allows 1% slippage
    })

    const ethValue = taxAsEth.data ?? 0n

    return useContractRead({
        ...QuoterContract,
        functionName: "quoteExactInputSingle",
        args: [{
            tokenIn: WETH,
            tokenOut: RewardTokenContract.address,
            amountIn: ethValue,
            fee: poolFee,
            sqrtPriceLimitX96: 0n,
        }],
        watch: true,
        enabled: taxAsEth.isSuccess && ethValue > 0,
        select: (data) => (data * 99n) / 100n, // allows 1% slippage
    })
}
