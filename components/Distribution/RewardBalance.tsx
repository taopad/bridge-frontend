"use client";

import { formatUnits, parseEther } from "viem";
import { useAppWatch } from "@/hooks/useAppWatch";
import { useAppStatic } from "@/hooks/useAppStatic";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useCollectedTax } from "@/hooks/useCollectedTax";
import { formatAmount } from "@/utils/formatAmount";

export function RewardBalance() {
    const appWatch = useAppWatch()
    const appStatic = useAppStatic()
    const collectedTax = useCollectedTax()
    const hasMounted = useHasMounted()

    const decimals = appStatic.data?.tokens.reward.decimals.result ?? 0
    const ethPriceReward = appWatch.data?.ethPriceReward.result ?? 0n

    const collectedTaxAsEth = collectedTax.data?.value ?? 0n
    const collectedTaxAsReward = (collectedTaxAsEth * ethPriceReward) / parseEther("1")

    const emittedRewards = appWatch.data?.emittedRewards.result ?? 0n
    const rewardBalance = collectedTaxAsReward + emittedRewards

    const units = formatUnits(rewardBalance, decimals)

    if (hasMounted) {
        return <span title={units}>{formatAmount(units)}</span>
    }

    return null
}
