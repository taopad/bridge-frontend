import { RewardTokenSymbol } from "@/components/RewardTokenSymbol";
import { PendingRewards } from "./PendingRewards";
import { ClaimForm } from "./ClaimForm";

export function PendingRewardsCard() {
    return (
        <div className="card flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1">
                <h2>Pending $<RewardTokenSymbol /> rewards</h2>
                <div className="text-right">
                    <span className="amount">
                        <PendingRewards />
                    </span> $<RewardTokenSymbol />
                </div>
            </div>
            <ClaimForm />
        </div>
    )
}
