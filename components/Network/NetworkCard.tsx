import { SourceBalance } from "./SourceBalance";
import { TargetBalance } from "./TargetBalance";
import { SourceChainButton } from "./SourceChainButton";
import { TargetChainSelector } from "./TargetChainSelector";

export function NetworkCard() {
    return (
        <div className="card flex flex-col gap-4">
            <h2>Chain selection</h2>
            <div className="flex flex-col gap-4 lg:flex-row">
                <SourceChainButton />
                <TargetChainSelector />
            </div>
            <div className="text-right">
                <SourceBalance />
            </div>
            <div className="text-right">
                <TargetBalance chainId={42161} />
            </div>
        </div>
    )
}
