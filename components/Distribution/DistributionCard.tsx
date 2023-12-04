import { RewardTokenSymbol } from "@/components/RewardTokenSymbol";
import { BuyFee } from "./BuyFee";
import { SellFee } from "./SellFee";
import { RewardAmount } from "./RewardAmount";
import { DistributeForm } from "./DistributeForm";

export function DistributionCard() {
    return (
        <div className="card flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1">
                <h2>Rewards to distribute</h2>
                <div className="flex flex-col justify-between mt-4 lg:flex-row">
                    <div className="hidden lg:inline">
                        <span className="amount"><BuyFee />%</span>
                        <div>Buy fee</div>
                    </div>
                    <span className="amount hidden lg:inline">/</span>
                    <div className="hidden lg:inline">
                        <span className="amount"><SellFee />%</span>
                        <div>Sell fee</div>
                    </div>
                    <span className="amount hidden lg:inline">/</span>
                    <div>
                        <div className="text-right">
                            <span className="amount">
                                <RewardAmount />
                            </span> $<RewardTokenSymbol />
                        </div>
                        <div className="hidden lg:inline">Collected rewards</div>
                    </div>
                </div>
            </div>
            <DistributeForm />
        </div>
    )
}
