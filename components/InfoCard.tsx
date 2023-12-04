import { NativeTokenContract } from "@/config/contracts";
import { TotalShares } from "./TotalShares";
import { NativeTokenSymbol } from "./NativeTokenSymbol";
import { RewardTokenSymbol } from "./RewardTokenSymbol";
import { TotalRewardDistributed } from "./TotalRewardDistributed";

export function InfoCard() {
    return (
        <div className="card flex flex-col gap-4">
            <p className="flex gap-2">
                <div className="lg:w-48 text-right">Contract:</div>
                <input
                    type="text"
                    className="bg-black text-white w-full border-0 flex-1"
                    value={NativeTokenContract.address}
                />
            </p>
            <p className="flex gap-2">
                <div className="lg:w-48 text-right">Total shares:</div>
                <div><TotalShares /> $<NativeTokenSymbol /></div>
            </p>
            <p className="flex gap-2">
                <div className="lg:w-48 text-right">Total distributed:</div>
                <div><TotalRewardDistributed /> $<RewardTokenSymbol /></div>
            </p>
        </div>
    )
}
