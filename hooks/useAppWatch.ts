import { parseEther } from "viem";
import { useContractReads } from "wagmi";
import { NativeTokenContract, RewardTokenContract, RouterContract, QuoterContract } from "@/config/contracts";
import { useAppStatic } from "./useAppStatic";

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

export function useAppWatch() {
    const appStatic = useAppStatic()

    const poolFee = appStatic.data?.poolFee.result ?? 0
    const nativeDecimals = BigInt(appStatic.data?.tokens.native.decimals.result ?? 0)
    const rewardDecimals = BigInt(appStatic.data?.tokens.reward.decimals.result ?? 0)

    return useContractReads({
        contracts: [
            {
                ...NativeTokenContract,
                functionName: "totalShares",
            },
            {
                ...NativeTokenContract,
                functionName: "emittedRewards",
            },
            {
                ...NativeTokenContract,
                functionName: "totalRewardDistributed",
            },
            {
                ...RouterContract,
                functionName: "getAmountsOut",
                args: [10n ** nativeDecimals, [NativeTokenContract.address, WETH]],
            },
            {
                ...QuoterContract,
                functionName: "quoteExactInputSingle",
                args: [{
                    tokenIn: RewardTokenContract.address,
                    tokenOut: WETH,
                    amountIn: 10n ** rewardDecimals,
                    fee: poolFee,
                    sqrtPriceLimitX96: 0n,
                }],
            },
            {
                ...QuoterContract,
                functionName: "quoteExactInputSingle",
                args: [{
                    tokenIn: WETH,
                    tokenOut: RewardTokenContract.address,
                    amountIn: parseEther("1"),
                    fee: poolFee,
                    sqrtPriceLimitX96: 0n,
                }],
            },
        ],
        watch: true,
        enabled: appStatic.isSuccess,
        select: (data) => {
            return {
                totalShares: data[0],
                emittedRewards: data[1],
                totalRewardDistributed: data[2],
                nativePriceEth: data[3].result?.[1] ?? 0n,
                rewardPriceEth: data[4],
                ethPriceReward: data[5],
            }
        },
    })
}
