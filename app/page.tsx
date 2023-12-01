"use client";

import { ExpectedRewards } from "@/components/ExpectedRewards";
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol";
import { DistributionCard } from "@/components/Distribution/DistributionCard";
import { PendingRewardsCard } from "@/components/PendingRewards/PendingRewardsCard";
import { NativeTokenBalanceCard } from "@/components/UserBalance/NativeTokenBalanceCard";

export default function Home() {
    return (
        <main className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row">
                <NativeTokenBalanceCard />
                <PendingRewardsCard />
            </div>
            <DistributionCard />
            <div className="card">
                <h2>Expected amount of $wTao to distribute</h2>
                <ExpectedRewards /> $<RewardTokenSymbol />
                <p>Will be removed in production</p>
            </div>
        </main>
    )
}
