import { BridgeForm } from "./BridgeForm"
import { SourceChainName } from "@/components/SourceChainName"
import { TargetChainName } from "@/components/TargetChainName"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function BridgeCard() {
    return (
        <Card className="card bg-black">
            <CardHeader>
                <div className="flex gap-2">
                    Bridge wTao from <SourceChainName /> to <TargetChainName />
                </div>
            </CardHeader>
            <CardContent>
                <BridgeForm />
            </CardContent>
        </Card>
    );
}
