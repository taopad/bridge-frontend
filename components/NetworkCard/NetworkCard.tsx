import { SourceTokenBalance } from "./SourceTokenBalance";
import { TargetTokenBalance } from "./TargetTokenBalance";
import { SourceChainButton } from "./SourceChainButton";
import { TargetChainSelector } from "./TargetChainSelector";

export function NetworkCard() {
    return (
        <div className="card flex flex-col gap-4">
            <h2>Chain selection</h2>
            <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex flex-col gap-4 flex-1 text-center">
                    <SourceChainButton />
                    <SourceTokenBalance />
                </div>
                <div className="flex flex-col gap-4 flex-1 text-center">
                    <TargetChainSelector />
                    <TargetTokenBalance />
                </div>
            </div>
        </div>
    )
}
