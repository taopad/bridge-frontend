import { NativeTokenSymbol } from "@/components/NativeTokenSymbol";
import { NativeTokenBalance } from "./NativeTokenBalance";

export function NativeTokenBalanceCard() {
    return (
        <div className="card">
            <h2>Your $<NativeTokenSymbol /> balance</h2>
            <div className="text-right">
                <span className="amount">
                    <NativeTokenBalance />
                </span> $<NativeTokenSymbol />
            </div>
        </div>
    )
}
