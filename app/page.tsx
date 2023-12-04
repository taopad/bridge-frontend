"use client";

import { InfoCard } from "@/components/InfoCard";
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
            <InfoCard />
        </main>
    )
}
