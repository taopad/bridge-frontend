import { useContractRead } from "wagmi";
import { RewardTokenContract, QuoterContract } from "@/config/contracts";
import { useAppInfo } from "./useAppInfo";
import { useRewardInfo } from "./useRewardInfo";

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

export function useExpectedRewards() {
    const appInfo = useAppInfo()
    const rewardInfo = useRewardInfo()

    const poolFee = appInfo.data?.poolFee.result ?? 0
    const amountToSwapETH = rewardInfo.data?.amountToSwapETH.result ?? 0n

    return useContractRead({
        ...QuoterContract,
        functionName: "quoteExactInputSingle",
        args: [{
            tokenIn: WETH,
            tokenOut: RewardTokenContract.address,
            amountIn: amountToSwapETH,
            fee: poolFee,
            sqrtPriceLimitX96: 0n,
        }],
        watch: true,
        enabled: appInfo.isSuccess && rewardInfo.isSuccess && amountToSwapETH > 0,
        select: (data) => (data * 98n) / 100n, // allows 2% slippage
    })
}
