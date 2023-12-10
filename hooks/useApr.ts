import { parseEther } from "viem";
import { useBlockNumber, useContractReads } from "wagmi";
import { NativeTokenContract, RewardTokenContract, RouterContract, QuoterContract } from "@/config/contracts";
import { useAppWatch } from "./useAppWatch";
import { useAppStatic } from "./useAppStatic";

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"

const blocksPerDay = 7123n

export function useApr() {
    const appWatch = useAppWatch()
    const appStatic = useAppStatic()
    const blockNumber = useBlockNumber()

    const poolFee = appStatic.data?.poolFee.result ?? 0
    const rewardDecimal = appStatic.data?.tokens.reward.decimals.result ?? 0

    const totalShares = appWatch.data?.totalShares.result ?? 0n
    const ethCollected = appWatch.data?.collectedTax.result ?? 0n
    const rewardDonations = appWatch.data?.donations.result ?? 0n
    const rewardDistributed = appWatch.data?.totalRewardDistributed.result ?? 0n

    return useContractReads({
        contracts: [
            {
                ...NativeTokenContract,
                functionName: "startBlock",
            },
            {
                ...RouterContract,
                functionName: "getAmountsOut",
                args: [parseEther("1"), [WETH, USDC]],
            },
            {
                ...QuoterContract,
                functionName: "quoteExactInputSingle",
                args: [{
                    tokenIn: RewardTokenContract.address,
                    tokenOut: WETH,
                    amountIn: 10n ** BigInt(rewardDecimal),
                    fee: poolFee,
                    sqrtPriceLimitX96: 0n,
                }],
            },
            {
                ...RouterContract,
                functionName: "getAmountsOut",
                args: [totalShares, [NativeTokenContract.address, WETH, USDC]],
            },
        ],
        enabled: appWatch.isSuccess && rewardDecimal > 0 && poolFee > 0 && totalShares > 0,
        select: (data) => {
            const currentBlockNumber = blockNumber.data ?? 0n
            const startBlock = data[0].result ?? 0n
            const ethUsdcPrice = data[1].result?.[1] ?? 0n
            const rewardEthPrice = data[2].result ?? 0n
            const totalUsdcLocked = data[3].result?.[2] ?? 0n

            if (totalUsdcLocked === 0n) return 0

            if (currentBlockNumber < startBlock) return 0

            const elapsedBlocks = currentBlockNumber - startBlock
            const ethDonated = rewardDonations * rewardEthPrice
            const ethDistributed = rewardDistributed * rewardEthPrice
            const usdcDistributed = (ethCollected + ethDonated + ethDistributed) * ethUsdcPrice
            const usdcPerBlock = usdcDistributed / elapsedBlocks
            const usdcPerYear = usdcPerBlock * blocksPerDay * 365n

            return usdcPerYear / (totalUsdcLocked * parseEther("1"))
        },
    })
}
