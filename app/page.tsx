import { RewardBalanceCard } from "@/components/RewardBalance/RewardBalanceCard";
import { PendingRewardsCard } from "@/components/PendingRewards/PendingRewardsCard";
import { NativeTokenBalanceCard } from "@/components/UserBalance/NativeTokenBalanceCard";

export default function Home() {
    return (
        <main className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row">
                <NativeTokenBalanceCard />
                <PendingRewardsCard />
            </div>
            <RewardBalanceCard />
        </main>
    )
}
