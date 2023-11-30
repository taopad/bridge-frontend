import { ClaimForm } from "./ClaimForm";
import { PendingRewards } from "./PendingRewards";
import { RewardTokenSymbol } from "./RewardTokenSymbol";

export function PendingRewardsCard() {
    return (
        <div className="card flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="lg:w-[360px]">
                <h2>Pending $<RewardTokenSymbol /> rewards</h2>
                <div className="text-right">
                    <span className="text-[48px]">34,243</span> $<RewardTokenSymbol />
                </div>
            </div>
            <ClaimForm />
        </div>
    )
}
