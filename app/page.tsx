import { NativeTokenBalanceCard } from "@/components/NativeTokenBalanceCard";
import { PendingRewardsCard } from "@/components/PendingRewardCard";

export default function Home() {
    return (
        <main className="flex flex-col gap-4 items-center mt-[120px]">
            <div className="flex flex-col gap-4 lg:flex-row">
                <NativeTokenBalanceCard />
                <PendingRewardsCard />
            </div>
        </main>
    )
}
