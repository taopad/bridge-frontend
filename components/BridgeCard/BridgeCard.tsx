import { SourceChainName } from "@/components/SourceChainName";
import { TargetChainName } from "@/components/TargetChainName";

export function BridgeCard() {
    return (
        <div className="card">
            <h2>Bridge wTao from <SourceChainName /> to <TargetChainName /></h2>
        </div>
    )
}
