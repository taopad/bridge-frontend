import { BridgeForm } from "./BridgeForm";
import { SourceChainName } from "@/components/SourceChainName";
import { TargetChainName } from "@/components/TargetChainName";

export function BridgeCard() {
    return (
        <div className="card flex flex-col gap-4">
            <h2>Bridge wTao from <SourceChainName /> to <TargetChainName /></h2>
            <BridgeForm />
        </div>
    )
}
