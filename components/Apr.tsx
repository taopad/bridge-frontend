"use client";

import { parseEther } from "viem";
import { useBlockNumber } from "wagmi";
import { useAppWatch } from "@/hooks/useAppWatch";
import { useAppStatic } from "@/hooks/useAppStatic";
import { useCollectedTax } from "@/hooks/useCollectedTax";
import { useHasMounted } from "@/hooks/useHasMounted";

const blocksPerDay = 7123n

export function Apr() {
    const appWatch = useAppWatch()
    const appStatic = useAppStatic()
    const collectedTax = useCollectedTax()
    const blockNumber = useBlockNumber({ watch: true })
    const hasMounted = useHasMounted()

    const nativeDecimals = BigInt(appStatic.data?.tokens.native.decimals.result ?? 0)
    const rewardDecimals = BigInt(appStatic.data?.tokens.reward.decimals.result ?? 0)

    // compute elapsed blocks since the startof trading.
    const startBlockNumber = appStatic.data?.startBlock.result ?? 0n
    const currentBlockNumber = blockNumber.data ?? 0n
    const elapsedBlocks = currentBlockNumber - startBlockNumber

    if (elapsedBlocks < 1) return null

    // compute total shares as eth.
    const nativePriceEth = appWatch.data?.nativePriceEth ?? 0n

    const totalShares = appWatch.data?.totalShares.result ?? 0n
    const totalSharesEth = (totalShares * nativePriceEth) / (10n ** nativeDecimals)

    if (totalSharesEth === 0n) return null

    // compute total eth distributed.
    const rewardPriceEth = appWatch.data?.rewardPriceEth.result ?? 0n

    const collectedTaxEth = collectedTax.data?.value ?? 0n
    const emittedRewards = appWatch.data?.emittedRewards.result ?? 0n
    const emittedRewardsEth = emittedRewards * rewardPriceEth / (10n ** rewardDecimals)
    const totalRewardDistributed = appWatch.data?.totalRewardDistributed.result ?? 0n
    const totalRewardDistributedEth = totalRewardDistributed * rewardPriceEth / (10n ** rewardDecimals)
    const totalEth = collectedTaxEth + emittedRewardsEth + totalRewardDistributedEth

    // compute the apr.
    const apr = (totalEth * blocksPerDay * 365n) / (totalSharesEth * elapsedBlocks)

    if (hasMounted) {
        return <span>{apr.toString()}%</span>
    }

    return null
}
