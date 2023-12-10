import { parseEther } from "viem";
import { useBlockNumber, useContractReads } from "wagmi";
import { NativeTokenContract, RewardTokenContract, RouterContract, QuoterContract } from "@/config/contracts";
import { useAppWatch } from "./useAppWatch";
import { useAppStatic } from "./useAppStatic";

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

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
                args: [totalShares, [NativeTokenContract.address, WETH]],
            },
        ],
        enabled: appWatch.isSuccess && rewardDecimal > 0 && poolFee > 0 && totalShares > 0,
        select: (data) => {
            const currentBlockNumber = blockNumber.data ?? 0n
            const startBlock = data[0].result ?? 0n
            const rewardEthPrice = data[1].result ?? 0n
            const totalEthLocked = data[2].result?.[1] ?? 0n

            if (totalEthLocked === 0n) return 0

            if (currentBlockNumber < startBlock) return 0

            const elapsedBlocks = currentBlockNumber - startBlock
            const ethDonated = rewardDonations * rewardEthPrice
            const ethDistributed = rewardDistributed * rewardEthPrice
            const totalDistributedEth = ethCollected + ethDonated + ethDistributed
            const ethPerBlock = totalDistributedEth / elapsedBlocks
            const ethPerYear = ethPerBlock * blocksPerDay * 365n

            return ethPerYear / totalEthLocked
        },
    })
}
