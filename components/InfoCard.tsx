import { Apr } from "@/components/Apr";
import { TotalShares } from "@/components/TotalShares";
import { NativeTokenSymbol } from "@/components/NativeTokenSymbol";
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol";
import { TotalRewardDistributed } from "@/components/TotalRewardDistributed";
import { NativeTokenContract } from "@/config/contracts";

export function InfoCard() {
    return (
        <div className="card flex flex-col gap-4">
            <div className="flex gap-2">
                <div className="lg:w-48 text-right">Contract:</div>
                <input
                    type="text"
                    className="bg-black text-white w-full border-0 flex-1 focus:outline-none focus:ring-0"
                    value={NativeTokenContract.address}
                    readOnly
                />
            </div>
            <div className="flex gap-2">
                <div className="lg:w-48 text-right">Total shares:</div>
                <div><TotalShares /> <NativeTokenSymbol /></div>
            </div>
            <div className="flex gap-2">
                <div className="lg:w-48 text-right">Total distributed:</div>
                <div><TotalRewardDistributed /> <RewardTokenSymbol /></div>
            </div>
            <div className="flex gap-2">
                <div className="lg:w-48 text-right">Current apr:</div>
                <div><Apr /></div>
            </div>
        </div>
    )
}
