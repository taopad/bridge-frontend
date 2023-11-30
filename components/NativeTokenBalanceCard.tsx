import { NativeTokenSymbol } from "./NativeTokenSymbol";
import { NativeTokenBalance } from "./NativeTokenBalance";

export function NativeTokenBalanceCard() {
    return (
        <div className="card">
            <h2>Your $<NativeTokenSymbol /> balance</h2>
            <div className="text-right">
                <span className="text-[48px]">120,000</span> $<NativeTokenSymbol />
            </div>
        </div>
    )
}
