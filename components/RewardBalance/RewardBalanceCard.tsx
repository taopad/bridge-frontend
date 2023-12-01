import { NativeTokenSymbol } from "@/components/NativeTokenSymbol";
import { BuyTotalFee } from "./BuyTotalFee";
import { SellTotalFee } from "./SellTotalFee";
import { RewardBalance } from "./RewardBalance";
import { DistributeForm } from "./DistributeForm";

export function RewardBalanceCard() {
    return (
        <div className="card flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1">
                <h2>Rewards to distribute</h2>
                <div className="flex flex-col justify-between mt-4 lg:flex-row">
                    <div className="hidden lg:inline">
                        <span className="amount"><BuyTotalFee />%</span>
                        <div>Buy fee</div>
                    </div>
                    <span className="amount hidden lg:inline">/</span>
                    <div className="hidden lg:inline">
                        <span className="amount"><SellTotalFee />%</span>
                        <div>Sell fee</div>
                    </div>
                    <span className="amount hidden lg:inline">/</span>
                    <div>
                        <div className="text-right">
                            <span className="amount">
                                <RewardBalance />
                            </span> $<NativeTokenSymbol />
                        </div>
                        <div className="hidden lg:inline">Collected tax</div>
                    </div>
                </div>
            </div>
            <DistributeForm />
        </div>
    )
}
